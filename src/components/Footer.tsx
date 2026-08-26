import React from 'react';
import { useTranslation } from 'react-i18next';

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
    return i18n.language === 'fa' || i18n.language === 'ar' ? toArabicNumerals(year) : year.toString();
  };

  const isFa = (i18n.language || "en") as "en" | "fa";

  return (
    <footer
      dir={isFa === "fa" ? "rtl" : "ltr"}
      className="relative mt-8 border-t border-black/[0.06] dark:border-white/[0.06] bg-white/70 dark:bg-black/40 backdrop-blur-xl"
    >
      {/* subtle top gradient line like portfolio dividers */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-300/40 dark:via-white/10 to-transparent" />
      <div className="w-full lg:w-3/4 max-w-7xl mx-auto px-4 md:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
        <p className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 font-medium tracking-wide text-center sm:text-left" dir={isFa === "fa" ? "rtl" : "ltr"}>
          <span className="hidden sm:inline w-1.5 h-1.5 rounded-full bg-emerald-500/70" />
          &copy; {getFormattedYear()} {t("content.copy")}
        </p>
        <p
          className="flex items-center justify-center gap-1.5 text-slate-600 dark:text-slate-400 font-medium"
          dir={isFa === "fa" ? "rtl" : "ltr"}
        >
          <span>{t("content.made with")}</span>
          <span className="inline-flex items-center justify-center rounded-full bg-pink-500/10 dark:bg-pink-500/20">
            <img src="https://emojicdn.elk.sh/%F0%9F%A9%B5" alt="heart" width="14" height="14" className="object-contain" />
          </span>
          <span>{t("content.in rasht")}</span>
        </p>
      </div>
    </footer>
  );
}

export default Footer;