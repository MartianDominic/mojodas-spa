"use client";

import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/lib/constants/routes";

export function Hero() {
  return (
    <header className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black text-white">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/marketing/hero-bg.jpg"
          alt="Luxury outdoor spa at night"
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-8 lg:px-12 mb-16 md:mb-24 lg:mb-32 h-full flex flex-col justify-end items-start mt-auto max-w-screen-2xl">
        <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl xl:text-7xl mb-6 md:mb-8 leading-[1.1] tracking-tight max-w-5xl text-left">
          Jūsų poilsio zona kieme.
        </h1>
        <div className="flex flex-col md:flex-row items-start justify-start gap-4 md:gap-6">
          <Link href={ROUTES.CATALOG}>
            <button className="w-full md:w-auto px-5 py-2.5 md:px-6 md:py-3 lg:px-8 lg:py-3.5 bg-white text-black text-xs md:text-sm font-bold tracking-[0.2em] uppercase transition-transform hover:scale-105 active:opacity-70">
              RINKTIS MODELĮ
            </button>
          </Link>
          <Link href={ROUTES.CONTACT}>
            <button className="w-full md:w-auto px-5 py-2.5 md:px-6 md:py-3 lg:px-8 lg:py-3.5 border border-white text-white text-xs md:text-sm font-bold tracking-[0.2em] uppercase transition-colors hover:bg-white/10 active:opacity-70">
              15 MIN. KONSULTACIJA
            </button>
          </Link>
        </div>
      </div>

      {/* Trust Strip */}
      <TrustStrip />
    </header>
  );
}

function TrustStrip() {
  return (
    <div className="absolute bottom-0 w-full bg-black py-4 md:py-5 border-t border-white/10">
      <div className="container mx-auto px-4 md:px-8 lg:px-12 flex flex-wrap justify-between items-center gap-4 md:gap-6 lg:gap-8 text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-white/90 max-w-screen-2xl">
        <span>PAGAMINTA LIETUVOJE</span>
        <span className="hidden md:block w-px h-4 bg-white/20" />
        <span>AISI 316 PLIENAS</span>
        <span className="hidden md:block w-px h-4 bg-white/20" />
        <span>5 METŲ GARANTIJA</span>
        <span className="hidden md:block w-px h-4 bg-white/20" />
        <span>IŠMANUS MOKĖJIMAS DALIMIS</span>
      </div>
    </div>
  );
}
