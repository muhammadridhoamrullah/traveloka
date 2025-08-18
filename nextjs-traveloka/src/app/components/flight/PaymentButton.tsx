"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    snap: {
      pay: (
        token: string,
        options: {
          onSuccess?: (result: any) => void;
          onPending?: (result: any) => void;
          onError?: (result: any) => void;
          onClose?: () => void;
        }
      ) => void;
    };
  }
}

interface Props {
  data: {
    orderId: string;
    grossAmount: number;
  };
}

export default function PaymentButton({ data }: Props) {
  console.log("Payment Data:", data);
  const navigate = useRouter();

  const [isSnapReady, setIsSnapReady] = useState(false);

  const api_url = process.env.NEXT_PUBLIC_CLIENT_URL;

  //   Check snap
  useEffect(() => {
    const checkSnap = () => {
      if (window.snap) {
        setIsSnapReady(true);
      } else {
        setTimeout(checkSnap, 1000);
      }
    };
    checkSnap();
  }, []);

  //   function to handle payment
  async function handlePayment() {
    try {
      if (!isSnapReady || !window.snap) {
        alert("Payment gateway is not ready yet.");
        return;
      }

      const response = await fetch(
        `${api_url}/api/payment/generateMidtransToken`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderId: data.orderId,
            grossAmount: data.grossAmount,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to generate payment token"
        );
      }
      const result = await response.json();
      console.log("result:", result);
      //   Pakai window.snap untuk memulai pembayaran

      window.snap.pay(result.token, {
        onSuccess: (result) => {
          console.log("✅ Success:", result);
          alert("Payment Successful!");
        },
        onPending: (result) => {
          console.log("⏳ Pending:", result);
          alert("Payment Pending!");
        },
        onError: (result) => {
          console.log("❌ Error:", result);
          alert("Payment Error: " + JSON.stringify(result));
        },
        onClose: () => {
          console.log("❌ Closed");
          alert("Payment window closed.");
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An unexpected error occurred during payment processing.");
      }
    }
  }
  return (
    <>
      <button
        onClick={handlePayment}
        disabled={!isSnapReady}
        className="bg-[#0194F3] rounded-md px-4 py-2 text-sm font-semibold hover:bg-blue-700 cursor-pointer"
      >
        {isSnapReady ? "Pay" : "Loading Payment Gateway ..."}
      </button>
    </>
  );
}
