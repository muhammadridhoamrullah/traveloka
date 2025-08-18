"use client";

import { useParams } from "next/navigation";

export default function MyPaymentById() {
  const params = useParams();

  const paymentId = params.id;
  return (
    <div className="bg-blue-950 w-full min-h-screen pt-36 px-20 pb-5 flex flex-col justify-center items-center text-white">
      <h1 className="text-2xl font-bold text-center">
        Payment For Id: {paymentId}
      </h1>
      <p className="text-center mt-4">
        This is the payment detail page for a specific payment ID.
      </p>
    </div>
  );
}
