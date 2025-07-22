"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "./loading";
import Swal from "sweetalert2";
import Link from "next/link";

export default function VerifyEmail() {
  const params = useSearchParams();

  const token = params.get("token");
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");

  const url = process.env.NEXT_PUBLIC_CLIENT_URL;

  async function verifyEmail() {
    try {
      setLoading(true);
      const response = await fetch(`${url}/api/users/verify-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to verify email");
      }

      setStatus(data.message);
    } catch (error) {
      if (error instanceof Error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Internal Server Error",
        });
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (token) {
      verifyEmail();
    } else {
      setStatus("Token is missing");
    }
  }, [token]);

  if (loading) return <Loading />;

  return (
    <div className="bg-[#0B98F0] w-full min-h-screen flex flex-col gap-2 justify-center items-center font-bold text-white text-2xl">
      <div>{status}</div>
      <Link
        href={"/login"}
        className="w-40 flex justify-center items-center p-2 border-2 border-white rounded-md hover:bg-white hover:text-[#0B98F0] transition-colors duration-300"
      >
        LOG IN
      </Link>
    </div>
  );
}
