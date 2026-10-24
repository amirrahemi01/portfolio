import type { Metadata } from "next";
import CvPage from "@/components/CvPage";
import { SITE_URL, getDictionary, isLang, prefixFor, type Lang } from "@/i18n/dictionaries";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang: raw } = await params;
  const lang: Lang = isLang(raw) ? raw : "en";
  const dict = getDictionary(lang);
  return {
    title: dict.cvPage.title, // the layout adds "— Amir Rahemi"
    description: dict.seo.description,
    alternates: { canonical: `${SITE_URL}${prefixFor(lang)}/cv` },
    // The page is only a viewer for the PDF; the home page is the one to find in search.
    robots: { index: false, follow: true },
  };
}

export default function Page() {
  return <CvPage />;
}
