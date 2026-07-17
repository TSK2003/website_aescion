import React from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 w-full bg-neutral-50 pt-32 pb-24">
        <div className="container mx-auto px-6 max-w-4xl bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-neutral-200">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}
