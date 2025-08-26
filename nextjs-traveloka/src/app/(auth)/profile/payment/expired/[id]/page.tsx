"use client";

import { useParams } from "next/navigation";

export default function ExpiredPaymentPage() {
  const params = useParams();
  const paymentId = params.id;
  return (
    <div>
      <h1>Expired Page for Order Id: {paymentId}</h1>
    </div>
  );
}
