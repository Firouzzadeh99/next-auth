"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { usePathname, useRouter } from "@/src/i18n/navigation";
import { Locale } from "@/src/config/data";
import { useTheme } from "next-themes";
import { Chrome, Apple, Linkedin, Twitter, ArrowLeft, Moon, Sun } from "lucide-react";

export default function AuthPage() {
  const t = useTranslations("auth");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const [loginType, setLoginType] = useState<"email" | "phone">("email");
  const [mainInput, setMainInput] = useState("");
  const [otpInput, setOtpInput] = useState("");
  const [isOtpStep, setIsOtpStep] = useState(false);
  const [error, setError] = useState("");
  const [showMoreSocials, setShowMoreSocials] = useState(false);

  const isRTL = locale === "fa";

  // برای جلوگیری از hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // شبیه‌سازی ارسال کد OTP
  const handleContinue = () => {
    if (!isOtpStep) {
      if (mainInput.length > 3) {
        setIsOtpStep(true);
        setError("");
      } else {
        setError(t("enterEmailOrPhone"));
      }
    } else {
      if (otpInput.length === 6) {
        // در فایل تسک، به app.html ریدایرکت می‌شود. ما اینجا می‌توانیم به صفحه اصلی ریدایرکت کنیم.
        router.push("/app");
      } else {
        setError(t("invalidCode"));
      }
    }
  };

  const resetForm = () => {
    setIsOtpStep(false);
    setMainInput("");
    setOtpInput("");
    setError("");
  };

  const changeLanguage = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale });
  };

   if (!mounted) return null;

  return (
    <div className="min-h-screenflex flex-col">
      {/* Navbar */}
      <nav className="absolute top-0 w-full p-6 flex justify-between items-center z-10">
        <div className="font-bold text-xl tracking-tight flex items-center gap-2">
          <div className="w-8 h-8 bg-text-primary text-bg-primary rounded-lg flex items-center justify-center text-xs font-black">
            AI
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-8 h-8 rounded-full cursor-pointer flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-border-color transition"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Language Toggle */}
          <div className="flex items-center gap-2 scale-90">
            <span className="text-xs text-text-secondary font-bold">EN</span>
            <div className="relative inline-block w-10 align-middle select-none">
              <input
                type="checkbox"
                id="lang-toggle"
                checked={isRTL}
                onChange={() => changeLanguage(isRTL ? "en" : "fa")}
                className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-bg-primary border-2 border-border-color appearance-none cursor-pointer transition-all duration-300 left-0 checked:left-5"
              />
              <label htmlFor="lang-toggle" className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 cursor-pointer"></label>
            </div>
            <span className="text-xs text-text-secondary font-bold">FA</span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="auth-card">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">
              {t("welcome")}
            </h1>
            <p className="text-text-secondary text-sm">
              {t("subtitle")}
            </p>
          </div>

          {/* Social Section */}
          <div className="space-y-3">
            <button className="btn-outline w-full justify-center gap-2 font-medium">
              <Chrome size={20} />
              <span>{t("loginWithGoogle")}</span>
            </button>

            <div className="grid grid-cols-3 gap-3">
              <button className="btn-outline">
                <Apple size={20} />
              </button>
              <button className="btn-outline">
                <Linkedin size={20} />
              </button>
              <button className="btn-outline">
                <Twitter size={20} />
              </button>
            </div>

            {/* More Socials Accordion */}
            <div className="text-center">
              <button
                onClick={() => setShowMoreSocials(!showMoreSocials)}
                className="text-xs cursor-pointer text-text-secondary hover:text-text-primary transition underline decoration-dotted"
              >
                {t("moreOptions")}
              </button>
              
              <div className={`expandable-grid ${showMoreSocials ? "open" : ""}`}>
                {["Microsoft", "Facebook", "Github", "Gitlab", "Discord"].map((social, idx) => (
                  <div key={idx} className="social-chip">
                    {social}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="relative py-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border-color"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-bg-primary px-2 text-text-secondary">
                {t("orLoginWith")}
              </span>
            </div>
          </div>

          {/* Form Section */}
          <div className="space-y-4">
            {/* Toggle Email/Phone */}
            <div className="flex justify-center mb-2">
              <div className="toggle-group">
                <button
                  type="button"
                  className={`toggle-btn ${loginType === "email" ? "active" : ""}`}
                  onClick={() => {
                    setLoginType("email");
                    resetForm();
                  }}
                >
                  {t("email")}
                </button>
                <button
                  type="button"
                  className={`toggle-btn ${loginType === "phone" ? "active" : ""}`}
                  onClick={() => {
                    setLoginType("phone");
                    resetForm();
                  }}
                >
                  {t("phone")}
                </button>
              </div>
            </div>

            {/* Main Input */}
            <div className="relative">
              <label className="block text-xs font-medium mb-1.5 ml-1 mr-1 text-text-secondary">
                {loginType === "email" 
                  ? t("emailAddress")
                  : t("phoneNumber")}
              </label>
              <div className="relative">
                {loginType === "phone" && (
                  <span className={`absolute ${isRTL ? "right-3" : "left-3"} top-1/2 -translate-y-1/2 text-xs bg-bg-secondary px-2 py-1 rounded border border-border-color`}>
                    {t("phoneCode")}
                  </span>
                )}
                <input
                  type={loginType === "email" ? "email" : "tel"}
                  value={mainInput}
                  onChange={(e) => {
                    setMainInput(e.target.value);
                    setError("");
                  }}
                  disabled={isOtpStep}
                  className={`input-field ${isRTL ? "text-right" : "text-left"} ${loginType === "phone" && isRTL ? "pr-12" : loginType === "phone" ? "pl-12" : ""}`}
                  placeholder={
                    loginType === "email" 
                      ? "name@example.com" 
                      : "912 345 6789"
                  }
                />
              </div>
            </div>

            {/* OTP Input */}
            <div className={`otp-section ${isOtpStep ? "visible" : ""}`}>
              <label className="block text-xs font-medium mb-1.5 ml-1 mr-1 text-text-secondary">
                {t("verificationCode")}
              </label>
              <input
                type="text"
                value={otpInput}
                onChange={(e) => {
                  setOtpInput(e.target.value.replace(/\D/g, "").slice(0, 6));
                  setError("");
                }}
                maxLength={6}
                className="input-field text-center tracking-[0.5em] font-mono text-lg"
                placeholder="••••••"
              />
              <p className="text-[10px] text-text-secondary mt-1 text-center">
                {t("checkInbox")}
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="hidden bg-red-50 text-red-600 text-xs p-2 rounded-lg text-center border border-red-100">
                {error}
              </div>
            )}

            {/* Continue Button */}
            <button
              onClick={handleContinue}
              className="btn-primary mt-2"
            >
              <span>
                {isOtpStep 
                  ? t("signIn") 
                  : t("continue")}
              </span>
              <ArrowLeft className={isRTL ? "" : "rotate-180"} />
            </button>

            {/* Guest Login */}
            <button
              onClick={() => alert(t("guestLogin"))}
              className="w-full text-xs text-text-secondary hover:text-text-primary mt-2 transition"
            >
              {t("continueAsGuest")}
            </button>
          </div>

          {/* Footer Legal */}
          <div className="mt-8 pt-4 border-t border-border-color text-center">
            <p className="text-[10px] text-text-secondary leading-relaxed">
              {t("termsText")}{" "}
              <a
                href="#"
                className="underline hover:text-text-primary mx-1"
              >
                {t("termsOfService")}
              </a>{" "}
              {t("and")}{" "}
              <a
                href="#"
                className="underline hover:text-text-primary mx-1"
              >
                {t("privacy")}
              </a>
              .
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}