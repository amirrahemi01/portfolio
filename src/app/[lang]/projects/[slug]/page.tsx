import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectDetail from "@/components/ProjectDetail";
import { projectsData, getProjectBySlug } from "@/data/projects";
import { LANGS, SITE_URL, getDictionary, isLang, prefixFor, type Lang } from "@/i18n/dictionaries";

type Props = { params: Promise<{ lang: string; slug: string }> };

// Every project, in both languages, is built ahead of time.
export const generateStaticParams = () =>
  LANGS.flatMap((lang) => projectsData.map((p) => ({ lang, slug: p.slug })));

const ogImage = (slug: string, lang: Lang) => `/og/project-${slug}-${lang}.png`;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang: rawLang, slug } = await params;
  const lang: Lang = isLang(rawLang) ? rawLang : "en";
  const project = getProjectBySlug(slug);
  if (!project) return { title: "404", robots: { index: false } };

  const title = project.title[lang];
  const pageTitle = `${title} — ${project.subtitle[lang]}`; // the layout adds "— Amir Rahemi"
  const description = project.shortDescription[lang];
  const path = `/projects/${project.slug}`;
  const url = `${SITE_URL}${prefixFor(lang)}${path}`;
  const dict = getDictionary(lang);

  return {
    title: pageTitle,
    description,
    alternates: {
      canonical: url,
      languages: { en: `${SITE_URL}${path}`, fa: `${SITE_URL}/fa${path}`, "x-default": `${SITE_URL}${path}` },
    },
    openGraph: {
      type: "article",
      url,
      siteName: "Amir Rahemi Portfolio",
      title: `${pageTitle} — ${dict.hero.firstName} ${dict.hero.lastName}`,
      description,
      locale: lang === "fa" ? "fa_IR" : "en_US",
      images: [{ url: ogImage(project.slug, lang), width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      site: "@madeby_amir",
      creator: "@madeby_amir",
      title: `${pageTitle} — ${dict.hero.firstName} ${dict.hero.lastName}`,
      description,
      images: [ogImage(project.slug, lang)],
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { lang: rawLang, slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();
  const lang: Lang = isLang(rawLang) ? rawLang : "en";
  const path = `/projects/${project.slug}`;
  const url = `${SITE_URL}${prefixFor(lang)}${path}`;

  // Structured data: the project as a creative work by the Person defined on the home page, plus
  // breadcrumbs (Home > Project) that search results can show instead of the raw URL.
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        "@id": `${url}#project`,
        name: project.title[lang],
        headline: `${project.title[lang]} — ${project.subtitle[lang]}`,
        description: project.shortDescription[lang],
        url,
        image: `${SITE_URL}/og/project-${project.slug}-${lang}.png`,
        inLanguage: lang === "fa" ? "fa-IR" : "en-US",
        dateCreated: project.year,
        keywords: project.techStack.join(", "),
        author: { "@id": `${SITE_URL}/#person` },
        isPartOf: { "@id": `${SITE_URL}/#website` },
        ...(project.links.live ? { sameAs: [project.links.live] } : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: lang === "fa" ? "خانه" : "Home", item: lang === "fa" ? `${SITE_URL}/fa` : `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: project.title[lang], item: url },
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
      <ProjectDetail slug={slug} />
    </>
  );
}
