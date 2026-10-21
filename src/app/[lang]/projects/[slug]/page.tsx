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
  const description = project.shortDescription[lang];
  const path = `/projects/${project.slug}`;
  const url = `${SITE_URL}${prefixFor(lang)}${path}`;
  const dict = getDictionary(lang);

  return {
    title, // the layout adds "— Amir Rahemi"
    description,
    alternates: {
      canonical: url,
      languages: { en: `${SITE_URL}${path}`, fa: `${SITE_URL}/fa${path}`, "x-default": `${SITE_URL}${path}` },
    },
    openGraph: {
      type: "article",
      url,
      siteName: "Amir Rahemi Portfolio",
      title: `${title} — ${dict.hero.firstName} ${dict.hero.lastName}`,
      description,
      locale: lang === "fa" ? "fa_IR" : "en_US",
      images: [{ url: ogImage(project.slug, lang), width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      site: "@madeby_amir",
      creator: "@madeby_amir",
      title: `${title} — ${dict.hero.firstName} ${dict.hero.lastName}`,
      description,
      images: [ogImage(project.slug, lang)],
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  if (!getProjectBySlug(slug)) notFound();
  return <ProjectDetail slug={slug} />;
}
