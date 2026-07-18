import type { Metadata } from "next";


import { AdminLayout } from "@/components/admin/layout/AdminLayout";
import { QueryProvider } from "@/providers/QueryProvider";



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
    <div className="antialiased h-screen w-full">
      <QueryProvider>
        <AdminLayout>
          {children}
        </AdminLayout>
      </QueryProvider>
    </div>
  );
}
