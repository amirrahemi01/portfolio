// The CV content, in one place. Both the /cv page and the PDF (`npm run cv`) are built from this file.
// Keep it plain TypeScript with no imports: the PDF script reads it with Node directly.

export const cv = {
  name: "Amir Rahemi",
  role: "Full-Stack Developer",
  email: "amirrahemi01@gmail.com",
  website: "amirrahemi.com",
  websiteUrl: "https://www.amirrahemi.com",
  location: "Rasht, Gilan, Iran",
  // Shown in the PDF only
  personal: ["DoB: 2005-09-23", "Marital Status: Single", "Military Service: Educational Exemption"],
  summary:
    "Hi, I’m Amir, a full-stack developer with 4 years of experience and a Computer Engineering student. I build web apps with React and Next.js, back ends with Node.js, Express.js, Go, MongoDB and PostgreSQL, and mobile apps with Flutter. I enjoy turning ideas into clean, fast and user-friendly products, in English and Persian, and I keep growing through real projects and my own work.",
  education: {
    title: "Diploma in MATHEMATICS DIPLOMA",
    branch: "Branch: HIGH SCHOOL",
    place: "Rasht, Gilan, Iran",
    years: "2019 - 2023",
  },
  projects: [
    {
      title: "Zinder",
      description: "A marketplace website that connects car owners with local automotive service providers. I was the frontend developer: pages, user dashboard and sign-in flow.",
      tech: "Next.js, TypeScript, Tailwind CSS",
      link: "zinder-web-test.vercel.app",
      url: "https://zinder-web-test.vercel.app/",
    },
    {
      title: "Belami — E-Commerce Website",
      description: "A Persian online store with a blog and a full admin panel for products, stock, orders, users and analytics. I was responsible for both the front end and the back end.",
      tech: "React, Express.js, MongoDB, Redux",
      link: "belami.ir",
      url: "https://belami.ir",
    },
    {
      title: "Draw — Exchange Rates Platform",
      description: "A public exchange-rate website (Arabic, English, Kurdish) and an admin dashboard to manage prices. I built both sides.",
      tech: "Astro, Next.js, TypeScript, Zustand",
      link: "draw.amirrahemi.com",
      url: "https://draw.amirrahemi.com/",
    },
    {
      title: "Sportorthopädie Berlin — Clinic Website",
      description: "A redesigned German and English website for an orthopaedic clinic in Berlin, with treatment pages and an appointment form.",
      tech: "Astro, TypeScript, Tailwind CSS",
      link: "dr.amirrahemi.com",
      url: "https://dr.amirrahemi.com/",
    },
    {
      title: "Real Estate Website",
      description: "A real-estate website in English and Persian with search, filters, listing pages and saved favorites.",
      tech: "Next.js, TypeScript, Tailwind CSS",
      link: "realestate.amirrahemi.com",
      url: "https://realestate.amirrahemi.com/en",
    },
  ],
  skills: [
    "HTML & CSS", "Tailwind CSS", "JavaScript", "TypeScript", "React.JS", "Next.JS", "Astro", "Flutter & Dart",
    "Node.JS", "Express.JS", "Go", "REST API", "Redux & Zustand", "MongoDB", "PostgreSQL", "Git & GitHub", "Docker",
  ],
  language: { name: "English", level: "Upper Intermediate" },
  social: [
    { label: "amirrahemi", site: "LinkedIn", url: "https://linkedin.com/in/amirrahemi" },
    { label: "amirrahemi01", site: "GitHub", url: "https://github.com/amirrahemi01" },
  ],
};

// The Persian version, shown on /fa/cv. The PDF stays English-only and does not use this.
// Same shape as `cv`: links, tech names and skill names are not translated.
export const cvFa = {
  ...cv,
  name: "امیر راحمی",
  role: "توسعه‌دهنده فول‌استک",
  location: "ایران، گیلان، رشت",
  summary:
    "سلام، من امیرم، توسعه‌دهنده فول‌استک با ۴ سال تجربه و دانشجوی مهندسی کامپیوتر. وب‌اپ‌ها را با React و Next.js می‌سازم، بک‌اند را با Node.js، Express.js، Go، MongoDB و PostgreSQL و اپلیکیشن‌های موبایل را با Flutter. دوست دارم ایده‌ها را به محصولاتی تمیز، سریع و کاربرپسند به زبان فارسی و انگلیسی تبدیل کنم و با پروژه‌های واقعی و کارهای شخصی‌ام همچنان یاد می‌گیرم.",
  education: {
    title: "دیپلم ریاضی فیزیک",
    branch: "مقطع: متوسطه دوم",
    place: "ایران، گیلان، رشت",
    years: "۱۳۹۸ - ۱۴۰۲",
  },
  projects: [
    {
      ...cv.projects[0],
      title: "Zinder",
      description: "یک وب‌سایت بازارگاه که صاحبان خودرو را به ارائه‌دهندگان خدمات خودرویی محلی وصل می‌کند. من توسعه‌دهنده فرانت‌اند بودم: صفحه‌ها، داشبورد کاربر و روند ورود.",
    },
    {
      ...cv.projects[1],
      title: "Belami — فروشگاه اینترنتی",
      description: "یک فروشگاه اینترنتی فارسی با بلاگ و پنل مدیریت کامل برای محصولات، موجودی، سفارش‌ها، کاربران و آمار. مسئول هم فرانت‌اند و هم بک‌اند بودم.",
    },
    {
      ...cv.projects[2],
      title: "Draw — پلتفرم نرخ ارز",
      description: "یک وب‌سایت عمومی نرخ ارز (عربی، انگلیسی، کردی) و یک داشبورد مدیریت برای کنترل قیمت‌ها. هر دو بخش را من ساختم.",
    },
    {
      ...cv.projects[3],
      title: "Sportorthopädie Berlin — وب‌سایت کلینیک",
      description: "بازطراحی وب‌سایت یک کلینیک ارتوپدی در برلین به دو زبان آلمانی و انگلیسی، با صفحه‌های درمان و فرم درخواست نوبت.",
    },
    {
      ...cv.projects[4],
      title: "وب‌سایت املاک",
      description: "یک وب‌سایت املاک به دو زبان انگلیسی و فارسی با جستجو، فیلتر، صفحه آگهی و ذخیره علاقه‌مندی‌ها.",
    },
  ],
  language: { name: "انگلیسی", level: "متوسط رو به بالا" },
};
