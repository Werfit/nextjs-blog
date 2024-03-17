import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";
import Color from "color";

const lighten = (color: string, ratio: number) =>
  Color(color).lighten(ratio).toString();

const colors = {
  primary: "#1A80E5",
  black: "#0D141C",
  lightGray: "#E8EDF2",
};

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/common/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: (theme) => ({
      ...theme.colors,
      primary: {
        400: lighten(colors.primary, 0.1),
        500: colors.primary,
      },
      black: {
        500: lighten(colors.black, 4),
        700: lighten(colors.black, 1),
        900: colors.black,
      },
      lightGray: {
        50: lighten(colors.lightGray, 0.05),
        100: lighten(colors.lightGray, 0.02),
        200: colors.lightGray,
      },
    }),
    extend: {
      fontFamily: {
        sans: ["var(--font-asap)", ...fontFamily.sans],
      },
      fontSize: {
        title: "2rem",
        heading: "1.5rem",
        subheading: "1.25rem",
        body: "1rem",
        nav: "1.125rem",
      },
    },
  },
  plugins: [
    plugin(({ addBase, theme }) => {
      addBase({ html: { color: theme("colors.black.900") } });
    }),
  ],
};
export default config;
