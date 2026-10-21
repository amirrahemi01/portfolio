"use client";

import React from 'react';
import { useTranslation } from '@/i18n';

function Footer() {
  const [t, i18n] = useTranslation("global");
  
  // Function to get current year
  const getCurrentYear = (): number => {
    return new Date().getFullYear();
  };

  // Function to convert numbers to Persian/Arabic numerals
  const toArabicNumerals = (num: number): string => {
    const arabicNumerals = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return num.toString().split('').map(digit => arabicNumerals[parseInt(digit)]).join('');
  };

  // Get year in appropriate format based on language
  const getFormattedYear = (): string => {
    const year = getCurrentYear();
    return i18n.language === 'fa' ? toArabicNumerals(year) : year.toString();
  };

  const isFa = (i18n.language || "en") as "en" | "fa";

  return (
    <footer
      dir={isFa === "fa" ? "rtl" : "ltr"}
      className="relative mt-8 border-t border-black/[0.06] dark:border-white/[0.06] bg-white/70 dark:bg-black/40 backdrop-blur-xl"
    >
      <div className="w-full lg:w-3/4 max-w-7xl mx-auto px-4 md:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
        <p className="type-small flex items-center gap-1.5 text-center sm:text-left" dir={isFa === "fa" ? "rtl" : "ltr"}>
          {/* ltr:-top moves the dot up to the middle of the capital letters; Persian is already centered */}
          <span className="relative ltr:-top-[0.17em] hidden sm:inline w-1.5 h-1.5 rounded-full bg-emerald-500/70" />
          &copy; <span suppressHydrationWarning>{getFormattedYear()}</span> {t("content.copy")}
        </p>
        <p
          className="type-small flex items-center justify-center gap-1.5"
          dir={isFa === "fa" ? "rtl" : "ltr"}
        >
          <span>{t("content.made with")}</span>
          <span className="relative ltr:-top-[0.17em] inline-flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/heart.png"
              alt="love"
              width={16}
              height={16}
              className="h-4 w-4"
              onError={(e) => {
                // Local file first; fall back to the emoji CDN only if it fails to load.
                const img = e.currentTarget;
                if (!img.dataset.fallback) {
                  img.dataset.fallback = '1';
                  img.src = 'https://emojicdn.elk.sh/%F0%9F%A9%B5';
                }
              }}
            />
          </span>
          <span>{t("content.in rasht")}</span>
        </p>
      </div>
    </footer>
  );
}

export default Footer;