import Link from "next/link";
import { ROUTES } from "@/lib/constants/routes";
import { Icon } from "@/components/ui";

export function Footer() {
  return (
    <footer className="bg-surface-container-low border-t border-outline-variant/10">
      {/* Main Footer */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:p-8 lg:p-12 px-4 md:px-8 lg:px-12 py-12 md:py-16 lg:py-20 w-full max-w-[1920px] mx-auto">
        {/* Brand Column */}
        <div className="md:col-span-1">
          <Link
            href={ROUTES.HOME}
            className="text-lg font-bold text-on-surface font-headline mb-6 block"
          >
            Lux Spa Nature
          </Link>
          <p className="font-body text-sm tracking-wide leading-relaxed text-on-surface-variant mb-8 max-w-xs">
            Ramybės inžinerija jūsų namams. Kuriame tai, kas suteikia džiaugsmą kūnui ir ramybe sielai.
          </p>
          <div className="flex gap-4">
            <span className="text-on-surface-variant hover:text-primary cursor-pointer transition-colors">
              <Icon name="public" />
            </span>
            <span className="text-on-surface-variant hover:text-primary cursor-pointer transition-colors">
              <Icon name="language" />
            </span>
          </div>
        </div>

        {/* Info Links */}
        <div className="flex flex-col gap-4">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-on-surface mb-2">
            Informacija
          </span>
          <Link
            href="#"
            className="font-body text-sm tracking-wide leading-relaxed text-on-surface-variant hover:text-primary transition-colors duration-200"
          >
            Garantija
          </Link>
          <Link
            href="#"
            className="font-body text-sm tracking-wide leading-relaxed text-on-surface-variant hover:text-primary transition-colors duration-200"
          >
            DUK
          </Link>
          <Link
            href="#"
            className="font-body text-sm tracking-wide leading-relaxed text-on-surface-variant hover:text-primary transition-colors duration-200"
          >
            Taisyklės
          </Link>
        </div>

        {/* Legal Links */}
        <div className="flex flex-col gap-4">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-on-surface mb-2">
            Teisinė informacija
          </span>
          <Link
            href="#"
            className="font-body text-sm tracking-wide leading-relaxed text-on-surface-variant hover:text-primary transition-colors duration-200"
          >
            Privatumo politika
          </Link>
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-4">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-on-surface mb-2">
            Kontaktai
          </span>
          <p className="font-body text-sm tracking-wide leading-relaxed text-on-surface-variant">
            Telšiai, Lietuva<br />
            +370 (600) 00000<br />
            info@luxspanature.com
          </p>
        </div>
      </div>

      {/* Copyright */}
      <div className="px-4 md:px-8 lg:px-12 py-8 border-t border-outline-variant/10">
        <div className="container mx-auto text-center md:text-left">
          <p className="font-body text-sm tracking-wide leading-relaxed text-on-surface-variant">
            © 2024 Lux Spa Nature. Ramybės inžinerija.
          </p>
        </div>
      </div>
    </footer>
  );
}
