import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Next 16 writes an AGENTS.md (instructions for AI coding tools) into the repo on `next dev`.
  // Not wanted here, so it is switched off.
  agentRules: false,

  // The EmailJS keys used to be called REACT_APP_EMAILJS_* (Create React App). Read either name,
  // so the values already set in Vercel keep working. They are public by design (browser-side).
  env: {
    NEXT_PUBLIC_EMAILJS_SERVICE_ID:
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? process.env.REACT_APP_EMAILJS_SERVICE_ID ?? "",
    NEXT_PUBLIC_EMAILJS_TEMPLATE_ID:
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? process.env.REACT_APP_EMAILJS_TEMPLATE_ID ?? "",
    NEXT_PUBLIC_EMAILJS_PUBLIC_KEY:
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? process.env.REACT_APP_EMAILJS_PUBLIC_KEY ?? "",
  },

  async redirects() {
    return [
      // Old singular project URLs that may already be shared or indexed
      { source: "/project/:slug", destination: "/projects/:slug", permanent: true },
      { source: "/fa/project/:slug", destination: "/fa/projects/:slug", permanent: true },
    ];
  },

  async headers() {
    const longCache = [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }];
    return [
      { source: "/favicon/:path*", headers: longCache },
      { source: "/(favicon.ico|logo.png|manifest.json)", headers: [{ key: "Cache-Control", value: "public, max-age=86400, must-revalidate" }] },
      { source: "/(robots.txt|sitemap.xml)", headers: [{ key: "Cache-Control", value: "public, max-age=3600, must-revalidate" }] },
      { source: "/og/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=86400, must-revalidate" }] },
      { source: "/email/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=86400, must-revalidate" }] },
    ];
  },
};

export default nextConfig;
