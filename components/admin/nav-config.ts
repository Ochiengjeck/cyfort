export type AdminNavGroup = {
  label: string;
  items: Array<{ label: string; href: string }>;
};

export const ADMIN_NAV: AdminNavGroup[] = [
  {
    label: "Overview",
    items: [{ label: "Dashboard", href: "/admin" }],
  },
  {
    label: "Site",
    items: [
      { label: "Settings & Theme", href: "/admin/settings" },
      { label: "Navigation", href: "/admin/settings/nav" },
      { label: "Media Library", href: "/admin/media" },
    ],
  },
  {
    label: "Pages",
    items: [
      { label: "Home Hero", href: "/admin/home" },
      { label: "About", href: "/admin/about" },
      { label: "Differentiators", href: "/admin/differentiators" },
      { label: "Our Promise", href: "/admin/promise" },
    ],
  },
  {
    label: "Collections",
    items: [
      { label: "Services", href: "/admin/services" },
      { label: "Industries", href: "/admin/industries" },
      { label: "Team", href: "/admin/team" },
      { label: "Case Studies", href: "/admin/case-studies" },
      { label: "Insights", href: "/admin/insights" },
      { label: "Careers", href: "/admin/careers" },
      { label: "Legal Pages", href: "/admin/legal" },
    ],
  },
  {
    label: "Inbox",
    items: [
      { label: "Messages", href: "/admin/messages" },
      { label: "Newsletter", href: "/admin/newsletter" },
    ],
  },
];
