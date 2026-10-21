"use client";

// Path: src/components/Projects.tsx
import React, { useState } from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { useLang, useTranslation } from '@/i18n';
import { BsFillGridFill } from 'react-icons/bs';
import { FaList } from 'react-icons/fa';
import { MdOutlineArrowOutward } from 'react-icons/md';
import { projectsData } from '@/data/projects';

function Projects() {
  const { t, i18n } = useTranslation("global");
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const { prefix } = useLang();

  const projects = projectsData.map((p) => ({
    id: p.id,
    slug: p.slug,
    image: p.logo ?? p.cover,
    isLogo: !!p.logo,
    title: p.title[i18n.language as 'en' | 'fa' || 'en'] || p.title.en,
    description: p.shortDescription[i18n.language as 'en' | 'fa' || 'en'] || p.shortDescription.en,
    tags: p.tags.slice(0, 2),
    hoverShadow: "dark:hover:shadow-blue-200/25 dark:hover:border-blue-200/40",
    hoverColor: "group-hover:text-blue-300 dark:group-hover:text-blue-200",
  }));

  const isFa = (i18n.language || 'en') as 'en' | 'fa';

  return (
    <div className="w-full px-4 py-10 sm:px-6 md:px-12 md:py-20" id="projects">
      <div className="max-w-7xl mx-auto">
        <h2
          className="type-title mb-3 text-center pb-2 md:mb-4 md:pb-8 px-4"
        >
          {t('content.projects')}
        </h2>



        <div className="h-1.5 w-24 md:w-32 mx-auto bg-blue-200 rounded-full mb-6 md:mb-12"></div>

        {/* View toggle — only on large screens, where grid vs. list actually differ */}
        <div className="hidden lg:flex justify-end mb-8">
          <div
            role="group"
            aria-label={t("content.viewMode")}
            className="inline-flex items-center gap-1 rounded-full border border-black/10 dark:border-white/15 p-1"
          >
            {(['list', 'grid'] as const).map((mode) => {
              const active = viewMode === mode;
              const Icon = mode === 'grid' ? BsFillGridFill : FaList;
              return (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setViewMode(mode)}
                  aria-pressed={active}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm transition-colors ${
                    active
                      ? 'bg-black text-white dark:bg-white dark:text-black'
                      : 'text-black/65 hover:text-black dark:text-white/65 dark:hover:text-white'
                  }`}
                >
                  <Icon className="text-xs" aria-hidden="true" />
                  <span className="optical-y-en">{t(`content.${mode}`)}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className={
          "grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 " +
          (viewMode === 'list' ? 'lg:grid-cols-1' : 'lg:grid-cols-2')
        }>
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`${prefix}/projects/${project.slug}`}
              className={`group relative rounded-2xl md:rounded-3xl overflow-hidden backdrop-blur-xl bg-slate-500/10 border border-white/10 shadow-2xl hover:scale-[1.02] ${project.hoverShadow} transition-all duration-500 flex flex-col ${viewMode === 'list' ? 'lg:flex-row' : ''} cursor-pointer`}
            >

              <div className={`relative overflow-hidden flex-shrink-0 h-48 md:h-64 m-3 mb-0 md:m-4 md:mb-0 rounded-xl md:rounded-2xl ${viewMode === 'list' ? 'lg:w-80 lg:mb-4 lg:me-0' : ''}`}>
                {project.isLogo ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-white p-4">
                    <div className="relative aspect-square h-full overflow-hidden rounded-2xl">
                      <Image
                        src={project.image}
                        alt={`${project.title} logo`}
                        fill
                        sizes="256px"
                        className="object-cover"
                      />
                    </div>
                  </div>
                ) : (
                  <Image
                    src={project.image}
                    alt={`${project.title} project screenshot`}
                    fill
                    sizes="(min-width: 1024px) 320px, (min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                )}
                <span className="absolute top-4 left-4 z-20 px-3 py-1.5 rounded-full bg-white/90 dark:bg-black/60 backdrop-blur text-[11px] tracking-widest text-black dark:text-white border border-black/10 dark:border-white/10 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  {isFa === 'fa' ? 'مشاهده' : 'View'} <MdOutlineArrowOutward className="text-xs" />
                </span>
              </div>

              <div className={`relative p-5 md:p-8 flex flex-col flex-grow ${viewMode === 'list' ? 'lg:justify-center' : ''}`}>
                <div className="flex-grow">
                  <h3 className={`type-heading mb-3 text-left rtl:text-right ${project.hoverColor} transition-colors duration-300`}>
                    {project.title}
                  </h3>
                  <p dir="auto" className="type-body mb-4 md:mb-6 text-left rtl:text-right">{project.description}</p>
                </div>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.map((tag, index) => (
                    <p key={index} className="type-pill">
                      <span className="optical-y">{tag}</span>
                    </p>
                  ))}
                </div>

              </div>

            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Projects