import "./globals.css";

import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";

import { Footer } from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "View Finder",
  description:
    "Explore stunning photography and connect with professional photographers.",
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${GeistSans.className} antialiased`}>
        <Navbar />

        <main>{children}</main>

        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
