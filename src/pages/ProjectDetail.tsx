import React, { useEffect } from "react";
import { useParams, useLocation, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import {
  FaArrowLeft,
  FaArrowRight,
  FaGithub,
  FaCheck,
  FaCalendar,
  FaUser,
  FaClock,
  FaLayerGroup,
  FaExpand,
} from "react-icons/fa";
import { MdOutlineArrowOutward } from "react-icons/md";
import { projectsData, getProjectBySlug } from "../data/projects";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const SITE_URL = "https://amirrahemi.com";

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [, i18n] = useTranslation("global");

  // language from URL prefix
  const isFa = location.pathname.startsWith("/fa");
  const lang: "en" | "fa" = isFa ? "fa" : "en";

  useEffect(() => {
    if (i18n.language !== lang) i18n.changeLanguage(lang);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [lang, i18n, slug]);

  const project = slug ? getProjectBySlug(slug) : undefined;

  // fallback — try to match decoded slug
  const decodedSlug = slug ? decodeURIComponent(slug) : "";
  const resolvedProject = project || getProjectBySlug(decodedSlug);

  if (!resolvedProject) {
    return (
      <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white flex flex-col">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center px-4 py-20 text-center">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-slate-600 via-purple-400 to-pink-400 bg-clip-text text-transparent">404</h1>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            {lang === "fa" ? "پروژه یافت نشد" : "Project not found"}
          </p>
          <Link
            to={isFa ? "/fa" : "/"}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-slate-655 to-purple-600 text-white font-semibold hover:scale-105 transition-transform"
          >
            {lang === "fa" ? "بازگشت به خانه" : "Back to home"}
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const p = resolvedProject;
  const title = p.title[lang];
  const shortDesc = p.shortDescription[lang];
  const longDesc = p.longDescription[lang];
  const features = p.features[lang];
  const role = p.role[lang];
  const duration = p.duration[lang];
  const status = p.status[lang];

  // Find prev/next
  const idx = projectsData.findIndex((x) => x.slug === p.slug);
  const prev = idx > 0 ? projectsData[idx - 1] : null;
  const next = idx < projectsData.length - 1 ? projectsData[idx + 1] : null;

  const prefix = isFa ? "/fa" : "";
  const canonicalUrl = `${SITE_URL}${prefix}/projects/${p.slug}`;

  return (
    <div dir={isFa ? "rtl" : "ltr"} className={clsx("min-h-screen bg-white dark:bg-black font-paytone rtl:font-lalezar", isFa ? "normal-case" : "capitalize")}>
      <Helmet>
        <html lang={lang} dir={lang === "fa" ? "rtl" : "ltr"} />
        <title>{`${title} — Amir Rahemi`}</title>
        <meta name="description" content={shortDesc} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={`${title} — Amir Rahemi`} />
        <meta property="og:description" content={shortDesc} />
        <meta property="og:image" content={p.cover} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
      </Helmet>

      <Navbar />

      {/* subtle background blur like Contact */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute top-96 -left-40 w-[500px] h-[500px] bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-[700px] h-[700px] bg-pink-500/[0.04] rounded-full blur-3xl" />
      </div>

      <main dir={isFa ? "rtl" : "ltr"} className="w-full lg:w-[78%] max-w-7xl mx-auto px-4 md:px-6 pt-24 md:pt-28 pb-12">
        {/* Back */}
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <button
            onClick={() => navigate(isFa ? "/fa#projects" : "/#projects")}
            className="inline-flex items-center gap-2 text-sm md:text-base text-slate-600 dark:text-slate-300 hover:text-black dark:hover:text-white transition-colors group"
          >
            <span className="w-9 h-9 rounded-full bg-black/[0.06] dark:bg-white/[0.08] border border-black/5 dark:border-white/10 flex items-center justify-center group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors">
              <FaArrowLeft className={clsx("text-xs", isFa && "rotate-180")} />
            </span>
            <span className="hidden sm:inline">{lang === "fa" ? "بازگشت به پروژه‌ها" : "Back to projects"}</span>
            <span className="sm:hidden">{lang === "fa" ? "بازگشت" : "Back"}</span>
          </button>

          <span className="text-xs md:text-sm tracking-widest uppercase text-slate-400 dark:text-slate-500">
            {p.year} — {lang === "fa" ? "نمایش جزئیات" : "Case Study"}
          </span>
        </div>

        {/* Hero Header */}
        <div className="text-center mb-8 md:mb-10">
          <h1
            className={clsx(
              "text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight pb-4 px-2 bg-gradient-to-r from-slate-600 via-purple-400 to-pink-400 bg-clip-text text-transparent dark:from-gray-100 dark:via-white dark:to-gray-300",
              isFa ? "font-lalezar" : "font-paytone"
            )}
            dir={lang === "fa" ? "rtl" : "ltr"}
          >
            {title}
          </h1>
          <p
            className={clsx(
              "mt-2 max-w-3xl mx-auto text-sm md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed px-2",
              isFa ? "text-right md:text-center" : "text-center"
            )}
            dir={isFa ? "rtl" : "ltr"}
          >
            {shortDesc}
          </p>
          <div className="h-1.5 w-24 md:w-32 mx-auto bg-gradient-to-r from-slate-655 via-purple-500 to-pink-500 rounded-full mt-6" />
        </div>

        {/* Cover Hero Card — like portfolio style */}
        <div className="relative rounded-2xl md:rounded-3xl overflow-hidden backdrop-blur-xl bg-gradient-to-br from-slate-500/10 to-cyan-500/10 dark:from-slate-800/30 dark:to-slate-700/10 border border-white/10 dark:border-white/5 shadow-2xl mb-8 md:mb-10 group">
          <div className="relative h-[260px] sm:h-[360px] md:h-[480px] lg:h-[520px] overflow-hidden">
            <div className={`absolute inset-0 bg-gradient-to-br ${p.overlayFrom} ${p.overlayTo} z-10 opacity-60`} />
            <img
              src={p.cover}
              alt={`${title} cover`}
              className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-transparent z-10" />
            {/* floating tags on image */}
            <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 z-20 flex flex-wrap gap-2">
              {p.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-full bg-black/40 dark:bg-white/10 backdrop-blur-md border border-white/20 text-[10px] md:text-xs tracking-widest text-white"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Quick meta bar under image */}
          <div className="grid grid-cols-3 divide-x divide-black/5 dark:divide-white/10 bg-white/60 dark:bg-black/20 backdrop-blur">
            <div className="px-4 py-4 md:py-5 text-center">
              <div className="flex items-center justify-center gap-2 text-[10px] md:text-xs tracking-widest uppercase text-slate-500 dark:text-slate-400 mb-1">
                <FaCalendar className="hidden md:block" /> {lang === "fa" ? "سال" : "Year"}
              </div>
              <div className="text-sm md:text-base font-semibold text-black dark:text-white">{p.year}</div>
            </div>
            <div className="px-4 py-4 md:py-5 text-center">
              <div className="flex items-center justify-center gap-2 text-[10px] md:text-xs tracking-widest uppercase text-slate-500 dark:text-slate-400 mb-1">
                <FaUser className="hidden md:block" /> {lang === "fa" ? "نقش" : "Role"}
              </div>
              <div className="text-sm md:text-base font-semibold text-black dark:text-white">{role}</div>
            </div>
            <div className="px-4 py-4 md:py-5 text-center">
              <div className="flex items-center justify-center gap-2 text-[10px] md:text-xs tracking-widest uppercase text-slate-500 dark:text-slate-400 mb-1">
                <FaClock className="hidden md:block" /> {lang === "fa" ? "زمان" : "Timeline"}
              </div>
              <div className="text-sm md:text-base font-semibold text-black dark:text-white">{duration}</div>
            </div>
          </div>
        </div>

        {/* Action links */}
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-10 md:mb-14">
          {p.links.live && (
            <a
              href={p.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3.5 md:py-4 rounded-full bg-gradient-to-r from-slate-655 to-purple-600 text-white font-semibold text-sm md:text-base shadow-lg shadow-purple-500/20 hover:shadow-xl hover:shadow-purple-500/30 hover:scale-[1.02] transition-all"
            >
              {lang === "fa" ? "نمایش زنده" : "Live Demo"} <MdOutlineArrowOutward className="text-lg" />
            </a>
          )}
          {p.links.github && (
            <a
              href={p.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3.5 md:py-4 rounded-full bg-white dark:bg-white/10 border border-black/10 dark:border-white/10 text-black dark:text-white font-semibold text-sm md:text-base backdrop-blur hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
            >
              <FaGithub /> {lang === "fa" ? "کد منبع" : "Source Code"}
            </a>
          )}
          {!p.links.live && !p.links.github && (
            <span className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 text-slate-600 dark:text-slate-400 text-sm">
              {lang === "fa" ? "لینک‌ها به‌زودی" : "Links coming soon"}
            </span>
          )}
        </div>

        {/* Content Grid: overview + side */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_0.9fr] gap-6 md:gap-8 mb-10 md:mb-14">
          {/* Left — Overview */}
          <div dir={isFa ? "rtl" : "ltr"} className="backdrop-blur-xl bg-white/70 dark:bg-slate-800/30 rounded-2xl md:rounded-3xl p-6 md:p-8 border border-black/5 dark:border-white/10 shadow-xl">
            <h2 dir={isFa ? "rtl" : "ltr"} className={clsx("text-xl md:text-2xl font-bold text-black dark:text-white mb-4 flex items-center gap-2", isFa ? "text-right" : "text-left")}>
              <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-slate-655 to-purple-600 flex items-center justify-center text-white text-sm">
                <FaExpand />
              </span>
              {lang === "fa" ? "درباره پروژه" : "Overview"}
            </h2>
            <p
              className={clsx("text-slate-600 dark:text-slate-300 leading-relaxed text-sm md:text-base", isFa ? "text-right" : "text-left")}
              dir={isFa ? "rtl" : "ltr"}
            >
              {longDesc}
            </p>

            <div dir={isFa ? "rtl" : "ltr"} className="mt-6 pt-6 border-t border-black/5 dark:border-white/10">
              <h3 dir={isFa ? "rtl" : "ltr"} className={clsx("text-sm font-semibold tracking-widest uppercase text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-2", isFa ? "text-right" : "text-left")}>
                <FaLayerGroup /> {lang === "fa" ? "تکنولوژی‌ها" : "Tech Stack"}
              </h3>
              <div dir={isFa ? "rtl" : "ltr"} className="flex flex-wrap gap-2">
                {p.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-black/[0.04] dark:bg-white/[0.06] border border-black/5 dark:border-white/10 text-xs md:text-sm font-medium text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Features & details */}
          <div dir={isFa ? "rtl" : "ltr"} className="space-y-6">
            <div className="backdrop-blur-xl bg-gradient-to-br from-slate-655/10 to-purple-500/10 dark:from-slate-655/20 dark:to-purple-500/10 rounded-2xl md:rounded-3xl p-6 md:p-8 border border-black/5 dark:border-white/10 shadow-xl">
              <h3 dir={isFa ? "rtl" : "ltr"} className={clsx("text-lg md:text-xl font-bold text-black dark:text-white mb-4", isFa ? "text-right" : "text-left")}>
                {lang === "fa" ? "ویژگی‌های کلیدی" : "Key Features"}
              </h3>
              <ul dir={isFa ? "rtl" : "ltr"} className="space-y-3">
                {features.map((f, i) => (
                  <li key={i} dir={isFa ? "rtl" : "ltr"} className={clsx("flex gap-3 text-sm md:text-[15px] text-slate-700 dark:text-slate-300", isFa ? "text-right" : "text-left")}>
                    <span className="mt-0.5 w-6 h-6 rounded-full bg-emerald-500/15 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                      <FaCheck className="text-[10px]" />
                    </span>
                    <span dir={isFa ? "rtl" : "ltr"} className="leading-relaxed">{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="backdrop-blur-xl bg-white dark:bg-slate-800/30 rounded-2xl md:rounded-3xl p-6 border border-black/5 dark:border-white/10 shadow-xl">
              <h4 dir={isFa ? "rtl" : "ltr"} className={clsx("text-sm font-semibold tracking-widest uppercase text-slate-500 dark:text-slate-400 mb-3", isFa ? "text-right" : "text-left")}>
                {lang === "fa" ? "جزئیات" : "Project Details"}
              </h4>
              <div dir={isFa ? "rtl" : "ltr"} className="space-y-3 text-sm">
                <div className={clsx("flex justify-between py-2 border-b border-black/5 dark:border-white/5", isFa ? "text-right" : "text-left")}>
                  <span className="text-slate-500">{lang === "fa" ? "وضعیت" : "Status"}</span>
                  <span className="font-medium text-black dark:text-white">{status}</span>
                </div>
                <div className={clsx("flex justify-between py-2 border-b border-black/5 dark:border-white/5", isFa ? "text-right" : "text-left")}>
                  <span className="text-slate-500">{lang === "fa" ? "پلتفرم" : "Platform"}</span>
                  <span className="font-medium text-black dark:text-white">Web</span>
                </div>
                <div className={clsx("flex justify-between py-2", isFa ? "text-right" : "text-left")}>
                  <span className="text-slate-500">{lang === "fa" ? "دسترسی" : "Access"}</span>
                  <span className="font-medium text-black dark:text-white">{lang === "fa" ? "ریسپانسیو" : "Responsive"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Screenshots */}
        <div dir={isFa ? "rtl" : "ltr"} className="mb-10 md:mb-14">
          <div className={clsx("flex items-end justify-between mb-6", isFa ? "text-right" : "text-left")}>
            <h2 dir={isFa ? "rtl" : "ltr"} className={clsx("text-2xl md:text-3xl font-bold text-black dark:text-white flex items-center gap-3", isFa ? "text-right" : "text-left")}>
              <span className="hidden md:inline w-1.5 h-8 bg-gradient-to-b from-slate-655 to-purple-600 rounded-full" />
              {lang === "fa" ? "گالری تصاویر" : "Screenshots"}
            </h2>
            <span className="text-xs tracking-widest uppercase text-slate-400 hidden md:block">
              {p.screenshots.length} {lang === "fa" ? "تصویر" : "shots"}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {p.screenshots.map((src, i) => (
              <div
                key={i}
                className={clsx(
                  "group relative rounded-2xl overflow-hidden bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 shadow-lg",
                  i === 3 ? "md:col-span-2" : ""
                )}
                style={{ animation: `fadeInUp 0.6s ease-out ${i * 0.08}s both` }}
              >
                <div className={clsx("relative overflow-hidden", i === 3 ? "h-[280px] md:h-[420px]" : "h-[240px] md:h-[300px]")}>
                  <img
                    src={src}
                    alt={`${title} screenshot ${i + 1}`}
                    className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700"
                    loading="lazy"
                    onError={(e) => {
                      const t = e.currentTarget;
                      t.src = `https://via.placeholder.com/1200x750/f1f5f9/64748b?text=${encodeURIComponent(title)}+${i + 1}`;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute top-3 left-3 bg-black/50 backdrop-blur text-white text-[11px] tracking-widest px-2.5 py-1 rounded-full border border-white/20">
                    0{i + 1}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* <p dir={isFa ? "rtl" : "ltr"} className="text-center text-xs text-slate-400 mt-4">
            {lang === "fa"
              ? "اگر تصویری در دسترس نبود، از تصویر جایگزین استفاده شده"
              : "Placeholder used where media was not available"}
          </p> */}
        </div>

        {/* Next / Prev */}
        <div dir={isFa ? "rtl" : "ltr"} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {prev ? (
            <Link
              to={`${prefix}/projects/${prev.slug}`}
              className="group flex items-center gap-4 p-4 md:p-5 rounded-2xl bg-white dark:bg-slate-800/30 border border-black/5 dark:border-white/10 hover:border-purple-500/30 dark:hover:border-purple-500/30 hover:shadow-xl transition-all"
            >
              <span className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors">
                <FaArrowLeft className="text-sm" />
              </span>
              <div className={clsx("flex-1 min-w-0", isFa ? "text-right" : "text-left")}>
                <div className="text-[11px] tracking-widest uppercase text-slate-400">{lang === "fa" ? "پروژه قبلی" : "Previous"}</div>
                <div className="font-semibold text-black dark:text-white truncate">{prev.title[lang]}</div>
              </div>
              <img src={prev.cover} alt="" className="w-16 h-12 md:w-20 md:h-14 object-cover rounded-xl shrink-0" />
            </Link>
          ) : (
            <div className="hidden md:block" />
          )}
          {next ? (
            <Link
              to={`${prefix}/projects/${next.slug}`}
              className="group flex items-center gap-4 p-4 md:p-5 rounded-2xl bg-white dark:bg-slate-800/30 border border-black/5 dark:border-white/10 hover:border-purple-500/30 hover:shadow-xl transition-all flex-row-reverse md:flex-row"
            >
              <img src={next.cover} alt="" className="w-16 h-12 md:w-20 md:h-14 object-cover rounded-xl shrink-0" />
              <div className={clsx("flex-1 min-w-0", isFa ? "text-right" : "text-left")}>
                <div className="text-[11px] tracking-widest uppercase text-slate-400">{lang === "fa" ? "پروژه بعدی" : "Next"}</div>
                <div className="font-semibold text-black dark:text-white truncate">{next.title[lang]}</div>
              </div>
              <span className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors">
                <FaArrowRight className="text-sm" />
              </span>
            </Link>
          ) : null}
        </div>

        {/* Bottom back */}
        <div className="text-center mt-10 md:mt-12">
          <Link
            to={isFa ? "/fa" : "/"}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-black/10 dark:border-white/10 text-sm text-slate-700 dark:text-slate-300 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
          >
            <FaArrowLeft className={clsx("text-xs", isFa && "rotate-180")} />
            {lang === "fa" ? "بازگشت به خانه" : "Back to home"}
          </Link>
        </div>
      </main>

      <Footer />

      <style>{`
        @keyframes fadeInUp {
          from { opacity:0; transform: translateY(20px); }
          to { opacity:1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
