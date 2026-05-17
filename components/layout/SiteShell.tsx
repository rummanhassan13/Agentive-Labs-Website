import * as React from "react";
import { Header } from "@/components/nav/Header";
import { Footer } from "@/components/nav/Footer";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}
