import type { Metadata } from "next";
import Home from "@/components/Home";
import { SITE_URL, getDictionary, isLang, prefixFor, type Lang } from "@/i18n/dictionaries";

type Props = { params: Promise<{ lang: string }> };

const ogImage = (lang: Lang) => `/og/home-${lang}.png`;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang: raw } = await params;
  const lang: Lang = isLang(raw) ? raw : "en";
  const dict = getDictionary(lang);
  const url = `${SITE_URL}${prefixFor(lang)}`;

  return {
    // The home page title is the full line, so the "— Amir Rahemi" template from the layout is skipped.
    title: { absolute: dict.seo.title },
    description: dict.seo.description,
    alternates: {
      canonical: url,
      languages: { en: SITE_URL, fa: `${SITE_URL}/fa`, "x-default": SITE_URL },
    },
    openGraph: {
      type: "website",
      url,
      siteName: "Amir Rahemi Portfolio",
      title: dict.seo.title,
      description: dict.seo.ogDescription,
      locale: lang === "fa" ? "fa_IR" : "en_US",
      alternateLocale: lang === "fa" ? ["en_US"] : ["fa_IR"],
      images: [{ url: ogImage(lang), width: 1200, height: 630, alt: dict.seo.title }],
    },
    twitter: {
      card: "summary_large_image",
      site: "@madeby_amir",
      creator: "@madeby_amir",
      title: dict.seo.title,
      description: dict.seo.ogDescription,
      images: [ogImage(lang)],
    },
  };
}

export default async function HomePage({ params }: Props) {
  const { lang: raw } = await params;
  const lang: Lang = isLang(raw) ? raw : "en";
  const dict = getDictionary(lang);
  const url = `${SITE_URL}${prefixFor(lang)}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Amir Rahemi",
    alternateName: "امیر راحمی",
    jobTitle: "Full-Stack Developer",
    url,
    address: { "@type": "PostalAddress", addressLocality: "Rasht", addressCountry: "IR" },
    sameAs: [
      "https://github.com/amirrahemi01",
      "https://linkedin.com/in/amirrahemi",
      "https://twitter.com/madeby_amir",
      "https://t.me/amirrahemii",
    ],
    knowsAbout: ["JavaScript", "TypeScript", "React", "Next.js", "Flutter", "Dart", "Go", "Node.js", "Full-Stack Development", "Mobile Development"],
    description: dict.seo.schemaDescription,
    image: `${SITE_URL}/logo.png`,
    inLanguage: lang === "fa" ? "fa-IR" : "en-US",
  };

  return (
    <>
      <script
        type="application/ld+json"
        // JSON.stringify output is safe here: it is our own data, with "<" escaped below.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Home />
    </>
  );
}
