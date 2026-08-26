import IMG_ECOMMERCE from "../assets/image/projects/ecommerce.jpg";
import IMG_RENT from "../assets/image/projects/rent.jpg";
import IMG_FOOD from "../assets/image/projects/food.jpg";

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
  cover: string;
  screenshots: string[];
  tags: string[];
  techStack: string[];
  features: { en: string[]; fa: string[] };
  links: {
    live?: string;
    github?: string;
    figma?: string;
  };
  year: string;
  role: { en: string; fa: string };
  duration: { en: string; fa: string };
  status: { en: string; fa: string };
  gradientFrom: string;
  gradientTo: string;
  overlayFrom: string;
  overlayTo: string;
  accent: string;
}

// Placeholder screenshots — if media missing we generate placeholders via picsum
const placeholder = (seed: string) => `https://picsum.photos/seed/${seed}/1200/750`;
const placeholderSmall = (seed: string) => `https://picsum.photos/seed/${seed}/800/500`;

export const projectsData: ProjectData[] = [
  {
    id: "ecommerce",
    slug: "e-commerce",
    title: { en: "E-Commerce Platform", fa: "فروشگاه اینترنتی" },
    shortDescription: {
      en: "Built with Next.js, MongoDB, Redux, and Express. A full-stack online store with dynamic product pages and admin panel.",
      fa: "ساخته شده با Next.js، MongoDB، Redux و Express. فروشگاه آنلاین با صفحات محصول داینامیک و پنل مدیریت.",
    },
    longDescription: {
      en: "A modern, scalable e-commerce platform crafted to deliver a premium shopping experience. From pixel-perfect product pages to a powerful admin dashboard, every detail is optimized for conversion and performance. Features real-time inventory, secure checkout with Stripe, advanced filtering, wishlist, and order tracking. Built with a clean, modular architecture that mirrors high-end retail experiences — fast, responsive, and SEO-ready.",
      fa: "یک پلتفرم فروشگاهی مدرن و مقیاس‌پذیر که برای ارائه تجربه خرید پرمیوم ساخته شده. از صفحات محصول دقیق تا داشبورد مدیریت قدرتمند، هر جزئیات برای تبدیل و کارایی بهینه شده. شامل موجودی لحظه‌ای، پرداخت امن، فیلترینگ پیشرفته، لیست علاقه‌مندی و پیگیری سفارش است. با معماری تمیز و ماژولار، سریع، ریسپانسیو و آماده سئو.",
    },
    cover: IMG_ECOMMERCE,
    screenshots: [
      IMG_ECOMMERCE,
      placeholderSmall("ecommerce-1"),
      placeholderSmall("ecommerce-2"),
      placeholder("ecommerce-3"),
      placeholderSmall("ecommerce-4"),
    ],
    tags: ["NEXT.JS", "MONGODB", "REDUX", "EXPRESS.JS", "TAILWIND"],
    techStack: ["Next.js 14", "TypeScript", "MongoDB", "Express", "Redux Toolkit", "Tailwind CSS", "Stripe", "JWT"],
    features: {
      en: [
        "Dynamic product catalog with SSR & ISR for SEO",
        "Admin panel — products, orders, users & analytics",
        "Cart, wishlist & secure Stripe checkout",
        "Advanced search, filters & pagination",
        "JWT authentication & role-based access",
        "Responsive, Apple-like UI with smooth transitions",
      ],
      fa: [
        "کاتالوگ پویا با SSR و ISR برای سئو",
        "پنل مدیریت — محصولات، سفارشات، کاربران و آنالیز",
        "سبد خرید، علاقه‌مندی و پرداخت امن Stripe",
        "جستجو و فیلترینگ پیشرفته با صفحه‌بندی",
        "احراز هویت JWT و دسترسی نقش‌محور",
        "رابط کاربری ریسپانسیو شبیه اپل با ترنزیشن نرم",
      ],
    },
    links: {
      live: "https://example.com/ecommerce",
      github: "https://github.com/amirrahemi01",
    },
    year: "2024",
    role: { en: "Full-Stack Developer", fa: "توسعه‌دهنده فول‌استک" },
    duration: { en: "6 weeks", fa: "۶ هفته" },
    status: { en: "Completed", fa: "کامل شده" },
    gradientFrom: "from-slate-500/10",
    gradientTo: "to-cyan-500/10",
    overlayFrom: "from-slate-500/20",
    overlayTo: "to-cyan-500/20",
    accent: "from-slate-655 via-purple-500 to-cyan-500",
  },
  {
    id: "rent-car",
    slug: "rent-car",
    title: { en: "Rent Car Platform", fa: "پلتفرم اجاره خودرو" },
    shortDescription: {
      en: "Developed a responsive car rental platform with Next.js. Users can browse, book, and manage rentals seamlessly.",
      fa: "پلتفرم رنت ماشین با Next.js. کاربران می‌توانند ماشین‌ها را مشاهده، رزرو و مدیریت کنند.",
    },
    longDescription: {
      en: "A premium car rental experience designed for clarity and speed. Users browse a curated fleet, compare specs, check real-time availability, and book in under 30 seconds. Includes calendar-based booking, instant price calculation, user dashboard for upcoming & past rentals, and an admin view for fleet management. The UI takes inspiration from luxury automotive brands — minimal, bold, and confident on every screen size.",
      fa: "یک تجربه اجاره خودرو پرمیوم که برای وضوح و سرعت طراحی شده. کاربران ناوگان منتخب را مرور می‌کنند، مشخصات را مقایسه می‌کنند، موجودی لحظه‌ای را می‌بینند و در کمتر از ۳۰ ثانیه رزرو می‌کنند. شامل تقویم رزرو، محاسبه آنی قیمت، داشبورد کاربر برای رزروهای آینده و گذشته و پنل مدیریت ناوگان. رابط کاربری الهام‌گرفته از برندهای لوکس خودرو — مینیمال، جسور و مطمئن در هر سایز صفحه.",
    },
    cover: IMG_RENT,
    screenshots: [
      IMG_RENT,
      placeholderSmall("rent-1"),
      placeholderSmall("rent-2"),
      placeholder("rent-3"),
      placeholderSmall("rent-4"),
    ],
    tags: ["NEXT.JS", "EXPRESS.JS", "MONGODB", "TAILWIND"],
    techStack: ["Next.js", "TypeScript", "Node.js", "MongoDB", "Prisma", "Tailwind CSS", "Framer Motion"],
    features: {
      en: [
        "Fleet browsing with filters (type, price, transmission)",
        "Real-time availability & booking calendar",
        "Dynamic pricing & instant booking confirmation",
        "User dashboard — trips, invoices & favorites",
        "Admin fleet management & booking timeline",
        "Fully responsive — mobile-first, tablet-optimized",
      ],
      fa: [
        "مرور ناوگان با فیلتر (نوع، قیمت، گیربکس)",
        "موجودی لحظه‌ای و تقویم رزرو",
        "قیمت‌گذاری داینامیک و تایید آنی",
        "داشبورد کاربر — سفرها، فاکتورها و علاقه‌مندی",
        "مدیریت ناوگان و تایم‌لاین رزرو در پنل ادمین",
        "کاملاً ریسپانسیو — موبایل‌فرست و بهینه برای تبلت",
      ],
    },
    links: {
      live: "https://example.com/rent-car",
      github: "https://github.com/amirrahemi01",
    },
    year: "2024",
    role: { en: "Frontend & Backend", fa: "فرانت و بک‌اند" },
    duration: { en: "4 weeks", fa: "۴ هفته" },
    status: { en: "Completed", fa: "کامل شده" },
    gradientFrom: "from-slate-500/10",
    gradientTo: "to-cyan-500/10",
    overlayFrom: "from-slate-500/20",
    overlayTo: "to-cyan-500/20",
    accent: "from-slate-655 via-purple-500 to-pink-500",
  },
  {
    id: "food-delivery",
    slug: "food-delivery",
    title: { en: "Food Delivery App", fa: "اپلیکیشن سفارش غذا" },
    shortDescription: {
      en: "A food ordering app using Next.js and backend APIs. Browse menus, place orders, and track delivery in real-time.",
      fa: "اپ سفارش غذا با Next.js و API بک‌اند. مشتریان می‌توانند منوها را ببینند، سفارش دهند و تحویل را دنبال کنند.",
    },
    longDescription: {
      en: "A vibrant food delivery app built for appetite and speed. Customers explore restaurants, customize meals, track their order from kitchen to doorstep with live status updates, and reorder in one tap. Restaurant owners get a live order board. The design is warm, playful, and ultra-responsive — generous imagery, rounded cards, and soft shadows that echo my portfolio’s aesthetic: clean, modern, and human.",
      fa: "اپ سفارش غذا پرانرژی که برای اشتها و سرعت ساخته شده. مشتریان رستوران‌ها را کاوش می‌کنند، غذا را شخصی‌سازی می‌کنند، وضعیت سفارش را از آشپزخانه تا درب منزل به‌صورت زنده دنبال می‌کنند و با یک تپ دوباره سفارش می‌دهند. رستوران‌داران برد سفارش زنده دارند. طراحی گرم، بازیگوش و کاملاً ریسپانسیو — تصاویر سخاوتمند، کارت‌های گرد و سایه‌های نرم که زیبایی پورتفولیوی من را منعکس می‌کند: تمیز، مدرن و انسانی.",
    },
    cover: IMG_FOOD,
    screenshots: [
      IMG_FOOD,
      placeholderSmall("food-1"),
      placeholderSmall("food-2"),
      placeholder("food-3"),
      placeholderSmall("food-4"),
    ],
    tags: ["NEXT.JS", "EXPRESS.JS", "REST API", "TAILWIND"],
    techStack: ["Next.js", "TypeScript", "REST API", "Tailwind CSS", "React Query", "Socket.io"],
    features: {
      en: [
        "Restaurant & menu discovery with categories",
        "Cart with modifiers, notes & real-time total",
        "Live order tracking (preparing → on the way → delivered)",
        "Reorder & favorites in one tap",
        "Restaurant admin — incoming & preparing boards",
        "Delightful animations & haptics-ready UI",
      ],
      fa: [
        "کاوش رستوران و منو با دسته‌بندی",
        "سبد خرید با افزودنی‌ها، یادداشت و جمع لحظه‌ای",
        "پیگیری زنده سفارش (آماده‌سازی → در راه → تحویل)",
        "سفارش مجدد و علاقه‌مندی با یک تپ",
        "پنل رستوران — برد سفارش‌های ورودی و در حال آماده‌سازی",
        "انیمیشن‌های لذت‌بخش و رابط آماده haptics",
      ],
    },
    links: {
      live: "https://example.com/food-delivery",
      github: "https://github.com/amirrahemi01",
    },
    year: "2023",
    role: { en: "Full-Stack Developer", fa: "توسعه‌دهنده فول‌استک" },
    duration: { en: "5 weeks", fa: "۵ هفته" },
    status: { en: "Completed", fa: "کامل شده" },
    gradientFrom: "from-slate-500/10",
    gradientTo: "to-cyan-500/10",
    overlayFrom: "from-slate-500/20",
    overlayTo: "to-cyan-500/20",
    accent: "from-purple-500 via-pink-500 to-orange-400",
  },
];

export const getProjectBySlug = (slug: string) => projectsData.find((p) => p.slug === slug);
export const getProjectSlugs = () => projectsData.map((p) => p.slug);
