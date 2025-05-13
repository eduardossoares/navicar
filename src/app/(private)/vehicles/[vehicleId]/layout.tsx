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
  title: "Navicar | Página de Veículo",
  description:
    "Confira os detalhes do veículo selecionado. Veja preço, fotos e entre em contato com o vendedor no Navicar.",
  robots: "index, follow",
  openGraph: {
    title: "Navicar | Página de Veículo",
    description: "Gerencie seus anúncios com facilidade no Navicar.",
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
