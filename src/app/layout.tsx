import "./globals.css";

import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "View Finder",
  description: "Explore and share stunning photography.",
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${GeistSans.className} flex min-h-screen flex-col antialiased`}
      >
        <Navbar />

        <main className="flex grow flex-col">{children}</main>

        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
