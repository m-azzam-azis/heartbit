import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ConnectProvider from "@/components/ConnectProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Heartbit",
  description: "Never lose access to your Bitcoin again.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ConnectProvider>
          <Navbar />
          {children}
          <Footer />
        </ConnectProvider>
      </body>
    </html>
  );
}
