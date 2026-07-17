import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { QueryProvider } from "@/providers/QueryProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "AESCION Admin OS",
  description: "Enterprise Operating System for AESCION",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <QueryProvider>
          <AdminLayout>
            {children}
          </AdminLayout>
        </QueryProvider>
      </body>
    </html>
  );
}
