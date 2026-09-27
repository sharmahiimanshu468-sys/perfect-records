import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ScrollProgress } from "@/components/ScrollProgress";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import type { ReactNode } from "react";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <ScrollProgress />
      <Navbar />
      <main id="main" className="flex-1 bg-background pt-16 sm:pt-20">
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
