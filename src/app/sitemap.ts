import type { MetadataRoute } from "next";
import { projectsData } from "@/data/projects";
import { SITE_URL } from "@/i18n/dictionaries";

// Built from the project list, so a new project is in the sitemap as soon as it is added to
// src/data/projects.ts. Each page lists both languages (English at "/", Persian under "/fa").
// /cv is left out on purpose: it is set to noindex.
const LAST_UPDATED = new Date("2026-10-20");

const entry = (path: string, priority: number): MetadataRoute.Sitemap[number] => {
  const en = `${SITE_URL}${path}`;
  const fa = `${SITE_URL}/fa${path === "/" ? "" : path}`;
  return {
    url: en,
    lastModified: LAST_UPDATED,
    changeFrequency: "monthly",
    priority,
    alternates: { languages: { en, fa, "x-default": en } },
  };
};

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", ...projectsData.map((p) => `/projects/${p.slug}`)];
  // Persian pages are separate URLs, so they get their own entries too.
  return pages.flatMap((path) => {
    const en = entry(path, path === "/" ? 1 : 0.7);
    const faUrl = `${SITE_URL}/fa${path === "/" ? "" : path}`;
    return [en, { ...en, url: faUrl }];
  });
}
