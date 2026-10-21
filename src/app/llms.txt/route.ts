import { projectsData } from "@/data/projects";
import { cv } from "@/data/cv";
import { siteContent } from "@/data/site";
import { SITE_URL } from "@/i18n/dictionaries";

// /llms.txt: a plain Markdown summary of the site for AI assistants and crawlers (https://llmstxt.org).
// Built from the same data as the pages, so it stays up to date when projects or the CV change.
export const dynamic = "force-static";

export function GET() {
  const projects = projectsData
    .map((p) => {
      const live = p.links.live ? ` Live: ${p.links.live}.` : "";
      return `- [${p.title.en}](${SITE_URL}/projects/${p.slug}): ${p.shortDescription.en}${live} Role: ${p.role.en}. Tech: ${p.techStack.join(", ")}.`;
    })
    .join("\n");

  const body = `# ${cv.name}

> ${cv.name} is a ${cv.role.toLowerCase()} based in ${cv.location}, with ${siteContent.stats.years.replace("+", "")}+ years of experience. He builds web apps with React and Next.js, back ends with Node.js, Express.js, Go, MongoDB and PostgreSQL, and mobile apps with Flutter. The portfolio is available in English and Persian (right-to-left).

## Pages

- [Home (English)](${SITE_URL}/): introduction, skills, projects and contact
- [Home (Persian)](${SITE_URL}/fa): the same page in Persian
- [CV](${SITE_URL}/cv): written CV, with a PDF export (${SITE_URL}${siteContent.cvPath})

## Projects

${projects}

## Skills

${cv.skills.join(", ")}.

## Contact

- Email: ${cv.email}
- Telegram: ${siteContent.telegram}
- GitHub: ${cv.social.find((s) => s.site === "GitHub")?.url}
- LinkedIn: ${cv.social.find((s) => s.site === "LinkedIn")?.url}
`;

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
