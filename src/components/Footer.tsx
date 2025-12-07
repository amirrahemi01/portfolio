import React from 'react';
import { useTranslation } from 'react-i18next';

type Props = {}

function Footer({ }: Props) {
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
    <footer dir={isFa === "fa" ? "rtl" : "ltr"}  className="flex flex-col items-start sm:flex-row sm:justify-between bg-slate-200 dark:bg-slate-960 text-slate-965 dark:text-slate-100 p-3 mt-4 font-lalezar">
      <p className="">&copy; {getFormattedYear()} {t("content.copy")}</p>
      <p className="flex " dir={isFa === "fa" ? "rtl" : "ltr"}>
        {t("content.made with")}
        <span className="mx-1">
          <img src="https://emojicdn.elk.sh/%F0%9F%A9%B5" alt="" width="20" />
        </span>
        {t("content.in rasht")}
      </p>
    </footer>
  );
}

export default Footer;