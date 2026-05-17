import type { Metadata } from "next";
import { instrumentSerif, inter, geistMono } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Agentive Labs — Documented AI Automation for SMEs",
    template: "%s | Agentive Labs",
  },
  description:
    "Owner-ready AI automations on n8n, WhatsApp Cloud API and HubSpot. Productized packages from $1,290. 90-day ROI promise.",
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
        {children}
      </body>
    </html>
  );
}
