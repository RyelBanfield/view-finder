import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "View Finder",
  description: "Photography in focus.",
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.className} flex min-h-screen flex-col antialiased`}
      >
        <div className="flex min-h-screen grow flex-col">
          <Navbar />

          <main className="flex grow flex-col">{children}</main>
        </div>

        <Footer />

        <Toaster />
        <Sonner />
      </body>
    </html>
  );
};

export default RootLayout;
