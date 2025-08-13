export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "ShelfSearch",
  description: "A website to compare prices on differnt quickCommerce sites",
  navItems: [
    {
      label: "Home",
      href: "/home",
    },
    {
      label: "Categories",
      href: "/categories",
    },
    {
      label: "Offers",
      href: "/pricing",
    }
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Favorite",
      href: "/projects",
    },
    {
      label: "Home",
      href: "/team",
    },
    {
      label: "Categories",
      href: "/categories",
    },
    {
      label: "Offers",
      href: "/settings",
    }
  ],
  links: {
    github: "https://github.com/heroui-inc/heroui",
    twitter: "https://twitter.com/hero_ui",
    docs: "https://heroui.com",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
