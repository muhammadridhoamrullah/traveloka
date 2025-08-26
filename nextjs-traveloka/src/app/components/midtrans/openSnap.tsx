"use client";

import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

interface Props {
  result: {
    token: string;
    order_id: string;
  };
}

export default function openSnap({ result }: Props) {
  const api_url = process.env.NEXT_PUBLIC_CLIENT_URL;
  const navigate = useRouter();

  window.snap.pay(result.token, {
    onSuccess: async (result) => {
      console.log("✅ Payment Success:", result);

      // Cukup 1 API call
      await fetch(`${api_url}/api/payment/checkStatus/${result.order_id}`);

      Swal.fire({
        title: "Payment Successful",
        text: `Order ID: ${result.order_id}`,
        icon: "success",
        timer: 3000,
        showConfirmButton: false,
      }).then(() => {
        navigate.push(`/profile/payment/success/${result.order_id}`);
      });
    },
    onPending: async (result) => {
      console.log("⏳ Payment Pending:", result);

      // Cukup 1 API call
      await fetch(`${api_url}/api/payment/checkStatus/${result.order_id}`);

      Swal.fire({
        title: "Payment Pending",
        text: `Order ID: ${result.order_id}. Please complete your payment.`,
        icon: "info",
        timer: 5000,
        showConfirmButton: false,
      }).then(() => {
        navigate.push(`/profile/payment/pending/${result.order_id}`);
      });
    },
    onError: async (result) => {
      console.log("❌ Error:", result);
      alert("Payment Error: " + JSON.stringify(result));
    },
    onClose: () => {
      console.log("❌ Closed");
      Swal.fire({
        title: "Payment window closed",
        text: "You closed the payment window before completing the payment.",
        icon: "warning",
        timer: 3000,
        showCancelButton: true,
        confirmButtonText: "Continue Payment",
        cancelButtonText: "Cancel",
      }).then(async (res) => {
        if (res.isConfirmed) {
          const resp = await fetch(`${api_url}/api/payment/${result.order_id}`);
          const resulto = await resp.json();

          // panggil snap
          openSnap(resulto);
        }
      });
    },
  });
}
