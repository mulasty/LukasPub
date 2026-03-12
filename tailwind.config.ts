import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./styles/**/*.css"
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--color-background)",
        surface: "var(--color-surface)",
        card: "var(--color-card)",
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        accent: "var(--color-accent)",
        text: "var(--color-text-primary)",
        muted: "var(--color-text-secondary)"
      },
      fontFamily: {
        headline: ["var(--font-headline)", "Impact", "sans-serif"],
        body: ["var(--font-body)", "Segoe UI", "sans-serif"]
      },
      boxShadow: {
        panel: "0 28px 90px rgba(0, 0, 0, 0.42)",
        pink: "0 0 34px rgba(255, 59, 31, 0.28)",
        blue: "0 0 34px rgba(0, 209, 255, 0.26)"
      },
      backgroundImage: {
        "hero-grid":
          "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)"
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        pulseGlow: "pulseGlow 3.2s ease-in-out infinite"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" }
        },
        pulseGlow: {
          "0%, 100%": {
            boxShadow: "0 0 0 rgba(255,0,122,0)"
          },
          "50%": {
            boxShadow: "0 0 35px rgba(255,0,122,0.28)"
          }
        }
      }
    }
  },
  plugins: []
};

export default config;
