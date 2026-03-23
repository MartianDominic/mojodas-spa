import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/lib/constants/routes";

const models = [
  {
    slug: "ofuro",
    name: "Ofuro",
    badge: "GLAMPINGAMS",
    description:
      "2 asmenims, greitas įšilimas. Idealu porų poilsiui ir mažoms erdvėms.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDLCc95wXpJ75aZGgdFs7-vwoxe7RUHJj_1qxTUcRhI8zvh50gXSTicNSCeEakXuZr6M-L0CAEuOF56Ni331j6V5e_abs6QbLivsIgdM11i2bzey0UUIqL085Q5ys_zzmevwPiIUfAcqzlrmW5U3uoHugJqkPYwYBzM8GPWS8h3CAidDwYufn0XDN7cuU27BW0FcyrjSSQ7VvSZoau2zMURoggFxV5i3wkxZ2Qz93B8slLgXIgBPjqMWnvPoj4IFsswbEEJyHRwhik",
  },
  {
    slug: "classic-round-out",
    name: "Classic Round Out",
    badge: "POPULIARIAUSIAS VERSLUI",
    description:
      "4-6 vietos, išorinė krosnelė. Universaliausias pasirinkimas sodyboms.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCQF0iRK4nuaXgoWoUcoeqbc0VhwTG4AXksk1m0L7Thh6otUpVrgsu4MINOL7PufWmw3qR7lo_0e1Q8D7fcLN6jOH3HHqdFr4LDtd6KAG8NZ11nxfi1yo8i08OBtdk86dqf3yuwNJCjrUj0VKgp82BVhCxKVvY58gL0eSpb3NMQ9-u8c-iErj0wu8Y5ilIuUu23pewjzF3MU6fzd8aLApTZtqP7yciLq2qFd5p3tCOr_4pxSBEx8UvYdgUJGCINnyzoIugf4deHPAA",
  },
  {
    slug: "grande-round-out",
    name: "Grande Round Out",
    badge: "DIDELĖMS KOMPANIJOMS",
    description:
      "6-8 vietos, galinga krosnelė. Skirta didelių grupių talpinimui ir pramogoms.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA6jvWC4VZKtz1BGxZ5gQ1yVxY1DdSl1F4GXvNwBK6o3CpcQYDO7AhE8iSeXYJ9SrUNmnNRTamaYMchE15wbQwzAZsGzQ0hf7dkGYu9TKVKq0forlJnmWsZwiL1pWZ_7Qf6JD_OQ0mdfJgjwFRXpM1m0dVkPmt_JGGvSYldwHsJ3hXY8uOAPRVLd4lR2ytTkiNC9h9U7bEFFl3yraid1VDtjeqCgsuxYJouhOefOwBeBwDv_6Yf8ldPeDnitcPkJkSEz75hUrkvfR4",
  },
];

export function B2BModels() {
  return (
    <section className="py-32 px-8 max-w-screen-2xl mx-auto overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
        <h2 className="font-display text-4xl md:text-5xl max-w-2xl">
          Rekomenduojami modeliai verslui.
        </h2>
        <Link
          href={ROUTES.CATALOG}
          className="text-primary font-bold tracking-widest uppercase text-sm border-b-2 border-primary pb-2 cursor-pointer hover:opacity-80 transition-opacity"
        >
          Visi modeliai
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {models.map((model) => (
          <div key={model.slug} className="group">
            <div className="relative aspect-[3/4] overflow-hidden mb-8 bg-surface-container">
              <span className="absolute top-6 left-6 z-20 bg-primary text-white text-[10px] font-bold tracking-widest px-3 py-1 uppercase">
                {model.badge}
              </span>
              <Image
                src={model.image}
                alt={model.name}
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110"
              />
            </div>
            <div className="space-y-4">
              <h3 className="font-headline text-2xl">{model.name}</h3>
              <p className="text-on-surface-variant text-sm">
                {model.description}
              </p>
              <Link
                href={ROUTES.PRODUCT(model.slug)}
                className="inline-block text-on-surface font-bold uppercase tracking-widest text-xs border-b border-on-surface pb-1 group-hover:text-primary group-hover:border-primary transition-colors"
              >
                Skaityti daugiau
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
