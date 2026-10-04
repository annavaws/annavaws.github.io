import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#070B14",
        surface: "#0E1524",
        raised: "#151E31",
        line: "#223049",
        fg: "#E8ECF4",
        muted: "#8A96AD",
        accent: "#FF7A1A",
        signal: "#5CE1E6",
        danger: "#FF4D5E",
        ok: "#4ADE80",
      },
      fontFamily: {
        display: ["var(--font-display)", "Impact", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      transitionTimingFunction: {
        enter: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.25" },
        },
        drift: {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(8px)" },
        },
      },
      animation: {
        blink: "blink 1.6s ease-in-out infinite",
        drift: "drift 1.4s ease-in-out infinite alternate",
      },
    },
  },
  plugins: [],
};
export default config;
