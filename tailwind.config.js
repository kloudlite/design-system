import tailwindBase from "./tailwind-base";

export default {
  ...tailwindBase,
  prefix: "kl-",
  content: ["components/**/*.{js,ts,jsx,tsx,mdx}"],
};
