import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";

import { AnalyticsScript } from "@/components/analytics-script";
import { JsonLd } from "@/components/json-ld";
import { FloatingContact, SiteFooter, SiteHeader } from "@/components/site-chrome";
import { TrackingListener } from "@/components/tracking-listener";
import { siteConfig } from "@/lib/content";
import { organizationSchema, websiteSchema } from "@/lib/seo";

const display = localFont({
  src: "./fonts/NewYork-Regular.ttf",
  variable: "--font-display",
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.domain),
  title: {
    default: siteConfig.baseTitle,
    template: siteConfig.titleTemplate,
  },
  description: siteConfig.description,
  applicationName: siteConfig.brand,
  category: "legal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body className={display.variable}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-P2M4SXP4"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <AnalyticsScript />
        <TrackingListener />
        <JsonLd data={[websiteSchema(), organizationSchema()]} />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <FloatingContact />
      </body>
    </html>
  );
}
