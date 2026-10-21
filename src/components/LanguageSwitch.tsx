"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const OPTIONS = [
  { lang: 'en', short: 'EN', name: 'English' },
  { lang: 'fa', short: 'FA', name: 'فارسی' },
] as const;

/**
 * Two-option language switch: both languages are always visible and the current one is filled,
 * so it's obvious what it does and where you are. Switching keeps you on the same page.
 */
function LanguageSwitch() {
  // The proxy rewrites "/x" to "/en/x" internally, so the English prefix can show up here too.
  const raw = usePathname();
  const pathname = raw === '/en' ? '/' : raw.startsWith('/en/') ? raw.slice(3) : raw;
  const isFa = pathname === '/fa' || pathname.startsWith('/fa/');
  const basePath = isFa ? pathname.slice(3) || '/' : pathname;

  const pathFor = (lang: 'en' | 'fa') => {
    const path = lang === 'fa' ? (basePath === '/' ? '/fa' : `/fa${basePath}`) : basePath;
    return path;
  };

  return (
    <div role="group" aria-label="Language" dir="ltr" className="flex h-10 items-center rounded-full bg-black/[0.06] p-1 dark:bg-white/10">
      {OPTIONS.map(({ lang, short, name }) => {
        const active = (lang === 'fa') === isFa;
        return (
          <Link
            key={lang}
            href={pathFor(lang)}
            scroll={false}
            lang={lang}
            hrefLang={lang}
            aria-label={`${short} – ${name}`}
            aria-current={active ? 'true' : undefined}
            title={name}
            className={`relative flex h-8 min-w-[2.75rem] items-center justify-center rounded-full px-3 text-[12px] font-bold transition-colors after:absolute after:inset-x-0 after:-inset-y-1.5 after:content-[''] ${
              active
                ? 'bg-black text-white dark:bg-white dark:text-black'
                : 'text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white'
            }`}
          >
            <span className="optical-y">{short}</span>
          </Link>
        );
      })}
    </div>
  );
}

export default LanguageSwitch;
