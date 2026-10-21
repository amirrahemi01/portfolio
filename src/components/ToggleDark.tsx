"use client";

// Path: src/components/ToggleDark.tsx
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslation } from '@/i18n';
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md';

const STORAGE_KEY = 'selectedThemeType';

/**
 * Light/dark switch. The theme is applied before first paint by a script in the root layout;
 * this just reads that state, flips it, and remembers the choice.
 */
function ToggleDark() {
  const { t } = useTranslation('global');
  // Start from whatever the page already shows (set before first paint by the script in the root
  // layout), so server and client agree. The effect below only runs in the browser.
  const [isDark, setIsDark] = useState(true);
  const pathname = usePathname();
  useEffect(() => {
    // Switching language swaps the root layout, which can drop the data-mode attribute the inline
    // script set. Re-apply the saved (or system) theme after every navigation and sync the icon.
    let dark: boolean;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      dark = saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      dark = document.documentElement.getAttribute('data-mode') !== 'light';
    }
    const mode = dark ? 'dark' : 'light';
    document.documentElement.setAttribute('data-mode', mode);
    document.body.setAttribute('data-mode', mode);
    setIsDark(dark);
  }, [pathname]);

  const toggle = () => {
    const next = !isDark;
    const mode = next ? 'dark' : 'light';
    setIsDark(next);
    // Tailwind's `dark:` variant and the scrollbar CSS look at data-mode on <html> and <body>.
    document.documentElement.setAttribute('data-mode', mode);
    document.body.setAttribute('data-mode', mode);
    try {
      // Only a deliberate click is remembered; until then the system setting decides.
      localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      /* private mode: the choice just won't be remembered */
    }
  };

  // The icon shows what a click will switch TO, and the label says so too.
  const label = isDark ? t('navbar.themeToLight') : t('navbar.themeToDark');
  const Icon = isDark ? MdOutlineLightMode : MdOutlineDarkMode;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="grid h-9 w-9 place-items-center rounded-full text-xl text-black transition-colors hover:bg-black/10 dark:text-white dark:hover:bg-white/15"
    >
      <Icon aria-hidden="true" />
    </button>
  );
}

export default ToggleDark;
