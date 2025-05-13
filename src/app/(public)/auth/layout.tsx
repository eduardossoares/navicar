import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../globals.css";
import { Toaster } from "sonner";
import AuthProvider from "@/contexts/AuthContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Navicar | Autenticação",
  description:
    "Acesse sua conta Navicar para anunciar veículos, gerenciar anúncios e muito mais. Login seguro e rápido.",
  robots: "noindex, follow",
  openGraph: {
    title: "Navicar | Autenticação",
    url: "https://navicar-web.vercel.app/auth",
    description:
      "Faça login na Navicar e aproveite o melhor marketplace automotivo.",
    siteName: "Navicar",
  },
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} antialiased`}>
        <AuthProvider>
          <Toaster />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
