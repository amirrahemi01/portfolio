"use client";

import React, { createContext, useContext, useMemo } from "react";
import type { Dictionary, Lang } from "./dictionaries";

type Vars = Record<string, string | number>;
export type TFunction = (key: string, vars?: Vars) => string;

const LangContext = createContext<{ lang: Lang; dict: Dictionary } | null>(null);

/** Puts the current language and its dictionary in context. Rendered once, in the root layout. */
export function LangProvider({ lang, dict, children }: { lang: Lang; dict: Dictionary; children: React.ReactNode }) {
  const value = useMemo(() => ({ lang, dict }), [lang, dict]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

function lookup(dict: unknown, key: string): string | undefined {
  let node: unknown = dict;
  for (const part of key.split(".")) {
    if (node && typeof node === "object" && part in (node as Record<string, unknown>)) {
      node = (node as Record<string, unknown>)[part];
    } else {
      return undefined;
    }
  }
  return typeof node === "string" ? node : undefined;
}

/**
 * Same shape the components already used: both `const [t, i18n] = useTranslation()` and
 * `const { t } = useTranslation()` work. `t("a.b", { n: 3 })` fills {{n}}.
 */
export function useTranslation(_namespace?: string) {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useTranslation must be used inside <LangProvider>");
  const { lang, dict } = ctx;

  const t: TFunction = (key, vars) => {
    const raw = lookup(dict, key) ?? key;
    return vars ? raw.replace(/\{\{(\w+)\}\}/g, (_, name) => String(vars[name] ?? "")) : raw;
  };
  const i18n = { language: lang };

  return Object.assign([t, i18n] as [TFunction, { language: Lang }], { t, i18n });
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside <LangProvider>");
  return { lang: ctx.lang, isFa: ctx.lang === "fa", prefix: ctx.lang === "fa" ? "/fa" : "" };
}
