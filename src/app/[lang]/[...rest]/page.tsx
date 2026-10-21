import type { Metadata } from "next";
import { notFound } from "next/navigation";

// The 404 title has to be set here too: the page that throws notFound() decides the title the
// browser shows once the page has loaded (otherwise the tab flips back to the home title).
export const metadata: Metadata = {
  title: "404",
  robots: { index: false, follow: false },
};

// Any URL that no other route matches ends up here and shows the 404 page (with a 404 status).
export default function CatchAll() {
  notFound();
}
