import Navbar from "@/app/components/Navbar";
import { poppins } from "@/db/utils/font";
import React from "react";

export default function FlightLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <Navbar />
      <main className={`antialiased ${poppins.className}`}>{children}</main>
    </div>
  );
}
