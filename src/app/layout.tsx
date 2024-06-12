import "./globals.css";

import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";

import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "View Finder",
  description:
    "Explore stunning photography and connect with professional photographers.",
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${GeistSans.className} mx-auto flex min-h-screen flex-col antialiased`}
      >
        <main className="flex grow flex-col py-3">{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
