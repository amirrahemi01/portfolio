import type { Metadata } from "next";
import CvPage from "@/components/CvPage";
import { SITE_URL, getDictionary, isLang, prefixFor, type Lang } from "@/i18n/dictionaries";

type Props = { params: Promise<{ lang: string }> };

const ogImage = (lang: Lang) => `/og/cv-${lang}.png`;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang: raw } = await params;
  const lang: Lang = isLang(raw) ? raw : "en";
  const dict = getDictionary(lang);
  const url = `${SITE_URL}${prefixFor(lang)}/cv`;
  const title = dict.cvPage.metaTitle; // the layout adds "— Amir Rahemi"
  const description = dict.cvPage.metaDescription;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: { en: `${SITE_URL}/cv`, fa: `${SITE_URL}/fa/cv`, "x-default": `${SITE_URL}/cv` },
    },
    openGraph: {
      type: "profile",
      url,
      siteName: "Amir Rahemi Portfolio",
      title: `${title} — ${dict.hero.firstName} ${dict.hero.lastName}`,
      description,
      locale: lang === "fa" ? "fa_IR" : "en_US",
      images: [{ url: ogImage(lang), width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      site: "@madeby_amir",
      creator: "@madeby_amir",
      title: `${title} — ${dict.hero.firstName} ${dict.hero.lastName}`,
      description,
      images: [ogImage(lang)],
    },
  };
}

export default async function Page({ params }: Props) {
  const { lang: raw } = await params;
  const lang: Lang = isLang(raw) ? raw : "en";
  const dict = getDictionary(lang);
  const url = `${SITE_URL}${prefixFor(lang)}/cv`;
  const home = lang === "fa" ? `${SITE_URL}/fa` : `${SITE_URL}/`;

  // The CV is a profile of the Person defined on the home page, plus breadcrumbs (Home > CV).
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${url}#profile`,
        url,
        name: `${dict.cvPage.metaTitle} — ${dict.hero.firstName} ${dict.hero.lastName}`,
        description: dict.cvPage.metaDescription,
        inLanguage: lang === "fa" ? "fa-IR" : "en-US",
        dateModified: "2026-10-25T00:00:00+03:30",
        mainEntity: { "@id": `${SITE_URL}/#person` },
        isPartOf: { "@id": `${SITE_URL}/#website` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: lang === "fa" ? "خانه" : "Home", item: home },
          { "@type": "ListItem", position: 2, name: dict.cvPage.title, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        // Our own data; "<" is escaped so it can never close the script tag.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <CvPage />
    </>
  );
}
