"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils/cn";
import { Button } from "./Button";

export interface CalendlyPrefill {
  name?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  customAnswers?: Record<string, string>;
}

export interface CalendlyEmbedProps {
  url?: string;
  style?: "inline" | "popup";
  height?: number | string;
  prefill?: CalendlyPrefill;
  className?: string;
  buttonText?: string;
  buttonVariant?: "primary" | "secondary" | "tertiary" | "outline" | "ghost" | "dark" | "white";
  buttonSize?: "sm" | "md" | "lg" | "xl";
}

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (config: {
        url: string;
        parentElement: HTMLElement;
        prefill?: CalendlyPrefill;
      }) => void;
      initPopupWidget: (config: { url: string; prefill?: CalendlyPrefill }) => void;
    };
  }
}

const DEFAULT_CALENDLY_URL = "https://calendly.com/mojodasspa/15min-konsultacija";

export function CalendlyEmbed({
  url = DEFAULT_CALENDLY_URL,
  style = "inline",
  height = 700,
  prefill,
  className,
  buttonText = "Užsiregistruoti konsultacijai",
  buttonVariant = "primary",
  buttonSize = "lg",
}: CalendlyEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  // Load Calendly script
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check if script is already loaded
    if (window.Calendly) {
      setScriptLoaded(true);
      setIsLoading(false);
      return;
    }

    // Check if script element already exists
    const existingScript = document.querySelector(
      'script[src="https://assets.calendly.com/assets/external/widget.js"]'
    );
    if (existingScript) {
      existingScript.addEventListener("load", () => {
        setScriptLoaded(true);
        setIsLoading(false);
      });
      return;
    }

    // Load script
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    script.onload = () => {
      setScriptLoaded(true);
      setIsLoading(false);
    };
    script.onerror = () => {
      setIsLoading(false);
      console.error("Failed to load Calendly script");
    };

    document.head.appendChild(script);

    // Load CSS
    const link = document.createElement("link");
    link.href = "https://assets.calendly.com/assets/external/widget.css";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    return () => {
      // Cleanup on unmount (optional)
      // Note: We keep the script loaded for better performance across components
    };
  }, []);

  // Initialize inline widget
  useEffect(() => {
    if (style !== "inline" || !scriptLoaded || !containerRef.current || !window.Calendly) {
      return;
    }

    // Clear container safely before initializing
    while (containerRef.current.firstChild) {
      containerRef.current.removeChild(containerRef.current.firstChild);
    }

    try {
      window.Calendly.initInlineWidget({
        url,
        parentElement: containerRef.current,
        prefill,
      });
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to initialize Calendly inline widget:", error);
      setIsLoading(false);
    }
  }, [style, scriptLoaded, url, prefill]);

  const handlePopupClick = () => {
    if (!window.Calendly) {
      console.error("Calendly script not loaded");
      return;
    }

    try {
      window.Calendly.initPopupWidget({
        url,
        prefill,
      });
    } catch (error) {
      console.error("Failed to open Calendly popup:", error);
    }
  };

  if (style === "popup") {
    return (
      <Button
        variant={buttonVariant}
        size={buttonSize}
        onClick={handlePopupClick}
        disabled={!scriptLoaded}
        className={className}
      >
        {buttonText}
      </Button>
    );
  }

  // Inline style
  const heightValue = typeof height === "number" ? `${height}px` : height;

  return (
    <div className={cn("relative w-full", className)}>
      {/* Loading State */}
      {isLoading && (
        <div
          className="flex items-center justify-center bg-surface-container border border-outline-variant/30"
          style={{ height: heightValue }}
        >
          <div className="flex flex-col items-center gap-4">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-outline-variant border-t-primary" />
            <p className="text-sm text-on-surface-variant">Įkeliamas kalendorius...</p>
          </div>
        </div>
      )}

      {/* Calendly Container */}
      <div
        ref={containerRef}
        className={cn(
          "calendly-inline-widget w-full transition-opacity duration-300",
          isLoading ? "opacity-0 absolute inset-0" : "opacity-100"
        )}
        style={{ minWidth: "320px", height: heightValue }}
      />
    </div>
  );
}
