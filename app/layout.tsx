import type { Metadata } from "next";
import type { ReactNode } from "react";

import "@/app/globals.css";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: `${siteConfig.brandEn} | Merzouga Desert Tours`,
  description:
    "Sahra Joy هو موقع حجز رحلات مرزوكة: رحلات الجمال، الخيم الصحراوية، وجولات الكواد مع تواصل سريع عبر واتساب.",
  keywords: [
    "Sahra Joy",
    "Merzouga",
    "Desert tours Morocco",
    "Camel trekking Merzouga",
    "Desert camp Merzouga",
    "Quad biking Merzouga",
    "رحلات مرزوكة",
    "خيام صحراوية مرزوكة",
    "كواد مرزوكة"
  ],
  alternates: {
    canonical: siteConfig.siteUrl
  },
  openGraph: {
    title: `${siteConfig.brandEn} | Merzouga Desert Tours`,
    description:
      "احجز تجربة مرزوكة المناسبة لك: رحلة جمال، خيمة صحراوية، أو جولة كواد مع تأكيد سريع عبر واتساب.",
    type: "website",
    locale: "ar_MA",
    url: siteConfig.siteUrl,
    siteName: siteConfig.brandEn
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.brandEn} | Merzouga Desert Tours`,
    description:
      "عروض مرزوكة بحجز تفاعلي سريع وتأكيد مباشر عبر واتساب."
  },
  icons: {
    icon: "/favicon.svg"
  }
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
