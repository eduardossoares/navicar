import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../../globals.css";
import AuthProvider from "@/contexts/AuthContext";
import DashboardSidebar from "@/components/dashboard-sidebar";
import { Toaster } from "sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Navicar | Seus veículos",
  description:
    "Veja, edite e gerencie todos os seus veículos anunciados no Navicar. Tudo em um só lugar.",
  robots: "noindex, follow",
  openGraph: {
    title: "Navicar | Seu carro com facilidade",
    description: "Gerencie seus anúncios com facilidade no Navicar.",
    url: "https://navicar-web.vercel.app/",
    siteName: "Navicar",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.variable} antialiased flex flex-row min-h-screen`}
      >
        <AuthProvider>
          <DashboardSidebar />
          <Toaster />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
