"use client";

import { pushTokenToPayment } from "@/db/model/payment";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
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
    contactDetails: {
      contactDetailFirstName: string;
      contactDetailLastName: string;
      contactDetailMobileNumber: string;
      contactDetailEmail: string;
    };
    passengerDetails: {
      passengerDetailTitle: string;
      passengerDetailFirstName: string;
      passengerDetailLastName: string;
      passengerDetailDateOfBirth: string;
      passengerDetailNationality: string;
    }[];
  };
}

export default function PaymentButton({ data }: Props) {
  const navigate = useRouter();

  const [isSnapReady, setIsSnapReady] = useState(false);

  const api_url = process.env.NEXT_PUBLIC_CLIENT_URL;

  const [loading, setLoading] = useState(false);

  // VALIDATION LOGIC INSIDE PaymentButton
  const validateBeforePayment = () => {
    const errors = [];

    // Contact Details Validation
    if (!data.contactDetails.contactDetailFirstName.trim()) {
      errors.push("Contact first name is required");
    }
    if (!data.contactDetails.contactDetailLastName.trim()) {
      errors.push("Contact last name is required");
    }
    if (!data.contactDetails.contactDetailEmail.trim()) {
      errors.push("Email is required");
    } else if (!data.contactDetails.contactDetailEmail.includes("@")) {
      errors.push("Please enter a valid email");
    }
    if (!data.contactDetails.contactDetailMobileNumber.trim()) {
      errors.push("Mobile number is required");
    }

    // Passenger Details Validation
    data.passengerDetails.forEach((passenger, index) => {
      if (!passenger.passengerDetailFirstName.trim()) {
        errors.push(`Passenger ${index + 1} first name is required`);
      }
      if (!passenger.passengerDetailLastName.trim()) {
        errors.push(`Passenger ${index + 1} last name is required`);
      }
      if (!passenger.passengerDetailDateOfBirth) {
        errors.push(`Passenger ${index + 1} birth date is required`);
      }
    });

    // Show first error if any
    if (errors.length > 0) {
      toast.error(errors[0]);
      return false;
    }

    return true; // All validation passed
  };

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
    //  VALIDATE FIRST before payment
    if (!validateBeforePayment()) {
      return; // Stop if validation fails
    }
    try {
      setLoading(true);
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
            contactDetails: data.contactDetails,
            passengerDetails: data.passengerDetails,
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

      // input token ke db
      // if (result.token && result.order_id) {
      //   await pushTokenToPayment(result.token, result.order_id);
      // }

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
          alert("Payment window closed.");
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <button
        onClick={handlePayment}
        disabled={!isSnapReady || loading}
        className="bg-[#0194F3] hover:bg-blue-700 cursor-pointer rounded-md px-4 py-2 text-sm font-semibold "
      >
        {isSnapReady
          ? loading
            ? "Processing..."
            : "Pay"
          : "Loading Payment Gateway ..."}
      </button>
    </>
  );
}

// BCA Pending
// {
//     "status_code": "201",
//     "status_message": "Your Transaction is being processed",
//     "transaction_id": "18d91748-3304-42d5-89a1-fa55e84d3d5f",
//     "order_id": "TVLKFLTSJ182202508244552",
//     "gross_amount": "980000",
//     "payment_type": "bank_transfer",
//     "transaction_time": "2025-08-24 14:38:26",
//     "transaction_status": "pending",
//     "fraud_status": "accept",
//     "va_numbers": [
//         {
//             "bank": "bca",
//             "va_number": "40427977366662090911410"
//         }
//     ],
//     "bca_va_number": "40427977366662090911410",
//     "pdf_url": "https://app.sandbox.midtrans.com/snap/v1/transactions/983a7270-9d4b-4968-b982-2185ba6306c6/pdf",
//     "finish_redirect_url": "http://example.com?order_id=TVLKFLTSJ182202508244552&status_code=201&transaction_status=pending"
// }

// Shopee Pending
// {
//     "status_code": "201",
//     "status_message": "Your Transaction is being processed",
//     "transaction_id": "2206a276-de6a-4bad-9f6d-826ce4f7e8c0",
//     "order_id": "TVLKFLTJT684202508259085",
//     "gross_amount": "850000",
//     "payment_type": "qris",
//     "transaction_time": "2025-08-25 12:55:03",
//     "transaction_status": "pending",
//     "fraud_status": "accept",
//     "finish_redirect_url": "http://example.com?order_id=TVLKFLTJT684202508259085&status_code=201&transaction_status=pending"
// }

// GoPay Pending
// {
//     "status_code": "201",
//     "status_message": "Transaksi sedang diproses",
//     "transaction_id": "e8112bc9-58a0-4755-a96c-7860503b9cd4",
//     "order_id": "TVLKFLTSJ182202508236376",
//     "gross_amount": "980000",
//     "payment_type": "qris",
//     "transaction_time": "2025-08-23 14:52:47",
//     "transaction_status": "pending",
//     "fraud_status": "accept",
//     "finish_redirect_url": "http://example.com?order_id=TVLKFLTSJ182202508236376&status_code=201&transaction_status=pending"
// }

// Indomaret Pending
// {
//     "status_code": "201",
//     "status_message": "Your Transaction is being processed",
//     "transaction_id": "e61d1fd8-19ed-4109-a7dc-be9eba8d5463",
//     "order_id": "TVLKFLTSJ182202508252707",
//     "gross_amount": "980000",
//     "payment_type": "cstore",
//     "transaction_time": "2025-08-25 12:57:20",
//     "transaction_status": "pending",
//     "fraud_status": "accept",
//     "payment_code": "081234567890",
//     "pdf_url": "https://app.sandbox.midtrans.com/snap/v1/transactions/7c4ff9aa-aa9c-4899-b280-f1b197778bc6/pdf",
//     "finish_redirect_url": "http://example.com?order_id=TVLKFLTSJ182202508252707&status_code=201&transaction_status=pending"
// }

// {
//     "status_code": "201",
//     "status_message": "Your Transaction is being processed",
//     "transaction_id": "7582fb7a-3282-42b4-8c63-d18d670000cd",
//     "order_id": "TVLKFLTJT684202508256555",
//     "gross_amount": "850000",
//     "payment_type": "qris",
//     "transaction_time": "2025-08-25 13:21:40",
//     "transaction_status": "pending",
//     "fraud_status": "accept",
//     "finish_redirect_url": "http://example.com?order_id=TVLKFLTJT684202508256555&status_code=201&transaction_status=pending"
// }
