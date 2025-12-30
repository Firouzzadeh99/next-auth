import { getLocale } from "next-intl/server";
import Link from "next/link";
import { Home, AlertCircle } from "lucide-react";

const translations = {
  en: {
    title: "Page Not Found",
    subtitle: "404 Error",
    description: "Sorry, the page you're looking for doesn't exist or has been moved.",
    homeButton: "Back to Home",
    helpText: "Need help? Contact our support team"
  },
  fa: {
    title: "صفحه پیدا نشد",
    subtitle: "خطای 404",
    description: "متأسفیم، صفحه‌ای که به دنبال آن هستید وجود ندارد یا منتقل شده است.",
    homeButton: "بازگشت به خانه",
    helpText: "نیاز به کمک دارید؟ با پشتیبانی تماس بگیرید"
  },
  ar: {
    title: "الصفحة غير موجودة",
    subtitle: "خطأ 404",
    description: "عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.",
    homeButton: "العودة إلى الرئيسية",
    helpText: "هل تحتاج مساعدة؟ اتصل بفريق الدعم"
  }
};

export default async function NotFoundPage() {
  const locale = await getLocale();
  const t = translations[locale as keyof typeof translations] || translations.en;
  const isRTL = locale === "fa" || locale === "ar";

  return (
    <div 
      className="w-full min-h-screen flex flex-col justify-center items-center bg-yellow-50 text-yellow-900 px-4"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="max-w-xl w-full text-center space-y-6">
        {/* Icon */}
        <div className="flex flex-col items-center gap-4">
          <AlertCircle className="w-24 h-24 text-yellow-600" strokeWidth={1.5} />
          <h1 className="text-7xl font-bold">{t.subtitle}</h1>
        </div>

        {/* Content */}
        <div className="space-y-2">
          <h2 className="text-3xl font-semibold">{t.title}</h2>
          <p className="text-base">{t.description}</p>
        </div>

        {/* Action Button */}
        <div className="pt-4">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-500 text-white rounded-full font-semibold hover:bg-yellow-600 transition"
          >
            <Home className="w-5 h-5" />
            {t.homeButton}
          </Link>
        </div>

        {/* Help Text */}
        <p className="pt-6 text-sm text-yellow-800">{t.helpText}</p>
      </div>
    </div>
  );
}
