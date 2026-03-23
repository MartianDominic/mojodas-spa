"use client";

import { useState, type FormEvent } from "react";
import { cn } from "@/lib/utils/cn";

interface FormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  quantity: string;
}

interface FormState {
  status: "idle" | "loading" | "success" | "error";
  message?: string;
}

export function LeadForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    company: "",
    email: "",
    phone: "",
    quantity: "1 vienetas",
  });
  const [formState, setFormState] = useState<FormState>({ status: "idle" });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState({ status: "loading" });

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          source: "b2b_page",
          type: "b2b_inquiry",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      setFormState({
        status: "success",
        message: "Dėkojame! Susisieksime su jumis artimiausiu metu.",
      });
      setFormData({
        name: "",
        company: "",
        email: "",
        phone: "",
        quantity: "1 vienetas",
      });
    } catch {
      setFormState({
        status: "error",
        message: "Klaida siunčiant užklausą. Bandykite dar kartą.",
      });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (formState.status === "success") {
    return (
      <div className="space-y-12">
        <div>
          <span className="text-primary font-bold tracking-[0.2em] text-xs uppercase block mb-4">
            UŽKLAUSA IŠSIŲSTA
          </span>
          <h2 className="font-display text-4xl mb-4">Ačiū už jūsų susidomėjimą!</h2>
        </div>
        <div className="bg-surface-container-low p-12 text-center">
          <div className="text-primary text-6xl mb-6">✓</div>
          <p className="text-on-surface-variant text-lg">{formState.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <div>
        <span className="text-primary font-bold tracking-[0.2em] text-xs uppercase block mb-4">
          VASAROS SEZONAS JAU ČIA PAT
        </span>
        <h2 className="font-display text-4xl mb-4">
          Pradėkime jūsų sodybos atnaujinimą šiandien.
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="text-xs font-bold uppercase tracking-widest text-on-surface-variant"
            >
              Vardas Pavardė
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-primary px-0 py-3 transition-colors"
              placeholder="Jūsų vardas"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="company"
              className="text-xs font-bold uppercase tracking-widest text-on-surface-variant"
            >
              Įmonės Pavadinimas
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
              className="w-full bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-primary px-0 py-3 transition-colors"
              placeholder="UAB Pavyzdys"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-xs font-bold uppercase tracking-widest text-on-surface-variant"
            >
              El. Paštas
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-primary px-0 py-3 transition-colors"
              placeholder="email@pavyzdys.lt"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="phone"
              className="text-xs font-bold uppercase tracking-widest text-on-surface-variant"
            >
              Telefono numeris
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-primary px-0 py-3 transition-colors"
              placeholder="+370 ..."
            />
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="quantity"
            className="text-xs font-bold uppercase tracking-widest text-on-surface-variant"
          >
            Planuojamas kiekis
          </label>
          <select
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-primary px-0 py-3 transition-colors appearance-none cursor-pointer"
          >
            <option value="1 vienetas">1 vienetas</option>
            <option value="2-5 vienetai">2-5 vienetai</option>
            <option value="5-10 vienetų">5-10 vienetų</option>
            <option value="10+ vienetų">10+ vienetų</option>
          </select>
        </div>

        {formState.status === "error" && (
          <div className="text-error text-sm">{formState.message}</div>
        )}

        <button
          type="submit"
          disabled={formState.status === "loading"}
          className={cn(
            "bg-primary text-white w-full py-5 font-bold tracking-widest uppercase hover:bg-primary-container transition-all",
            formState.status === "loading" && "opacity-50 cursor-not-allowed"
          )}
        >
          {formState.status === "loading" ? "SIUNČIAMA..." : "GAUTI B2B SĄMATĄ"}
        </button>
      </form>
    </div>
  );
}
