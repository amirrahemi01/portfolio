"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { FaArrowLeft, FaArrowRight, FaCheck } from "react-icons/fa";
import { MdOutlineArrowOutward } from "react-icons/md";
import { useLang, useTranslation } from "@/i18n";
import { projectsData, getProjectBySlug } from "@/data/projects";
import Navbar from "./Navbar";
import Footer from "./Footer";
import VideoPlayer from "./VideoPlayer";
import { BTN_PRIMARY, BTN_SECONDARY } from "./buttonStyles";

export default function ProjectDetail({ slug }: { slug: string }) {
  const [t] = useTranslation();
  const { lang, prefix } = useLang();

  // The page route only renders for slugs that exist (it returns a 404 otherwise).
  const resolvedProject = getProjectBySlug(slug);
  if (!resolvedProject) return null;

  const p = resolvedProject;
  const title = p.title[lang];
  const shortDesc = p.shortDescription[lang];
  const longDesc = p.longDescription[lang];
  const features = p.features?.[lang] ?? [];
  const isMobile = p.tags.includes("Mobile");

  // Find prev/next
  const idx = projectsData.findIndex((x) => x.slug === p.slug);
  const prev = idx > 0 ? projectsData[idx - 1] : null;
  const next = idx < projectsData.length - 1 ? projectsData[idx + 1] : null;


  const facts = [
    { label: t("project.year"), value: p.year },
    { label: t("project.role"), value: p.role[lang] },
    { label: t("project.timeline"), value: p.duration[lang] },
    { label: t("project.status"), value: p.status[lang] },
  ];

  return (
    <div className="min-h-screen bg-white font-medium dark:bg-black">
      <Navbar />

      <main id="main" className="relative w-full lg:w-[78%] max-w-6xl mx-auto px-4 md:px-6 pt-24 sm:pt-28 lg:pt-32 pb-12">
        {/* Back + label */}
        {/* Sits in the same top row as the language / theme / menu pill (same top offsets, +4px to centre it on the pill) */}
        <div className="absolute left-4 top-[calc(1rem+4px)] z-10 md:left-6 sm:top-[calc(1.5rem+4px)] lg:top-[calc(3rem+4px)]">
          <Link
            href={`${prefix}/#projects`}
            className="group inline-flex h-10 items-center gap-2.5 rounded-full border border-black/10 bg-white ps-1.5 pe-4 text-sm font-bold text-black transition-colors duration-200 hover:border-transparent hover:bg-blue-300 hover:text-white dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:border-transparent dark:hover:bg-blue-300"
          >
            <span className="grid h-7 w-7 place-items-center rounded-full bg-black text-white transition-colors duration-200 group-hover:bg-white group-hover:text-blue-300 dark:bg-white dark:text-black">
              <FaArrowLeft className="text-[11px] transition-transform duration-200 group-hover:-translate-x-0.5" aria-hidden="true" />
            </span>
            <span className="hidden sm:inline optical-y-en">{t("project.backToProjects")}</span>
            <span className="sm:hidden optical-y-en">{t("project.back")}</span>
          </Link>
        </div>

        {/* Header */}
        <header className="max-w-3xl">
          <h1 className="type-title">{title}</h1>
          <p className="type-body mt-4 max-w-2xl">{shortDesc}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            {p.links.live && (
              <a href={lang === "fa" && p.links.liveFa ? p.links.liveFa : p.links.live} target="_blank" rel="noopener noreferrer" className={BTN_PRIMARY}>
                <span className="optical-y-en">{t("project.liveDemo")}</span>
                <MdOutlineArrowOutward className="text-base rtl:-scale-x-100" aria-hidden="true" />
              </a>
            )}
            {p.links.adminLive && (
              <a href={p.links.adminLive} target="_blank" rel="noopener noreferrer" className={BTN_PRIMARY}>
                <span className="optical-y-en">{t("project.adminDemo")}</span>
                <MdOutlineArrowOutward className="text-base rtl:-scale-x-100" aria-hidden="true" />
              </a>
            )}
            {!p.links.live && !p.links.adminLive && (
              <span className="inline-flex h-10 items-center rounded-full bg-black/5 px-5 text-sm text-black/55 dark:bg-white/5 dark:text-white/55">
                <span className="optical-y-en">{t("project.linksSoon")}</span>
              </span>
            )}
          </div>
        </header>

        {/* Cover: plain, no overlay and no hover effect */}
        <figure className="mt-10 overflow-hidden rounded-2xl border border-black/10 bg-black/5 dark:border-white/10 dark:bg-white/5">
          <Image
            src={p.cover}
            alt={`${title} cover`}
            priority
            sizes="(min-width: 1024px) 960px, 100vw"
            className="aspect-[16/10] h-auto w-full object-cover object-top"
          />
        </figure>

        {/* Facts */}
        <dl className="mt-6 grid grid-cols-2 md:grid-cols-4">
          {facts.map((f, i) => (
            <div
              key={f.label}
              className={clsx(
                "py-4 md:py-5",
                // phone: 2 columns, so the 2nd column gets a divider and the 2nd row a top rule
                i % 2 === 1 && "border-s border-black/10 ps-5 dark:border-white/10",
                i > 1 && "border-t border-black/10 dark:border-white/10",
                // desktop: one row with dividers between every item
                i > 0 && "md:border-s md:border-black/10 md:ps-5 dark:md:border-white/10",
                i > 1 && "md:border-t-0",
                i % 2 === 0 && i > 0 && "md:ps-5"
              )}
            >
              <dt className="type-label">{f.label}</dt>
              <dd className="mt-1.5 text-base font-bold text-black dark:text-white">{f.value}</dd>
            </div>
          ))}
        </dl>

        {/* Overview + side */}
        <div className="mt-12 grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-14">
          <div>
            <section>
              <h2 className="type-heading">{t("project.overview")}</h2>
              <p className="type-body mt-4">{longDesc}</p>
            </section>

            {features.length > 0 && (
            <section className="mt-12">
              <h2 className="type-heading">{t("project.keyFeatures")}</h2>
              <ul className="mt-5 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                {features.map((f, i) => (
                  <li key={i} className="type-body flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
                      <FaCheck className="text-[10px]" aria-hidden="true" />
                    </span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </section>
            )}

            {/* Optional write-up (fill `writeup` in src/data/projects.ts) */}
            {p.writeup && (
              <section className="mt-12 space-y-8">
                {(["problem", "solution", "result"] as const).map((key) => (
                  <div key={key}>
                    <h2 className="type-heading">{t(`project.${key}`)}</h2>
                    <p className="type-body mt-3">{p.writeup![key][lang]}</p>
                  </div>
                ))}
              </section>
            )}

            {/* Optional demo recording (fill `video` in src/data/projects.ts) */}
            {p.video && (
              <section className="mt-12">
                <h2 className="type-heading">{t("project.demoVideo")}</h2>
                <VideoPlayer
                  src={p.video}
                  poster={p.videoPoster}
                  label={`${title} demo video`}
                  width={p.videoSize?.width ?? 1280}
                  height={p.videoSize?.height ?? 720}
                />
              </section>
            )}
          </div>

          <aside className="self-start rounded-2xl border border-black/10 bg-black/[0.03] p-6 dark:border-white/10 dark:bg-white/[0.04] lg:sticky lg:top-24">
            <h3 className="type-label">
              <span className="optical-y-en">{t("project.techStack")}</span>
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {p.techStack.map((tech) => (
                <span key={tech} className="type-pill">
                  <span className="optical-y">{tech}</span>
                </span>
              ))}
            </div>

            <h3 className="type-label mt-8">{t("project.details")}</h3>
            <dl className="mt-3 text-sm">
              <div className="flex justify-between gap-4 py-3">
                <dt className="text-black/55 dark:text-white/55">{t("project.platform")}</dt>
                <dd className="font-bold text-black dark:text-white">{isMobile ? t("project.mobile") : "Web"}</dd>
              </div>
            </dl>
          </aside>
        </div>

        {/* Screenshots */}
        {p.screenshots.length > 0 && (
        <section className="mt-14">
          <div className="flex items-end justify-between gap-4">
            <h2 className="type-heading">{t("project.screenshots")}</h2>
            <span className="type-label">
              {p.screenshots.length} {t("project.shots")}
            </span>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
            {p.screenshots.map((src, i) => (
              <div
                key={i}
                className={clsx(
                  "overflow-hidden rounded-2xl border border-black/10 bg-black/5 dark:border-white/10 dark:bg-white/5",
                  i === 3 && "md:col-span-2"
                )}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={typeof src === "string" ? src : src.src}
                  alt={`${title} screenshot ${i + 1}`}
                  className={clsx("w-full object-cover", i === 3 ? "aspect-[16/9]" : "aspect-[16/10]")}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </section>
        )}

        {/* Previous / next */}
        <nav aria-label="Projects" className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
          {prev ? (
            <Link
              href={`${prefix}/projects/${prev.slug}`}
              className="group flex items-center gap-4 rounded-2xl border border-black/10 p-4 transition-colors hover:border-black dark:border-white/10 dark:hover:border-white"
            >
              <Image src={prev.cover} alt="" sizes="80px" className="h-14 w-20 shrink-0 rounded-lg object-cover" />
              <div className="min-w-0 flex-1">
                <div className="type-label">{t("project.previous")}</div>
                <div className="mt-1 truncate font-bold text-black dark:text-white">{prev.title[lang]}</div>
              </div>
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-black/5 text-black transition-colors group-hover:bg-black group-hover:text-white dark:bg-white/10 dark:text-white dark:group-hover:bg-white dark:group-hover:text-black">
                <FaArrowLeft className="text-xs rtl:rotate-180" aria-hidden="true" />
              </span>
            </Link>
          ) : (
            <div className="hidden md:block" />
          )}
          {next && (
            <Link
              href={`${prefix}/projects/${next.slug}`}
              className="group flex items-center gap-4 rounded-2xl border border-black/10 p-4 transition-colors hover:border-black dark:border-white/10 dark:hover:border-white"
            >
              <Image src={next.cover} alt="" sizes="80px" className="h-14 w-20 shrink-0 rounded-lg object-cover" />
              <div className="min-w-0 flex-1">
                <div className="type-label">{t("project.next")}</div>
                <div className="mt-1 truncate font-bold text-black dark:text-white">{next.title[lang]}</div>
              </div>
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-black/5 text-black transition-colors group-hover:bg-black group-hover:text-white dark:bg-white/10 dark:text-white dark:group-hover:bg-white dark:group-hover:text-black">
                <FaArrowRight className="text-xs rtl:rotate-180" aria-hidden="true" />
              </span>
            </Link>
          )}
        </nav>

        {/* Bottom back */}
        <div className="mt-10 text-center">
          <Link href={prefix || "/"} className={BTN_SECONDARY}>
            <FaArrowLeft className="text-xs rtl:rotate-180" aria-hidden="true" />
            <span className="optical-y-en">{t("project.backHome")}</span>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
