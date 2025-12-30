"use client";

import React, { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Mail, Phone, Chrome } from "lucide-react";
import { usePathname, useRouter } from "@/src/i18n/navigation";
import { Locale } from "@/src/config/data";

export default function AuthPage() {
  const t = useTranslations("auth");
  const locale = useLocale();
  const router = useRouter();
  const [loginMethod, setLoginMethod] = useState<"email" | "phone">("email");
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [showVerification, setShowVerification] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const isRTL = locale === "fa" || locale === "ar";

  const socialProviders = [
    { name: "Microsoft", icon: "🪟", color: "bg-blue-600" },
    { name: "Facebook", icon: "👤", color: "bg-blue-700" },
    { name: "Github", icon: "⚫", color: "bg-gray-800" },
    { name: "Gitlab", icon: "🦊", color: "bg-orange-600" },
    { name: "Discord", icon: "🎮", color: "bg-indigo-600" },
  ];

  const languages = [
    { code: "fa", label: "فارسی", flag: "🇮🇷" },
    { code: "en", label: "English", flag: "🇬🇧" },
  ];

  const handleSocialLogin = (provider: string) => {
    alert(`ورود با ${provider}`);
  };

  const handleGoogleLogin = () => {
    alert("ورود با Google");
  };

  const handleContinue = () => {
    setError("");

    if (!showVerification) {
      if (emailOrPhone.trim() === "") {
        setError(t("enterEmailOrPhone"));
        return;
      }

      setLoading(true);
      setTimeout(() => {
        setShowVerification(true);
        setLoading(false);
      }, 1000);
    } else {
      if (verificationCode.trim() === "" || verificationCode.length !== 6) {
        setError(t("invalidCode"));
        return;
      }

      setLoading(true);
      setTimeout(() => {
        alert("ورود موفق!");
        setLoading(false);
      }, 1000);
    }
  };

  const changeLanguage = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 flex items-center justify-center p-4`}
    >
      <div className="w-full max-w-md">
        {/* Language Switcher */}
        <div
          className={`flex ${
            isRTL ? "justify-start" : "justify-end"
          } mb-4 gap-2`}
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code as Locale)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition shadow-sm ${
                locale === lang.code
                  ? "bg-purple-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span className="mr-1">{lang.flag}</span>
              {lang.label}
            </button>
          ))}
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
              <span className="text-3xl">🤖</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {t("welcome")}
            </h1>
            <p className="text-gray-600">{t("subtitle")}</p>
          </div>

          {/* Google Login Button */}
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full bg-white border-2 border-gray-300 hover:border-blue-500 text-gray-700 font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-3 transition mb-4 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Chrome className="w-5 h-5 text-blue-600" />
            {t("loginWithGoogle")}
          </button>

          {/* Other Options Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500 font-medium">
                {t("otherOptions")}
              </span>
            </div>
          </div>

          {/* Social Providers Grid */}
          <div className="grid grid-cols-5 gap-3 mb-6">
            {socialProviders.map((provider) => (
              <button
                key={provider.name}
                onClick={() => handleSocialLogin(provider.name)}
                disabled={loading}
                className={`${provider.color} text-white p-3 rounded-xl hover:opacity-90 transition text-2xl flex items-center justify-center shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed h-14`}
                title={provider.name}
              >
                {provider.icon}
              </button>
            ))}
          </div>

          {/* Or Login With Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500 font-medium">
                {t("orLoginWith")}
              </span>
            </div>
          </div>

          {/* Email/Phone Toggle */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setLoginMethod("email")}
              disabled={showVerification}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition ${
                loginMethod === "email"
                  ? "bg-purple-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <Mail className={`w-4 h-4 inline ${isRTL ? "ml-2" : "mr-2"}`} />
              {t("email")}
            </button>
            <button
              onClick={() => setLoginMethod("phone")}
              disabled={showVerification}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition ${
                loginMethod === "phone"
                  ? "bg-purple-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <Phone className={`w-4 h-4 inline ${isRTL ? "ml-2" : "mr-2"}`} />
              {t("phone")}
            </button>
          </div>

          {/* Input Fields */}
          {!showVerification ? (
            <div className="mb-4">
              {loginMethod === "phone" && (
                <div
                  className={`flex gap-2 ${isRTL ? "flex-row-reverse" : ""}`}
                >
                  <input
                    type="text"
                    value={t("phoneCode")}
                    readOnly
                    className="w-20 px-3 py-3 border-2 border-gray-300 rounded-lg bg-gray-50 text-center font-medium"
                  />
                  <input
                    type="tel"
                    placeholder={t("phoneNumber")}
                    value={emailOrPhone}
                    onChange={(e) =>
                      setEmailOrPhone(e.target.value.replace(/\D/g, ""))
                    }
                    className={`flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none transition ${
                      isRTL ? "text-right" : "text-left"
                    }`}
                  />
                </div>
              )}
              {loginMethod === "email" && (
                <input
                  type="email"
                  placeholder={t("emailAddress")}
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  className={`w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none transition ${
                    isRTL ? "text-right" : "text-left"
                  }`}
                />
              )}
            </div>
          ) : (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("verificationCode")}
              </label>
              <input
                type="text"
                placeholder="------"
                value={verificationCode}
                onChange={(e) =>
                  setVerificationCode(
                    e.target.value.replace(/\D/g, "").slice(0, 6)
                  )
                }
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none text-center text-2xl tracking-widest transition font-mono"
                maxLength={6}
              />
              <p className="text-sm text-gray-500 mt-2 text-center">
                {t("checkInbox")}
              </p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg animate-shake">
              <p className="text-red-600 text-sm text-center">{error}</p>
            </div>
          )}

          {/* Continue Button */}
          <button
            onClick={handleContinue}
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-3 px-4 rounded-xl hover:from-purple-700 hover:to-blue-700 transition shadow-lg hover:shadow-xl mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>...</span>
              </div>
            ) : (
              t("continue")
            )}
          </button>

          {/* Guest Login */}
          <button
            onClick={() => alert("ورود مهمان")}
            disabled={loading}
            className="w-full text-gray-600 hover:text-purple-600 font-medium py-2 transition disabled:opacity-50"
          >
            {t("continueAsGuest")}
          </button>

          {/* Terms */}
          <div className="mt-6 text-center text-xs text-gray-500 leading-relaxed">
            <p>
              {t("termsText")}{" "}
              <a
                href="#"
                className="text-purple-600 hover:underline font-medium"
              >
                {t("termsOfService")}
              </a>{" "}
              {t("and")}{" "}
              <a
                href="#"
                className="text-purple-600 hover:underline font-medium"
              >
                {t("privacy")}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
