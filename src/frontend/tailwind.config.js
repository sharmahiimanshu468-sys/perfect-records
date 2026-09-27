import typography from "@tailwindcss/typography";
import containerQueries from "@tailwindcss/container-queries";
import animate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],  content: ["index.html", "src/**/*.{js,ts,jsx,tsx,html,css}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "oklch(var(--border))",
        input: "oklch(var(--input))",
        ring: "oklch(var(--ring) / <alpha-value>)",
        background: "oklch(var(--background))",
        foreground: "oklch(var(--foreground))",
        primary: {
          DEFAULT: "oklch(var(--primary) / <alpha-value>)",
          foreground: "oklch(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "oklch(var(--secondary) / <alpha-value>)",
          foreground: "oklch(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "oklch(var(--destructive) / <alpha-value>)",
          foreground: "oklch(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "oklch(var(--muted) / <alpha-value>)",
          foreground: "oklch(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "oklch(var(--accent) / <alpha-value>)",
          foreground: "oklch(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "oklch(var(--popover))",
          foreground: "oklch(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "oklch(var(--card))",
          foreground: "oklch(var(--card-foreground))",
        },
        chart: {
          1: "oklch(var(--chart-1))",
          2: "oklch(var(--chart-2))",
          3: "oklch(var(--chart-3))",
          4: "oklch(var(--chart-4))",
          5: "oklch(var(--chart-5))",
        },
        gold: {
          DEFAULT: "oklch(var(--gold) / <alpha-value>)",
          strong: "oklch(var(--gold-strong) / <alpha-value>)",
          soft: "oklch(var(--gold-soft) / <alpha-value>)",
          foreground: "oklch(var(--gold-foreground))",
        },
        blue: {
          DEFAULT: "oklch(var(--blue) / <alpha-value>)",
          strong: "oklch(var(--blue-strong) / <alpha-value>)",
          soft: "oklch(var(--blue-soft) / <alpha-value>)",
          foreground: "oklch(var(--blue-foreground))",
        },
        brand: {
          DEFAULT: "oklch(var(--brand) / <alpha-value>)",
          foreground: "oklch(var(--brand-foreground))",
          ink: "oklch(var(--brand-ink))",
        },
        sidebar: {
          DEFAULT: "oklch(var(--sidebar))",
          foreground: "oklch(var(--sidebar-foreground))",
          primary: "oklch(var(--sidebar-primary))",
          "primary-foreground": "oklch(var(--sidebar-primary-foreground))",
          accent: "oklch(var(--sidebar-accent))",
          "accent-foreground": "oklch(var(--sidebar-accent-foreground))",
          border: "oklch(var(--sidebar-border))",
          ring: "oklch(var(--sidebar-ring))",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      transitionTimingFunction: {
        cinematic: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgba(0,0,0,0.05)",
        subtle: "0 1px 2px oklch(var(--foreground) / 0.06), 0 8px 24px -16px oklch(var(--foreground) / 0.18)",
        elevated: "0 18px 48px -28px oklch(0.21 0.006 265 / 0.22), 0 2px 6px -2px oklch(0.21 0.006 265 / 0.08)",
        "elevated-lg": "0 40px 90px -44px oklch(0.21 0.006 265 / 0.26), 0 4px 12px -4px oklch(0.21 0.006 265 / 0.1)",
        accent: "0 20px 56px -30px oklch(0.21 0.006 265 / 0.35)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.22", transform: "scale(1)" },
          "50%": { opacity: "0.42", transform: "scale(1.06)" },
        },
        waveform: {
          "0%, 100%": { transform: "scaleY(0.35)" },
          "50%": { transform: "scaleY(1)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "glow-sweep": {
          from: { backgroundPosition: "200% center" },
          to: { backgroundPosition: "-200% center" },
        },
        "brand-sheen": {
          from: { backgroundPosition: "200% center" },
          to: { backgroundPosition: "-200% center" },
        },
        "accent-pulse": {
          "0%, 100%": { opacity: "0.55", transform: "scale(1)" },
          "50%": { opacity: "0.9", transform: "scale(1.08)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: "float 7s ease-in-out infinite",
        "pulse-glow": "pulse-glow 6s ease-in-out infinite",
        waveform: "waveform 1.1s ease-in-out infinite",
        marquee: "marquee 32s linear infinite",
        "glow-sweep": "glow-sweep 6s linear infinite",
        "brand-sheen": "brand-sheen 6.5s linear infinite",
        "accent-pulse": "accent-pulse 5s ease-in-out infinite",
      },
    },
  },
  plugins: [typography, containerQueries, animate],
};
