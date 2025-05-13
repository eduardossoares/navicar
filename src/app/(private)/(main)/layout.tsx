import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../globals.css";
import AuthProvider from "@/contexts/AuthContext";
import DashboardSidebar from "@/components/dashboard-sidebar";
import { Toaster } from "sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Navicar | Seu carro com facilidade",
  description:
    "Pesquise milhares de anúncios de carros novos e usados no Navicar. Encontre seu próximo veículo de forma fácil e rápida.",
  robots: "index, follow",
  openGraph: {
    title: "Navicar | Seu carro com facilidade",
    description:
      "Use o Navicar para encontrar o carro ideal. Novos, seminovos e usados.",
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
