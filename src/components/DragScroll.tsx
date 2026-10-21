"use client";

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from '@/i18n';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

interface DragScrollProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const FRICTION = 0.94; // momentum decay per frame after the mouse is released
const MIN_VELOCITY = 0.05; // px per ms; below this the glide stops
const DRAG_THRESHOLD = 4; // px moved before a press counts as a drag (and not a click)

/**
 * Horizontal row you can drag with the mouse, with a short momentum glide on release.
 * Touch and trackpads keep the browser's own native scrolling (which already has momentum),
 * so this only takes over for mouse drags. Arrow buttons appear on whichever side has more
 * content, so it's obvious the row scrolls.
 */
export default function DragScroll({ children, className = '', ...props }: DragScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, moved: false, startX: 0, startScroll: 0, lastX: 0, lastT: 0, velocity: 0 });
  const glideFrame = useRef<number | null>(null);
  const { t } = useTranslation('global');
  const [canScroll, setCanScroll] = useState({ back: false, forward: false });
  // The arrows stay hidden until the user shows interest: pointer over the row, or the row is
  // scrolling (finger swipe, drag, wheel, arrow click). They hide again 1.2s after it stops.
  const [hovering, setHovering] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const scrollTimer = useRef<number | undefined>(undefined);

  // scrollLeft is negative in RTL, so work with distances from the start instead.
  const updateArrows = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const pos = Math.abs(el.scrollLeft);
    setCanScroll({ back: pos > 2, forward: pos < max - 2 });
  }, []);

  const handleScroll = () => {
    updateArrows();
    setScrolling(true);
    window.clearTimeout(scrollTimer.current);
    scrollTimer.current = window.setTimeout(() => setScrolling(false), 1200);
  };
  useEffect(() => () => window.clearTimeout(scrollTimer.current), []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    updateArrows();
    const observer = new ResizeObserver(updateArrows);
    observer.observe(el);
    return () => observer.disconnect();
  }, [updateArrows]);

  const scrollByPage = (towardEnd: boolean) => {
    const el = ref.current;
    if (!el) return;
    const rtl = getComputedStyle(el).direction === 'rtl';
    const amount = el.clientWidth * 0.8 * (towardEnd ? 1 : -1) * (rtl ? -1 : 1);
    el.scrollBy({ left: amount, behavior: 'smooth' });
  };

  const stopGlide = () => {
    if (glideFrame.current !== null) cancelAnimationFrame(glideFrame.current);
    glideFrame.current = null;
  };

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || e.pointerType !== 'mouse' || e.button !== 0) return;
    if (el.scrollWidth <= el.clientWidth) return; // nothing to scroll
    stopGlide();
    drag.current = { active: true, moved: false, startX: e.clientX, startScroll: el.scrollLeft, lastX: e.clientX, lastT: performance.now(), velocity: 0 };
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    const d = drag.current;
    if (!el || !d.active) return;

    const dx = e.clientX - d.startX;
    if (!d.moved) {
      if (Math.abs(dx) < DRAG_THRESHOLD) return;
      d.moved = true;
      el.setPointerCapture(e.pointerId);
      el.classList.add('dragging');
    }

    el.scrollLeft = d.startScroll - dx;

    const now = performance.now();
    const dt = now - d.lastT;
    if (dt > 0) {
      // Smoothed velocity so one jittery sample doesn't decide the glide.
      d.velocity = 0.8 * ((d.lastX - e.clientX) / dt) + 0.2 * d.velocity;
      d.lastX = e.clientX;
      d.lastT = now;
    }
  }, []);

  const endDrag = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    const d = drag.current;
    if (!el || !d.active) return;
    d.active = false;
    el.classList.remove('dragging');
    if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
    if (!d.moved) return;

    // If the mouse paused before release, don't glide.
    let velocity = performance.now() - d.lastT > 80 ? 0 : d.velocity;
    let last = performance.now();
    const step = (now: number) => {
      const dt = now - last;
      last = now;
      el.scrollLeft += velocity * dt;
      velocity *= Math.pow(FRICTION, dt / 16);
      glideFrame.current = Math.abs(velocity) > MIN_VELOCITY ? requestAnimationFrame(step) : null;
    };
    glideFrame.current = requestAnimationFrame(step);
  }, []);

  // A drag shouldn't also count as a click on whatever is under the mouse.
  const onClickCapture = useCallback((e: React.MouseEvent) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    }
  }, []);

  useEffect(() => stopGlide, []);

  // Shown only while the user is interacting, and only on the side that has more to scroll to.
  const revealed = hovering || scrolling;
  const showBack = revealed && canScroll.back;
  const showForward = revealed && canScroll.forward;

  const arrowClass =
    'absolute top-1/2 -translate-y-1/2 z-10 grid place-items-center w-9 h-9 rounded-full text-2xl ' +
    'bg-white text-black dark:bg-black dark:text-white border border-black/10 dark:border-white/15 shadow-md ' +
    'transition-[opacity,background-color,color] hover:bg-blue-300 hover:text-white dark:hover:bg-blue-300 dark:hover:text-white';

  return (
    <div className="relative" onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
      <div
        ref={ref}
        className={`drag-scroll ${className}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
        onScroll={handleScroll}
        onWheel={stopGlide}
        onTouchStart={stopGlide}
        {...props}
      >
        {children}
      </div>

      <button
        type="button"
        onClick={() => scrollByPage(false)}
        aria-label={t('content.scrollBack')}
        tabIndex={showBack ? 0 : -1}
        className={`${arrowClass} start-1 focus-visible:opacity-100 ${showBack ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <MdChevronLeft className="rtl:-scale-x-100" aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={() => scrollByPage(true)}
        aria-label={t('content.scrollForward')}
        tabIndex={showForward ? 0 : -1}
        className={`${arrowClass} end-1 focus-visible:opacity-100 ${showForward ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <MdChevronRight className="rtl:-scale-x-100" aria-hidden="true" />
      </button>
    </div>
  );
}
