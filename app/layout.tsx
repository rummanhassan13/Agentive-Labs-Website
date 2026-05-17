import type { Metadata } from "next";
import { instrumentSerif, inter, geistMono } from "@/lib/fonts";
import { ThemeProvider } from "@/components/utility/ThemeProvider";
import { JsonLd } from "@/components/utility/JsonLd";
import { organization, website } from "@/lib/jsonld/organization";
import { Toaster } from "@/components/ui/sonner";
import { site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Agentive Labs — Documented AI Automation for SMEs",
    template: "%s | Agentive Labs",
  },
  description:
    "Owner-ready AI automations on n8n, WhatsApp Cloud API and HubSpot. Productized packages from $1,290. 90-day ROI promise.",
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
    url: site.url,
  },
  twitter: {
    card: "summary_large_image",
    site: site.twitterHandle,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${instrumentSerif.variable} ${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-surface-0 text-fg flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
        <JsonLd data={[organization(), website()]} />
      </body>
    </html>
  );
}
