 import { defineRouting } from "next-intl/routing";
import { LANGS } from "../config/data";

export const routing = defineRouting({
  locales: LANGS,
  defaultLocale: "fa",
  localeDetection: true,
  // localePrefix: "always"
});
