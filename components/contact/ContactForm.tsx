"use client";

import { useState } from "react";
import { cn } from "@/lib/utils/cn";

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormState {
  status: "idle" | "loading" | "success" | "error";
  message?: string;
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [formState, setFormState] = useState<FormState>({ status: "idle" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState({ status: "loading" });

    try {
      const response = await fetch("/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          source: "contact_page",
          type: "general_inquiry",
          timestamp: new Date().toISOString(),
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
        email: "",
        phone: "",
        message: "",
      });
    } catch {
      setFormState({
        status: "error",
        message: "Klaida siunčiant žinutę. Bandykite dar kartą.",
      });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (formState.status === "success") {
    return (
      <div className="space-y-12">
        <div>
          <span className="text-primary font-bold tracking-[0.2em] text-xs uppercase block mb-4">
            ŽINUTĖ IŠSIŲSTA
          </span>
          <h2 className="font-display text-4xl mb-4">
            Ačiū už jūsų žinutę!
          </h2>
        </div>
        <div className="bg-surface-container-low p-12 text-center">
          <div className="text-primary text-6xl mb-6">✓</div>
          <p className="text-on-surface-variant text-lg leading-relaxed">
            {formState.message}
          </p>
          <button
            onClick={() => setFormState({ status: "idle" })}
            className="mt-8 text-primary font-bold text-sm uppercase tracking-widest hover:underline"
          >
            Siųsti kitą žinutę
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <div>
        <span className="text-primary font-bold tracking-[0.2em] text-xs uppercase block mb-4">
          RAŠYKITE MUMS
        </span>
        <h2 className="font-display text-4xl mb-4">
          Užpildykite kontaktų formą
        </h2>
        <p className="text-on-surface-variant leading-relaxed">
          Palikite savo kontaktus ir trumpą žinutę. Atsakysime per 24 valandas
          darbo dienomis.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="text-xs font-bold uppercase tracking-widest text-on-surface-variant"
            >
              Vardas Pavardė *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-primary px-0 py-3 transition-colors"
              placeholder="Jūsų vardas ir pavardė"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="phone"
              className="text-xs font-bold uppercase tracking-widest text-on-surface-variant"
            >
              Telefono numeris *
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
            htmlFor="email"
            className="text-xs font-bold uppercase tracking-widest text-on-surface-variant"
          >
            El. paštas *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-primary px-0 py-3 transition-colors"
            placeholder="jusu.pastas@example.lt"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="message"
            className="text-xs font-bold uppercase tracking-widest text-on-surface-variant"
          >
            Jūsų žinutė *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            className="w-full bg-transparent border border-outline-variant focus:ring-0 focus:border-primary p-4 transition-colors resize-none"
            placeholder="Parašykite savo klausimą ar komentarą..."
          />
        </div>

        {formState.status === "error" && (
          <div className="bg-error-container p-4 border-l-4 border-error">
            <p className="text-on-error-container text-sm">
              {formState.message}
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={formState.status === "loading"}
          className={cn(
            "bg-primary text-white w-full py-5 font-bold tracking-widest uppercase hover:bg-primary-container transition-all",
            formState.status === "loading" && "opacity-50 cursor-not-allowed"
          )}
        >
          {formState.status === "loading" ? "SIUNČIAMA..." : "SIŲSTI ŽINUTĘ"}
        </button>

        <p className="text-on-surface-variant text-xs text-center">
          * Privalomi laukai
        </p>
      </form>
    </div>
  );
}
