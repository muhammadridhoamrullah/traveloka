"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

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
    serviceType: string;
    serviceDetails: {
      flightId: string;
      flightNumber: string;
      passengerCount: number;
      cabinClass: string;
    };
  };
}

export default function PaymentButton({ data }: Props) {
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
            serviceType: data.serviceType,
            serviceDetails: data.serviceDetails,
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

      window.snap.pay(result.token, {
        onSuccess: async (result) => {
          await fetch(`${api_url}/api/payment/updateStatus`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              orderId: result.order_id,
              grossAmount: result.gross_amount,
              transactionStatus: result.transaction_status,
              paymentType: result.payment_type,
              transactionTime: result.transaction_time,
              fraudStatus: result.fraud_status,
              transactionId: result.transaction_id,
              dataBody: data,
            }),
          });

          Swal.fire({
            title: "Payment Successful",
            text: `Order ID: ${result.order_id}`,
            icon: "success",
            timer: 3000,
            showConfirmButton: false,
          }).then(() => {
            navigate.push(`/profile/payment/${result.order_id}`);
          });
        },
        onPending: async (result) => {
          console.log("⏳ Pending yuhu:", result);
          alert("Payment Pending!");
        },
        onError: async (result) => {
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
