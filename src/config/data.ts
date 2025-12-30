export const LANGS = ["fa", "en"] as const;

export type Locale = typeof LANGS[number];
