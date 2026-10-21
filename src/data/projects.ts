import LOGO_TICKER from "@/assets/image/projects/logo-ticker.webp";
import IMG_TICKER from "@/assets/image/projects/ticker.webp";
import LOGO_TELEGRAM from "@/assets/image/projects/logo-telegram.webp";
import IMG_CLINIC from "@/assets/image/projects/clinic.webp";
import LOGO_CLINIC from "@/assets/image/projects/logo-clinic.webp";
import IMG_AMLAK from "@/assets/image/projects/amlak.webp";
import LOGO_AMLAK from "@/assets/image/projects/logo-amlak.webp";
import LOGO_BELAMI from "@/assets/image/projects/logo-belami.webp";
import LOGO_DRAW from "@/assets/image/projects/logo-draw.webp";
import LOGO_ZINDER from "@/assets/image/projects/logo-zinder.webp";
import IMG_DRAW from "@/assets/image/projects/draw.webp";
import IMG_TELEGRAM from "@/assets/image/projects/telegram-clone.webp";
import IMG_ZINDER from "@/assets/image/projects/zinder.webp";
import IMG_BELAMI from "@/assets/image/projects/belami-dashboard.webp";
import IMG_BELAMI_CATEGORIES from "@/assets/image/projects/belami-categories.webp";
import type { StaticImageData } from "next/image";

export interface ProjectLink {
  label: string;
  url: string;
}

export interface ProjectData {
  id: string;
  slug: string;
  title: { en: string; fa: string };
  shortDescription: { en: string; fa: string };
  longDescription: { en: string; fa: string };
  cover: StaticImageData;
  /** Optional. When set, the card on the home page shows this logo instead of the cover screenshot. */
  logo?: StaticImageData;
  /** Real screenshots. A string is a URL; imported files work too. */
  screenshots: (StaticImageData | string)[];
  tags: string[];
  techStack: string[];
  /** Optional. Only shown on the project page when filled in. */
  features?: { en: string[]; fa: string[] };
  links: {
    live?: string;
    /** Optional. Link used on the Persian version of the portfolio, when the demo has a Persian address. */
    liveFa?: string;
    github?: string;
    figma?: string;
    /** Projects with a separate admin side. */
    adminLive?: string;
    adminGithub?: string;
  };
  year: string;
  role: { en: string; fa: string };
  duration: { en: string; fa: string };
  status: { en: string; fa: string };
  /** Optional. When filled in, the project page shows "the problem / what I built / the result". */
  writeup?: {
    problem: { en: string; fa: string };
    solution: { en: string; fa: string };
    result: { en: string; fa: string };
  };
  /** Optional demo recording: a URL, or a file in /public (e.g. "/demos/ecommerce.mp4"). */
  video?: string;
  /** Pixel size of the video (reserves the right space on the page). Defaults to 16:9. */
  videoSize?: { width: number; height: number };
  /** Optional image shown before the video plays (a file in /public). */
  videoPoster?: string;
}

export const projectsData: ProjectData[] = [
  {
    id: "zinder",
    slug: "zinder",
    title: { en: "Zinder", fa: "Zinder" },
    shortDescription: {
      en: "A service marketplace that connects car owners with local automotive service providers, built with Next.js.",
      fa: "یک وب‌سایت خدماتی که صاحبان خودرو را به ارائه‌دهندگان خدمات خودرویی نزدیک خودشان وصل می‌کند، ساخته‌شده با Next.js.",
    },
    longDescription: {
      en: "Zinder helps car owners find local automotive services such as mechanics, detailers, tire shops and battery services. Visitors can browse categories and listings, filter them, and read the FAQ. Signed-in users get a dashboard with their orders, profile, addresses and notifications, and providers have their own area to manage their services. There is also an admin panel. I worked on the front end with Next.js, building the pages, the user dashboard and the sign-in flow, and connecting everything to the API.",
      fa: "Zinder به صاحبان خودرو کمک می‌کند خدمات خودرویی نزدیک خودشان مثل مکانیکی، کارواش و دیتیلینگ، تایرفروشی و باتری‌سازی را پیدا کنند. بازدیدکننده‌ها می‌توانند دسته‌بندی‌ها و لیست خدمات را ببینند، فیلتر کنند و سؤالات متداول را بخوانند. کاربران واردشده داشبورد شخصی با سفارش‌ها، پروفایل، آدرس‌ها و اعلان‌ها دارند و ارائه‌دهندگان خدمات هم بخش مخصوص خودشان را برای مدیریت خدماتشان دارند. یک پنل ادمین هم وجود دارد. من بخش فرانت‌اند را با Next.js انجام دادم: ساخت صفحه‌ها، داشبورد کاربر و روند ورود، و اتصال همه‌چیز به API.",
    },
    cover: IMG_ZINDER,
    logo: LOGO_ZINDER,
    screenshots: [],
    tags: ["Frontend", "Marketplace"],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
    links: {
      live: "https://zinder-web-test.vercel.app/",
      github: "https://github.com/amirrahemi01/zinder-web-test",
    },
    year: "2026",
    role: { en: "Frontend developer", fa: "توسعه‌دهنده فرانت‌اند" },
    duration: { en: "3 months", fa: "۳ ماه" },
    status: { en: "In progress", fa: "در حال انجام" },
  },
  {
    id: "belami",
    slug: "belami",
    title: { en: "Belami", fa: "Belami" },
    shortDescription: {
      en: "A Persian e-commerce website with a full admin panel, built with React, Express, MongoDB and Redux.",
      fa: "یک فروشگاه اینترنتی فارسی با پنل مدیریت کامل، ساخته‌شده با React، Express، MongoDB و Redux.",
    },
    longDescription: {
      en: "Belami is a Persian online store I built from start to finish. Customers can browse products by category and brand, search, save favorites, use a cart and discount codes, and place orders. Behind it is an admin panel for managing products and stock, orders, users, blog posts, banners, comments and settings, with sales and analytics dashboards. The API is written with Express and MongoDB, sign-in uses JWT with email verification and password reset, and the front end uses React and Redux.",
      fa: "Belami یک فروشگاه اینترنتی فارسی است که از صفر تا صد خودم ساختم. مشتری‌ها می‌توانند محصولات را بر اساس دسته‌بندی و برند ببینند، جستجو کنند، علاقه‌مندی‌ها را ذخیره کنند، از سبد خرید و کد تخفیف استفاده کنند و سفارش ثبت کنند. پشت آن یک پنل مدیریت برای محصولات و موجودی، سفارش‌ها، کاربران، مقالات بلاگ، بنرها، دیدگاه‌ها و تنظیمات وجود دارد، همراه با داشبوردهای فروش و آمار. API با Express و MongoDB نوشته شده، ورود کاربران با JWT همراه با تأیید ایمیل و بازیابی رمز عبور است و بخش کاربری با React و Redux ساخته شده.",
    },
    cover: IMG_BELAMI,
    logo: LOGO_BELAMI,
    screenshots: [IMG_BELAMI, IMG_BELAMI_CATEGORIES],
    tags: ["Full-stack", "E-commerce"],
    techStack: ["React", "Express.js", "MongoDB", "Redux"],
    links: {
      live: "https://belami.ir",
      github: "https://github.com/amirrahemi01/fullstack_nextjs_ecommerce",
    },
    year: "2025",
    role: { en: "Full-stack developer", fa: "توسعه‌دهنده فول‌استک" },
    duration: { en: "1 year", fa: "۱ سال" },
    status: { en: "Completed", fa: "تکمیل‌شده" },
  },
  {
    id: "ticker",
    slug: "ticker",
    title: { en: "Ticker", fa: "Ticker" },
    shortDescription: {
      en: "A Flutter mobile app for real-time cryptocurrency and currency prices, with charts and a light and dark theme.",
      fa: "یک اپلیکیشن موبایل فلاتر برای قیمت لحظه‌ای ارزهای دیجیتال و ارزها، با نمودار و تم روشن و تاریک.",
    },
    longDescription: {
      en: "Ticker is a mobile app I built with Flutter to follow cryptocurrency and currency prices. You pick an asset such as BTC, ETH, USDT, BNB or SOL and see its current price with the daily change, a price chart you can switch between 1 hour, 1 day, 1 week, 1 month, 1 year and all time, and the 24-hour high, low and volume. It shows when the data was last updated and has a light and dark theme. The app is not released in any store yet, so the demo video on this page shows how it works.",
      fa: "Ticker یک اپلیکیشن موبایل است که با فلاتر ساختم تا قیمت ارزهای دیجیتال و ارزها را دنبال کنم. یک دارایی مثل BTC، ETH، USDT، BNB یا SOL را انتخاب می‌کنید و قیمت فعلی همراه با تغییر روزانه، نمودار قیمت با بازه‌های ۱ ساعت، ۱ روز، ۱ هفته، ۱ ماه، ۱ سال و کل دوره، و بیشترین، کمترین و حجم ۲۴ ساعته را می‌بینید. زمان آخرین بروزرسانی نمایش داده می‌شود و تم روشن و تاریک دارد. اپ هنوز در هیچ فروشگاهی منتشر نشده، به همین دلیل ویدیوی دمو در این صفحه طرز کارش را نشان می‌دهد.",
    },
    cover: IMG_TICKER,
    logo: LOGO_TICKER,
    screenshots: [],
    video: "/demos/crypto-app.mp4",
    videoPoster: "/demos/crypto-app-poster.webp",
    videoSize: { width: 468, height: 990 },
    tags: ["Mobile", "Flutter"],
    techStack: ["Flutter", "Dart"],
    links: {},
    year: "2026",
    role: { en: "Mobile developer", fa: "توسعه‌دهنده موبایل" },
    duration: { en: "Personal project", fa: "پروژه شخصی" },
    status: { en: "Not released yet", fa: "هنوز منتشر نشده" },
  },
  {
    id: "draw",
    slug: "draw",
    title: { en: "Draw", fa: "Draw" },
    shortDescription: {
      en: "An exchange-rate platform with two sides: a public rates website and an admin dashboard to manage the prices.",
      fa: "یک پلتفرم نرخ ارز و طلا با دو بخش: وب‌سایت عمومی نرخ‌ها و داشبورد مدیریت برای کنترل قیمت‌ها.",
    },
    longDescription: {
      en: "Draw is an exchange-rate platform with two sides that I built as a full-stack developer. The client site shows live-style currency rates, gold and metal prices, a currency converter and a price chart, in Arabic, English and Kurdish with right-to-left support and light and dark themes. The admin dashboard is where the team manages the data: partners, the pricing policy, published prices, currencies and metals, plus analytics and an audit log. The links on this page open static demos with sample data, so you can click through both sides without a backend.",
      fa: "Draw یک پلتفرم نرخ ارز با دو بخش است که به‌عنوان توسعه‌دهنده فول‌استک ساختم. سایت کاربری نرخ ارز، قیمت طلا و فلزات، مبدل ارز و نمودار قیمت را به زبان‌های عربی، انگلیسی و کردی با پشتیبانی راست‌به‌چپ و تم روشن و تاریک نشان می‌دهد. داشبورد مدیریت جایی است که تیم داده‌ها را مدیریت می‌کند: شرکا، سیاست قیمت‌گذاری، قیمت‌های منتشرشده، ارزها و فلزات، به‌همراه آمار و گزارش تغییرات. لینک‌های این صفحه به نسخه‌های دموی استاتیک با داده نمونه باز می‌شوند تا بدون بک‌اند در هر دو بخش گشت بزنید.",
    },
    cover: IMG_DRAW,
    logo: LOGO_DRAW,
    screenshots: [],
    tags: ["Full-stack", "Dashboard"],
    techStack: ["Astro", "Next.js", "React", "TypeScript", "Tailwind CSS", "Zustand"],
    links: {
      live: "https://draw.amirrahemi.com/",
      github: "https://github.com/amirrahemi01/draw-frontend",
      adminLive: "https://admin-draw.amirrahemi.com/login",
      adminGithub: "https://github.com/amirrahemi01/draw-adminpanel",
    },
    year: "2026",
    role: { en: "Full-stack developer", fa: "توسعه‌دهنده فول‌استک" },
    duration: { en: "2 months", fa: "۲ ماه" },
    status: { en: "Completed", fa: "تکمیل‌شده" },
  },
  {
    id: "clinic",
    slug: "sportorthopaedie",
    title: { en: "Sportorthopädie Berlin", fa: "Sportorthopädie Berlin" },
    shortDescription: {
      en: "A redesigned two-language (German and English) website for an orthopaedic clinic in Berlin, built with Astro.",
      fa: "بازطراحی وب‌سایت یک کلینیک ارتوپدی در برلین، به دو زبان آلمانی و انگلیسی، ساخته‌شده با Astro.",
    },
    longDescription: {
      en: "A complete redesign of an orthopaedic clinic website in Berlin, rebuilt from the original content. It has German and English versions with proper language routes, patient information with insurance, costs and an FAQ, a page about the doctor, events, reviews, and a contact page with an appointment request form, map and opening hours. The appointment form is a UI-only demo.",
      fa: "بازطراحی کامل وب‌سایت یک کلینیک ارتوپدی در برلین که از روی محتوای اصلی دوباره ساخته شد. نسخه آلمانی و انگلیسی با مسیرهای زبان درست دارد و اطلاعات بیماران شامل بیمه، هزینه‌ها و سؤالات متداول، صفحه معرفی پزشک، رویدادها، نظرات و صفحه تماس با فرم درخواست نوبت، نقشه و ساعات کاری را در بر می‌گیرد. فرم نوبت‌دهی فقط نمایشی است.",
    },
    cover: IMG_CLINIC,
    logo: LOGO_CLINIC,
    screenshots: [],
    tags: ["Frontend", "Multi-language"],
    techStack: ["Astro", "TypeScript", "Tailwind CSS"],
    links: {
      live: "https://dr.amirrahemi.com/",
      github: "https://github.com/amirrahemi01/sportorthopaedie.berlin",
    },
    year: "2026",
    role: { en: "Frontend developer", fa: "توسعه‌دهنده فرانت‌اند" },
    duration: { en: "1 month", fa: "۱ ماه" },
    status: { en: "Completed", fa: "تکمیل‌شده" },
  },
  {
    id: "realestate",
    slug: "realestate",
    title: { en: "Real Estate", fa: "املاک" },
    shortDescription: {
      en: "A real-estate website in English and Persian, with search, filters, listing pages and saved favorites. A demo built from scratch.",
      fa: "یک وب‌سایت املاک به دو زبان انگلیسی و فارسی، با جستجو، فیلتر، صفحه آگهی و ذخیره علاقه‌مندی‌ها. یک دمو که از صفر ساخته‌ام.",
    },
    longDescription: {
      en: "A demo real-estate website that I designed and built from scratch. It works in English and Persian: the Persian version is fully right-to-left with the Vazirmatn font and Persian digits, and the English version shows prices in US dollars. Visitors can search to buy or rent by city, property type and price, filter and sort the results, open a listing with its gallery, key facts, amenities, location and a visit request form, and save listings they like. It has 37 sample listings, an agents page, a contact page, light and dark themes. Everything is static sample data with no backend.",
      fa: "یک دموی سایت املاک که از صفر طراحی و ساختم. به دو زبان انگلیسی و فارسی کار می‌کند: نسخه فارسی کاملاً راست‌به‌چپ است و از فونت وزیرمتن و ارقام فارسی استفاده می‌کند و نسخه انگلیسی قیمت‌ها را به دلار نشان می‌دهد. بازدیدکننده می‌تواند برای خرید یا اجاره بر اساس شهر، نوع ملک و قیمت جستجو کند، نتایج را فیلتر و مرتب کند، یک آگهی را با گالری، مشخصات، امکانات، موقعیت و فرم درخواست بازدید ببیند و آگهی‌های موردعلاقه را ذخیره کند. شامل ۳۷ آگهی نمونه، صفحه مشاوران، صفحه تماس، تم روشن و تاریک است. همه‌چیز داده نمونه استاتیک است و بک‌اند ندارد.",
    },
    cover: IMG_AMLAK,
    logo: LOGO_AMLAK,
    screenshots: [],
    tags: ["Frontend", "Multi-language"],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
    links: {
      live: "https://realestate.amirrahemi.com/en",
      liveFa: "https://realestate.amirrahemi.com/fa",
      github: "https://github.com/amirrahemi01/amlak-demo",
    },
    year: "2026",
    role: { en: "Frontend developer", fa: "توسعه‌دهنده فرانت‌اند" },
    duration: { en: "3 months", fa: "۳ ماه" },
    status: { en: "Completed", fa: "تکمیل‌شده" },
  },
  {
    id: "telegram-clone",
    slug: "telegram-clone",
    title: { en: "Telegram Clone", fa: "کلون تلگرام" },
    shortDescription: {
      en: "A front-end clone of Telegram Web with chats, search and dark mode, running on mock data. Built with Next.js and Zustand.",
      fa: "کلون فرانت‌اند تلگرام وب با چت، جستجو و تم تاریک، با داده‌های نمونه. ساخته‌شده با Next.js و Zustand.",
    },
    longDescription: {
      en: "A front-end only recreation of Telegram Web that I built to practice complex interface work. It has a phone-number login screen, a chat list with pinned and archived chats, unread badges and online status, a conversation view with an emoji picker, search, a contacts list, a settings section and light and dark themes. There is no backend: all chats, contacts and messages are mock data, and a small simulation makes the conversations feel alive. State is managed with Zustand.",
      fa: "بازسازی فقط فرانت‌اند تلگرام وب که برای تمرین ساخت رابط‌های پیچیده نوشتم. شامل صفحه ورود با شماره تلفن، لیست چت‌ها با چت‌های پین‌شده و آرشیو، نشان پیام‌های خوانده‌نشده و وضعیت آنلاین، صفحه گفتگو با انتخاب ایموجی، جستجو، لیست مخاطبان، بخش تنظیمات و تم روشن و تاریک است. بک‌اند ندارد: همه چت‌ها، مخاطبان و پیام‌ها داده نمونه هستند و یک شبیه‌سازی کوچک گفتگوها را زنده نشان می‌دهد. مدیریت state با Zustand انجام شده.",
    },
    cover: IMG_TELEGRAM,
    logo: LOGO_TELEGRAM,
    screenshots: [],
    tags: ["Frontend", "Web app"],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Zustand"],
    links: {
      live: "https://telegram-clone-three-lyart.vercel.app/",
      github: "https://github.com/amirrahemi01/telegram-clone",
    },
    year: "2025",
    role: { en: "Frontend developer", fa: "توسعه‌دهنده فرانت‌اند" },
    duration: { en: "Personal project", fa: "پروژه شخصی" },
    status: { en: "Completed", fa: "تکمیل‌شده" },
  },
];

export const getProjectBySlug = (slug: string) => projectsData.find((p) => p.slug === slug);
export const getProjectSlugs = () => projectsData.map((p) => p.slug);
