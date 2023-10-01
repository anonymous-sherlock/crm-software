export type SiteConfig = typeof siteConfig;
import logo from "@/assets/logo.png";
export const siteConfig = {
  name: "Adscrush CRM",
  logo: {
    src: logo.src,
    alt: "Adscruh Logo",
  },
  description:
    "Beautifully designed components built with Radix UI and Tailwind CSS.",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "About",
      href: "/about",
    },
    {
      title: "Analyze",
      href: "/analyze",
    },
    {
      title: "Documentation",
      href: "/documentation",
    },
    {
      title: "Report",
      href: "/report",
    },
    {
      title: "API",
      href: "/Api",
    },
  ],
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/ui",
    docs: "https://ui.shadcn.com",
  },
  API_URL: "https://localhost/api/v1",
};
