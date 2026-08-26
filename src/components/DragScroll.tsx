import React, { useRef, useCallback, useEffect } from 'react';

interface DragScrollProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/**
 * DragScroll — hides scrollbar and enables click/drag-to-scroll
 * Works with mouse (desktop) and touch (mobile) via unified handlers.
 * Keeps native wheel/touch momentum scroll intact.
 */
export default function DragScroll({ children, className = '', ...props }: DragScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const hasDragged = useRef(false);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    isDown.current = true;
    hasDragged.current = false;
    el.classList.add('active');
    startX.current = e.pageX;
    scrollLeft.current = el.scrollLeft;
  }, []);

  const onMouseLeave = useCallback(() => {
    if (!isDown.current) return;
    isDown.current = false;
    ref.current?.classList.remove('active');
  }, []);

  const onMouseUp = useCallback(() => {
    isDown.current = false;
    ref.current?.classList.remove('active');
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDown.current) return;
    e.preventDefault();
    const el = ref.current;
    if (!el) return;
    const x = e.pageX;
    const walk = x - startX.current;
    if (Math.abs(walk) > 3) hasDragged.current = true;
    el.scrollLeft = scrollLeft.current - walk;
  }, []);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    const el = ref.current;
    if (!el) return;
    isDown.current = true;
    hasDragged.current = false;
    startX.current = e.touches[0].pageX;
    scrollLeft.current = el.scrollLeft;
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDown.current) return;
    const el = ref.current;
    if (!el) return;
    const x = e.touches[0].pageX;
    const walk = x - startX.current;
    if (Math.abs(walk) > 5) hasDragged.current = true;
    el.scrollLeft = scrollLeft.current - walk;
  }, []);

  const onTouchEnd = useCallback(() => {
    isDown.current = false;
  }, []);

  // Prevent click when the user was dragging (avoid accidental navigation)
  const onClickCapture = useCallback((e: React.MouseEvent) => {
    if (hasDragged.current) {
      e.preventDefault();
      e.stopPropagation();
      hasDragged.current = false;
    }
  }, []);

  // Ensure drag ends even if mouse is released outside the element
  useEffect(() => {
    const handleWindowMouseUp = () => {
      if (isDown.current) {
        isDown.current = false;
        ref.current?.classList.remove('active');
      }
    };
    const handleWindowTouchEnd = () => {
      isDown.current = false;
    };
    window.addEventListener('mouseup', handleWindowMouseUp);
    window.addEventListener('touchend', handleWindowTouchEnd);
    return () => {
      window.removeEventListener('mouseup', handleWindowMouseUp);
      window.removeEventListener('touchend', handleWindowTouchEnd);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`drag-scroll ${className}`}
      onMouseDown={onMouseDown}
      onMouseLeave={onMouseLeave}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onClickCapture={onClickCapture}
      {...props}
    >
      {children}
    </div>
  );
}
