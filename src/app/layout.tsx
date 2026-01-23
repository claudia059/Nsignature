import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BootstrapClient from "@/components/BootstrapClient";
import { Master } from "@/components/Master";
import { CompanyInfo } from "@/data/properties";

export const metadata: Metadata = {
  title: CompanyInfo[0].title,
  description:CompanyInfo[0].decs,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <BootstrapClient />
        <Navbar />
        <main>{children}</main>
        <Master />
        <Footer />
      </body>
    </html>
  );
}
