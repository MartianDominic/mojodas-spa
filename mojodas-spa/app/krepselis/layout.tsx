import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Krepšelis",
  description:
    "Peržiūrėkite savo krepšelį ir pirkite išskirtinio dizaino masažinius kubilius. Saugus mokėjimas, nemokamas pristatymas ir 5 metų garantija.",
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
