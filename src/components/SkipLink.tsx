"use client";

import { useTranslation } from "@/i18n";

/** First thing a keyboard user can tab to: jumps past the navigation to the page content. */
export default function SkipLink() {
  const [t] = useTranslation();
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[10000] focus:rounded-md focus:bg-black focus:px-3 focus:py-2 focus:text-sm focus:font-bold focus:text-white dark:focus:bg-white dark:focus:text-black"
    >
      {t("a11y.skip")}
    </a>
  );
}
