import en from "@/assets/locale/en/translation.json";
import fa from "@/assets/locale/fa/translation.json";

export const LANGS = ["en", "fa"] as const;
export type Lang = (typeof LANGS)[number];
export type Dictionary = typeof en;

const dictionaries: Record<Lang, Dictionary> = { en, fa };

export const isLang = (value: string): value is Lang => (LANGS as readonly string[]).includes(value);

/** Server-safe: use in layouts, pages and generateMetadata. Client components use useTranslation(). */
export const getDictionary = (lang: Lang): Dictionary => dictionaries[lang];

// Your real address. In Vercel the apex (amirrahemi.com) redirects to www, so every canonical URL,
// sitemap entry and link preview must use www too; a canonical that redirects away confuses Google.
export const SITE_URL = "https://www.amirrahemi.com";

/** Path prefix for a language: English has none ("/"), Persian lives under "/fa". */
export const prefixFor = (lang: Lang) => (lang === "fa" ? "/fa" : "");
