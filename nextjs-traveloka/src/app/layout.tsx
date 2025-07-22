import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { poppins } from "@/db/utils/font";

export const metadata: Metadata = {
  title: "Traveloka",
  description: "Traveloka Clone with Next.js",
  icons: {
    icon: "/traveloka_logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` antialiased ${poppins.className}`}>{children}</body>
    </html>
  );
}
