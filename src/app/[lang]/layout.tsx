import type { Metadata, Viewport } from "next";
import { Vazirmatn } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { LangProvider } from "@/i18n";
import SkipLink from "@/components/SkipLink";
import ThemeScript from "@/components/ThemeScript";
import { SITE_URL, getDictionary, isLang, type Lang } from "@/i18n/dictionaries";
import "../globals.css";

// Vazirmatn covers Persian and Latin. Only the weights the site really uses are loaded:
// 400 (placeholders, hero greeting), 500 (body), 700 (labels, buttons, headings), 900 (titles).
const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700", "900"],
  display: "swap",
  variable: "--font-vazirmatn",
});

// Only /en and /fa exist (the proxy maps "/" to /en). Anything else is a 404.
export const dynamicParams = false;
export const generateStaticParams = () => [{ lang: "en" }, { lang: "fa" }];

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = getDictionary(isLang(lang) ? lang : "en");
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: dict.seo.title, template: `%s — ${dict.hero.firstName} ${dict.hero.lastName}` },
    applicationName: "Amir Rahemi",
    authors: [{ name: "Amir Rahemi", url: SITE_URL }],
    manifest: "/manifest.json",
    icons: {
      icon: [
        { url: "/favicon.ico" },
        { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      ],
      apple: [{ url: "/favicon/apple-touch-icon.png", sizes: "180x180" }],
    },
    verification: { google: "g_1thjCsV9Zsk6mFnfvHTwtioi2tn7J4Zz_4ufHwNrg" },
  };
}

// Runs before the first paint so there is no light/dark flash. First visit: follow the system
// setting; after the user picks a theme with the toggle, that choice wins.

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  const lang: Lang = isLang(raw) ? raw : "en";

  return (
    // data-mode is set by the script above before React runs, hence suppressHydrationWarning.
    // data-scroll-behavior tells Next that CSS smooth scrolling is on, so it can switch it off while
    // changing pages (a new page then starts at the top at once instead of scrolling there slowly).
    <html lang={lang} dir={lang === "fa" ? "rtl" : "ltr"} className={vazirmatn.variable} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="bg-white font-medium dark:bg-black">
        <LangProvider lang={lang} dict={getDictionary(lang)}>
          <SkipLink />
          {children}
        </LangProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
