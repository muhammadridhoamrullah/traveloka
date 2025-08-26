"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

interface Props {
  data: any;
}
export default function CardQrisPaymentInstruction({ data }: Props) {
  console.log("data di qris", data);
  const [qrisUrl, setQrisUrl] = useState(null);
  console.log("qrisUrl", qrisUrl);

  async function fetchQris() {
    try {
      const response = await fetch(
        `http://localhost:3000/api/payment/qrisGenerator?transactionId=${data.completeData.transaction_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to fetch QRIS");
      }

      setQrisUrl(result.base64Image);
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
          text: "An unexpected error occurred during fetching QRIS.",
        });
      }
    }
  }

  useEffect(() => {
    fetchQris();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <h1>Hai qris {data.orderId}</h1>
      {qrisUrl ? (
        <Image
          src={`data:image/png;base64,${qrisUrl}`}
          alt="QRIS Code"
          width={200}
          height={200}
          unoptimized={true}
        />
      ) : (
        <div>Loading Qris</div>
      )}
    </div>
  );
}
