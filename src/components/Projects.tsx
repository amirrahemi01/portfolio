// Path: src/components/Projects.tsx
import React from 'react'

import IMG_RENT from "../assets/image/projects/rent.jpg";
import IMG_ECOMMERCE from "../assets/image/projects/ecommerce.png";
import IMG_FOOD from "../assets/image/projects/food.jpg";

import { useTranslation } from 'react-i18next';

type Props = {}


function Projects({ }: Props) {
  const [t, i18n] = useTranslation("global");

  return (
    <div className="w-full py-20" id="projects">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-6xl md:text-7xl font-bold mb-4 text-center pb-8" style={{
          background: 'linear-gradient(to right, rgb(96, 165, 250), rgb(192, 132, 252), rgb(244, 114, 182))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          {t("content.projects")}
        </h1>
        <div className="h-1.5 w-32 mx-auto bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full mb-16"></div>


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="group relative rounded-3xl overflow-hidden backdrop-blur-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-white/10 shadow-2xl hover:scale-105 hover:shadow-purple-500/30 transition-all duration-500 flex flex-col" style={{animation: 'fadeInUp 0.6s ease-out 0s both'}}>
            
            <div className="relative h-64 overflow-hidden flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 z-10"></div>
              <img src={IMG_ECOMMERCE} alt="" className="w-full h-full object-cover group-hover:scale-110 group-hover:brightness-110 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent z-10"></div>
            </div>

            <div className="relative p-8 flex flex-col flex-grow">
              <div className="flex-grow">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
                  {t("content.e-commerce")}
                </h2>
                <p className="text-slate-300 text-base leading-relaxed mb-6">{t("content.shopping")}</p>
              </div>

              <div className="flex flex-wrap gap-2 mt-auto">
                <p className="px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm text-slate-300 hover:bg-white/10 hover:border-white/20 transition-all duration-300">#react.js</p>
                <p className="px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm text-slate-300 hover:bg-white/10 hover:border-white/20 transition-all duration-300">#mongodb</p>
              </div>

              <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none"></div>
            </div>

            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-white/5 via-transparent to-transparent"></div>
            <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">1</div>
          </div>

          <div className="group relative rounded-3xl overflow-hidden backdrop-blur-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-white/10 shadow-2xl hover:scale-105 hover:shadow-blue-500/30 transition-all duration-500 flex flex-col" style={{animation: 'fadeInUp 0.6s ease-out 0.1s both'}}>
            
            <div className="relative h-64 overflow-hidden flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 z-10"></div>
              <img src={IMG_RENT} alt="" className="w-full h-full object-cover group-hover:scale-110 group-hover:brightness-110 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent z-10"></div>
            </div>

            <div className="relative p-8 flex flex-col flex-grow">
              <div className="flex-grow">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-cyan-400 transition-all duration-300">
                  {t("content.rent car")}
                </h2>
                <p className="text-slate-300 text-base leading-relaxed mb-6">{t("content.rent")}</p>
              </div>

              <div className="flex flex-wrap gap-2 mt-auto">
                <p className="px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm text-slate-300 hover:bg-white/10 hover:border-white/20 transition-all duration-300">#react.js</p>
                <p className="px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm text-slate-300 hover:bg-white/10 hover:border-white/20 transition-all duration-300">#mongodb</p>
              </div>

              <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none"></div>
            </div>

            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-white/5 via-transparent to-transparent"></div>
            <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">2</div>
          </div>

          <div className="group relative rounded-3xl overflow-hidden backdrop-blur-xl bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-white/10 shadow-2xl hover:scale-105 hover:shadow-orange-500/30 transition-all duration-500 flex flex-col" style={{animation: 'fadeInUp 0.6s ease-out 0.2s both'}}>
            
            <div className="relative h-64 overflow-hidden flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-red-500/20 z-10"></div>
              <img src={IMG_FOOD} alt="" className="w-full h-full object-cover group-hover:scale-110 group-hover:brightness-110 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent z-10"></div>
            </div>

            <div className="relative p-8 flex flex-col flex-grow">
              <div className="flex-grow">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:to-red-400 transition-all duration-300">
                  {t("content.food delivery")}
                </h2>            
                <p className="text-slate-300 text-base leading-relaxed mb-6">{t("content.shopping")}</p>
              </div>

              <div className="flex flex-wrap gap-2 mt-auto">
                <p className="px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm text-slate-300 hover:bg-white/10 hover:border-white/20 transition-all duration-300">#react.js</p>
                <p className="px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm text-slate-300 hover:bg-white/10 hover:border-white/20 transition-all duration-300">#mongodb</p>
              </div>

              <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-gradient-to-r from-orange-500 to-red-500 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none"></div>
            </div>

            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-white/5 via-transparent to-transparent"></div>
            <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">3</div>
          </div>
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