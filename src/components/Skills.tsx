"use client";

import React from 'react';

import Html5Original from 'devicons-react/lib/icons/Html5Original';
import Css3Original from 'devicons-react/lib/icons/Css3Original';
import JavascriptOriginal from 'devicons-react/lib/icons/JavascriptOriginal';
import TypescriptOriginal from 'devicons-react/lib/icons/TypescriptOriginal';
import ReactOriginal from 'devicons-react/lib/icons/ReactOriginal';
import NextjsOriginal from 'devicons-react/lib/icons/NextjsOriginal';
import AstroPlain from 'devicons-react/lib/icons/AstroPlain';
import FlutterOriginal from 'devicons-react/lib/icons/FlutterOriginal';
import DartOriginal from 'devicons-react/lib/icons/DartOriginal';
import NodejsOriginalWordmark from 'devicons-react/lib/icons/NodejsOriginalWordmark';
import ExpressOriginal from 'devicons-react/lib/icons/ExpressOriginal';
import GoOriginal from 'devicons-react/lib/icons/GoOriginal';
import TailwindcssPlainWordmark from 'devicons-react/lib/icons/TailwindcssPlainWordmark';
import GitOriginal from 'devicons-react/lib/icons/GitOriginal';
import ReduxOriginal from 'devicons-react/lib/icons/ReduxOriginal';
import ZustandOriginal from 'devicons-react/lib/icons/ZustandOriginal';
import MongodbOriginal from 'devicons-react/lib/icons/MongodbOriginal';
import PostgresqlOriginal from 'devicons-react/lib/icons/PostgresqlOriginal';
import GithubOriginal from 'devicons-react/lib/icons/GithubOriginal';
import DockerOriginalWordmark from 'devicons-react/lib/icons/DockerOriginalWordmark';

import { useTranslation } from '@/i18n';
import DragScroll from './DragScroll';

function Skills() {
  const [t] = useTranslation("global");

  return (
    <div id="skills">
      <div className="flex flex-col mt-8">
        <h2 className="type-heading px-4 text-left rtl:text-right">{t("content.my skills")}</h2>
        {/* <p dir="auto" className={clsx("dark:text-slate-300 text-slate-800 text-sm large:text-base px-4 text-left", isFa === "fa" ? "text-right" : "text-left")}>{t("content.skills")}</p> */}

        <DragScroll className="w-full overflow-x-auto overflow-y-hidden md:flex">
          <div className="flex flex-row text-7xl skills mt-4 py-3 w-fit select-none">
            <Html5Original className="text-white dark:text-black" />
            <Css3Original className="text-white dark:text-black" />
            <JavascriptOriginal className="text-white dark:text-black" />
            <TypescriptOriginal className="text-white dark:text-black" />
            <ReactOriginal className="text-white dark:text-black" />
            <NextjsOriginal className="text-white dark:text-black" />
            <AstroPlain className="[&_*]:fill-black dark:[&_*]:fill-white" />
            <FlutterOriginal className="text-white dark:text-black" />
            <DartOriginal className="text-white dark:text-black" />
            <NodejsOriginalWordmark className="text-white dark:text-black" />
            <ExpressOriginal className="[&_*]:fill-black dark:[&_*]:fill-white" />
            <GoOriginal className="text-white dark:text-black" />
            <TailwindcssPlainWordmark className="text-white dark:text-black" />
            <ReduxOriginal className="text-white dark:text-black" />
            <ZustandOriginal className="text-white dark:text-black" />
            <MongodbOriginal className="text-white dark:text-black" />
            <PostgresqlOriginal className="text-white dark:text-black" />
            <GitOriginal className="text-white dark:text-black" />
            <GithubOriginal className="[&_*]:fill-black dark:[&_*]:fill-white" />
            <DockerOriginalWordmark className="text-white dark:text-black" />
          </div>
        </DragScroll>
      </div>
    </div>
  )
}

export default Skills