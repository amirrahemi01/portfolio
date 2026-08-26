// Path: src/components/Projects.tsx
import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import { BsFillGridFill } from 'react-icons/bs';
import { FaList } from 'react-icons/fa';
import { MdOutlineArrowOutward } from 'react-icons/md';
import clsx from 'clsx';
import { projectsData } from '../data/projects';

function Projects() {
  const { t, i18n } = useTranslation("global");
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const navigate = useNavigate();
  const location = useLocation();
  const isFaNav = location.pathname.startsWith('/fa');

  const projects = projectsData.map((p, idx) => ({
    id: p.id,
    slug: p.slug,
    image: p.cover,
    title: p.title[i18n.language as 'en' | 'fa' || 'en'] || p.title.en,
    description: p.shortDescription[i18n.language as 'en' | 'fa' || 'en'] || p.shortDescription.en,
    tags: p.tags.slice(0, 2),
    gradientFrom: p.gradientFrom,
    gradientTo: p.gradientTo,
    overlayFrom: p.overlayFrom,
    overlayTo: p.overlayTo,
    badgeGradient: "from-slate-500 to-cyan-500",
    hoverShadow: "hover:shadow-slate-500/30",
    hoverGlow: "from-slate-500 to-cyan-500",
    hoverTextFrom: "group-hover:from-slate-400",
    hoverTextTo: "group-hover:to-cyan-400",
    hoverColor: "group-hover:text-slate-400",
    delay: `${0.1 + idx * 0.08}s`,
  }));

  const isFa = (i18n.language || 'en') as 'en' | 'fa';

  return (
    <div className="w-full md:py-20 p-12" id="projects">
      <div className="max-w-7xl mx-auto">
        <h2
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 text-center pb-4 md:pb-8 px-4 
          bg-gradient-to-r from-slate-600 via-purple-400 to-pink-400 bg-clip-text text-transparent 
        dark:from-gray-100 dark:via-white dark:to-gray-300
          [text-shadow:_0_2px_10px_rgba(0,0,0,0.4)]"
        >
          {t('content.projects')}
        </h2>



        <div className="h-1.5 w-24 md:w-32 mx-auto bg-gradient-to-r from-slate-655 via-purple-500 to-pink-500 rounded-full mb-8 md:mb-12"></div>

        {/* View Toggle - Only visible on large screens */}
        <div className="hidden lg:flex justify-end mb-8">
          <div className="inline-flex rounded-xl bg-white/10 dark:bg-slate-800/30 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-2 rounded-lg text-sm md:text-base font-medium transition-all duration-300 ${viewMode === 'grid'
                ? 'bg-gradient-to-r from-slate-655 to-purple-600 text-white shadow-lg'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
            >
              <BsFillGridFill className="inline mr-2" />
              {/* {t("content.grid")} */}
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-lg text-sm md:text-base font-medium transition-all duration-300 ${viewMode === 'list'
                ? 'bg-gradient-to-r from-slate-655 to-purple-600 text-white shadow-lg'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
            >
              <FaList className="inline mr-2" />
              {/* {t("content.list")} */}
            </button>
          </div>
        </div>

        <div className={
          "grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-8 " +
          (viewMode === 'list' ? 'lg:grid-cols-1' : 'lg:grid-cols-2')
        }>
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={() => navigate(`${isFaNav ? '/fa' : ''}/projects/${project.slug}`)}
              role="link"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter') navigate(`${isFaNav ? '/fa' : ''}/projects/${project.slug}`);
              }}
              className={`group relative rounded-2xl md:rounded-3xl overflow-hidden backdrop-blur-xl bg-gradient-to-br ${project.gradientFrom} ${project.gradientTo} border border-white/10 shadow-2xl hover:scale-[1.02] ${project.hoverShadow} transition-all duration-500 flex flex-col ${viewMode === 'list' ? 'lg:flex-row' : ''} cursor-pointer`}
              style={{ animation: `fadeInUp 0.6s ease-out ${project.delay} both` }}
            >

              <div className={`relative overflow-hidden flex-shrink-0 h-48 md:h-64 ${viewMode === 'list' ? 'lg:w-80' : ''}`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${project.overlayFrom} ${project.overlayTo} z-10`}></div>
                <img
                  src={project.image}
                  alt={`${project.title} project screenshot`}
                  className="w-full h-full object-cover group-hover:scale-110 group-hover:brightness-110 transition-all duration-700"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent z-10"></div>
                <span className="absolute top-4 left-4 z-20 px-3 py-1.5 rounded-full bg-white/90 dark:bg-black/60 backdrop-blur text-[11px] tracking-widest text-black dark:text-white border border-black/10 dark:border-white/10 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  {isFa === 'fa' ? 'مشاهده' : 'View'} <MdOutlineArrowOutward className="text-xs" />
                </span>
              </div>

              <div className={`relative p-6 md:p-8 flex flex-col flex-grow ${viewMode === 'list' ? 'lg:justify-center' : ''}`}>
                <div className="flex-grow">
                  <h3 className={clsx(`text-2xl sm:text-3xl md:text-4xl font-bold text-black dark:text-white mb-3 md:mb-4 ${project.hoverColor} group-hover:bg-clip-text group-hover:bg-gradient-to-r ${project.hoverTextFrom} ${project.hoverTextTo} transition-all duration-300`, isFa === "fa" ? "text-right" : "text-left")}>
                    {project.title}
                  </h3>
                  <p dir="auto" className={clsx("text-black dark:text-slate-300 text-sm md:text-base leading-relaxed mb-4 md:mb-6", isFa === "fa" ? "text-right" : "text-left")}>{project.description}</p>
                </div>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.map((tag, index) => (
                    <p key={index} className="px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-black/5 dark:bg-white/5 backdrop-blur-sm border border-black/10 dark:border-white/10 text-xs md:text-sm text-gray-100 dark:text-slate-300 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                      {tag}
                    </p>
                  ))}
                  <span className="ml-auto hidden sm:inline-flex items-center gap-1 text-xs tracking-widest uppercase text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-white transition-colors self-center">
                    {isFa === 'fa' ? 'جزئیات' : 'Details'} <MdOutlineArrowOutward />
                  </span>
                </div>

                <div className={`absolute -bottom-32 -right-32 w-64 h-64 bg-gradient-to-r ${project.hoverGlow} rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none`}></div>
              </div>

              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-white/5 via-transparent to-transparent"></div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  )
}

export default Projects