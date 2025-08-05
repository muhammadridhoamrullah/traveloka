import { poppins } from "@/db/utils/font";
import React from "react";
import Navbar from "../components/Navbar";

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <Navbar />
      <main className={`antialiased ${poppins.className}  `}>{children}</main>
    </div>
  );
}
