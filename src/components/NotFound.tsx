"use client";

import Link from "next/link";
import { useLang, useTranslation } from "@/i18n";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { BTN_PRIMARY, BTN_SECONDARY } from "./buttonStyles";

/** The 404 page, in the visitor's language (English at "/", Persian under "/fa"). */
export default function NotFound() {
  const [t] = useTranslation();
  const { prefix } = useLang();

  return (
    <div className="flex min-h-screen flex-col bg-white font-medium dark:bg-black">
      <Navbar />
      <main id="main" className="flex flex-1 flex-col items-center justify-center px-4 py-28 text-center">
        <p className="type-label">404</p>
        <h1 className="type-title mt-3">{t("notFound.title")}</h1>
        <p className="type-body mt-4 max-w-md">{t("notFound.text")}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href={prefix || "/"} className={BTN_PRIMARY}>
            <span className="optical-y-en">{t("notFound.home")}</span>
          </Link>
          <Link href={`${prefix}/#projects`} className={BTN_SECONDARY}>
            <span className="optical-y-en">{t("notFound.projects")}</span>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
