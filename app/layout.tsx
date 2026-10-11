import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";

import { AnalyticsScript } from "@/components/analytics-script";
import { DeferredFloatingContact } from "@/components/deferred-floating-contact";
import { JsonLd } from "@/components/json-ld";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { navigationGroups } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";
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
        <AnalyticsScript />
        <JsonLd data={[websiteSchema(), organizationSchema()]} />
        <SiteHeader navigationGroups={navigationGroups} />
        <main>{children}</main>
        <SiteFooter />
        <DeferredFloatingContact />
      </body>
    </html>
  );
}
