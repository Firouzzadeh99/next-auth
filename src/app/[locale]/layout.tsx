import { Locale, NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { setRequestLocale, getMessages } from "next-intl/server";
import { ReactNode } from "react";
import { Inter, Poppins, Outfit } from "next/font/google";
import localFont from "next/font/local";
import { routing } from "@/src/i18n/routing";
import { ThemeProvider } from "@/src/providers/ThemeProvider";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-outfit",
});

const iransans = localFont({
  src: [
    {
      path: "../../assets/fonts/woff2/IRANSansWeb(FaNum).woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../assets/fonts/woff2/IRANSansWeb(FaNum)_Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../assets/fonts/woff/IRANSansWeb(FaNum).woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../assets/fonts/woff/IRANSansWeb(FaNum)_Bold.woff",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-iransans",
  display: "swap",
});

type Props = {
  children: ReactNode;
  params: Promise<{ locale: Locale }>;
};

const defaultMeta: Record<Locale, { title: string; description: string }> = {
  fa: {
    title: "نکست جی اس",
    description: "تست نکست جس اس",
  },
  en: {
    title: "next.js",
    description: "test next.js ",
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Omit<Props, "children">) {
  const { locale } = await params;
  const meta = defaultMeta[locale] || defaultMeta["en"];

  return {
    ...meta,
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      dir={locale === "fa" ? "rtl" : "ltr"}
      suppressHydrationWarning
    >
      <body
        className={
          locale === "en"
            ? `${inter.variable} ${poppins.variable} ${outfit.variable}`
            : `${iransans.variable}`
        }
      >
        <NextIntlClientProvider messages={messages} locale={locale}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="w-full min-h-screen">{children}</div>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
