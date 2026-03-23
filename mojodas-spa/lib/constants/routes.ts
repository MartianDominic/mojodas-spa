export const ROUTES = {
  HOME: "/",
  CATALOG: "/katalogas",
  PRODUCT: (slug: string) => `/produktas/${slug}`,
  CONFIGURATOR: (slug: string) => `/produktas/${slug}/konfiguratorius`,
  CART: "/krepselis",
  CHECKOUT: "/atsiskaitymas",
  B2B: "/verslui",
  CONTACT: "/kontaktai",
  ABOUT: "/apie-mus",
} as const;

export const NAV_LINKS = [
  { label: "Katalogas", href: ROUTES.CATALOG },
  { label: "Verslui", href: ROUTES.B2B },
  { label: "Kontaktai", href: ROUTES.CONTACT },
] as const;

export const FOOTER_LINKS = {
  info: [
    { label: "Garantija", href: "#" },
    { label: "DUK", href: "#" },
    { label: "Taisyklės", href: "#" },
  ],
  legal: [
    { label: "Privatumo politika", href: "#" },
  ],
} as const;
