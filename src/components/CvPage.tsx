"use client";

import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft, FaDownload, FaEnvelope, FaGithub, FaGlobe, FaLinkedin, FaMapMarkerAlt } from "react-icons/fa";
import { MdOutlineArrowOutward } from "react-icons/md";
import { useLang, useTranslation } from "@/i18n";
import { siteContent } from "@/data/site";
import { cv as cvEn, cvFa } from "@/data/cv";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { BTN_PRIMARY, BTN_SECONDARY } from "./buttonStyles";
import PHOTO from "@/assets/image/cover.webp";

/**
 * The CV as a normal page of the site (the same content as the PDF, from src/data/cv.ts), with a
 * button to export the PDF. The page follows the language of the site (Persian on /fa, in cvFa);
 * the downloadable PDF is English only.
 */
export default function CvPage() {
  const [t] = useTranslation();
  const { prefix, lang } = useLang();
  const isFa = lang === "fa";
  const cv = isFa ? cvFa : cvEn;

  return (
    <div className="min-h-screen bg-white font-medium dark:bg-black">
      <Navbar />
      <main id="main" className="mx-auto w-full max-w-5xl px-4 pb-16 pt-24 sm:pt-28 md:px-6 lg:pt-32">
        <div dir={isFa ? "rtl" : "ltr"} className="text-start">
          {/* Header */}
          <header className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full border border-black/10 bg-[#f8f8f8] dark:border-white/10">
              <Image src={PHOTO} alt={cv.name} fill sizes="112px" className="object-cover object-top" priority />
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="type-title">{cv.name}</h1>
              <p className="type-body mt-1">{cv.role}</p>
              <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-black/65 dark:text-white/65">
                <li className="flex items-center gap-2">
                  <FaEnvelope className="text-blue-300 dark:text-blue-200" aria-hidden="true" />
                  <a href={`mailto:${cv.email}`} dir="ltr" className="hover:text-black dark:hover:text-white">{cv.email}</a>
                </li>
                <li className="flex items-center gap-2">
                  <FaGlobe className="text-blue-300 dark:text-blue-200" aria-hidden="true" />
                  <a href={cv.websiteUrl} dir="ltr" className="hover:text-black dark:hover:text-white">{cv.website}</a>
                </li>
                <li className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-blue-300 dark:text-blue-200" aria-hidden="true" />
                  <span>{cv.location}</span>
                </li>
              </ul>
            </div>
            <a href={siteContent.cvPath} download="Amir-Rahemi-CV.pdf" className={`${BTN_PRIMARY} self-start sm:self-center`}>
              <FaDownload className="text-sm" aria-hidden="true" />
              <span className="optical-y-en">{t("cvPage.export")}</span>
            </a>
          </header>

          <div className="mt-12 grid gap-12 lg:grid-cols-[1.7fr_1fr] lg:gap-14">
            <div>
              <section>
                <h2 className="type-heading" >{t("cvPage.summary")}</h2>
                <p className="type-body mt-4">{cv.summary}</p>
              </section>

              <section className="mt-12">
                <h2 className="type-heading" >{t("cvPage.projects")}</h2>
                <div className="mt-5 space-y-4">
                  {cv.projects.map((p) => (
                    <article key={p.title} className="rounded-2xl border border-black/10 p-5 dark:border-white/10">
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="text-lg font-bold text-black dark:text-white">{p.title}</h3>
                        <a
                          href={p.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex shrink-0 items-center gap-1 text-sm font-bold text-blue-300 hover:underline dark:text-blue-200"
                        >
                          <span className="optical-y-en">{t("cvPage.visit")}</span>
                          <MdOutlineArrowOutward aria-hidden="true" />
                        </a>
                      </div>
                      <p className="type-body mt-2">{p.description}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {p.tech.split(", ").map((tech) => (
                          <span key={tech} dir="ltr" className="type-pill">
                            <span className="optical-y">{tech}</span>
                          </span>
                        ))}
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <section className="mt-12">
                <h2 className="type-heading" >{t("cvPage.education")}</h2>
                <div className="mt-4">
                  <p className="font-bold text-black dark:text-white">{cv.education.title}</p>
                  <p className="type-body">{cv.education.branch}</p>
                  <p className="type-body">{cv.education.place}</p>
                  <p className="type-small mt-1">{cv.education.years}</p>
                </div>
              </section>
            </div>

            <aside className="space-y-10 self-start lg:sticky lg:top-24">
              <section>
                <h2 className="type-heading" >{t("cvPage.skills")}</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {cv.skills.map((s) => (
                    <span key={s} dir="ltr" className="type-pill">
                      <span className="optical-y">{s}</span>
                    </span>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="type-heading" >{t("cvPage.language")}</h2>
                <p className="type-body mt-3">
                  <strong className="font-bold text-black dark:text-white">{cv.language.name}</strong> — {cv.language.level}
                </p>
              </section>

              <section>
                <h2 className="type-heading" >{t("cvPage.social")}</h2>
                <ul className="mt-3 space-y-2">
                  {cv.social.map((s) => (
                    <li key={s.site}>
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-black/65 hover:text-blue-300 dark:text-white/65 dark:hover:text-blue-200"
                      >
                        {s.site === "GitHub" ? <FaGithub aria-hidden="true" /> : <FaLinkedin aria-hidden="true" />}
                        <span className="optical-y-en">{s.label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            </aside>
          </div>
        </div>

        <div className="mt-14 flex justify-center">
          <Link href={prefix || "/"} className={BTN_SECONDARY}>
            <FaArrowLeft className="text-xs rtl:rotate-180" aria-hidden="true" />
            <span className="optical-y-en">{t("cvPage.back")}</span>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
