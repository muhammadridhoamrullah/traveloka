"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Image from "next/image";
import { FaRegClock, FaRegCreditCard } from "react-icons/fa";
import { LuPlane } from "react-icons/lu";
import {
  formatDate,
  formatDuration,
  formatRupiah,
  getHourAndMinute,
  paymentTypeChanger,
} from "@/db/utils/helperFunctions";
import { GoPeople } from "react-icons/go";
import { PassengerDetails } from "@/db/type/payment";
import CardPassengerDetail from "@/app/components/flight/profile/CardPassengerDetail";
import { TiDocumentText } from "react-icons/ti";
import { MdMailOutline, MdPhoneIphone } from "react-icons/md";
import { RiCustomerService2Line } from "react-icons/ri";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { generateMetaData } from "@/db/utils/metadata";
import SkeletonPayment from "@/app/components/skeleton/profile/SkeletonPayment";
// import CardVaPaymentInstruction from "@/app/components/flight/profile/CardVAPaymentInstruction";
// import CardQrisPaymentInstruction from "@/app/components/flight/profile/CardQrisPaymentInstruction";

export default function ExpiredPaymentPage() {
  const params = useParams();
  const paymentId = params.id;
  const [data, setData] = useState({} as any);
  console.log("data payment expired page:", data);

  const [loading, setLoading] = useState(true);
  const apiUrl = process.env.NEXT_PUBLIC_CLIENT_URL;
  const navigate = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  async function fetchPaymentByOrderId() {
    try {
      setLoading(true);
      const response = await fetch(
        `${apiUrl}/api/payment/checkStatus/${paymentId}`
      );

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Failed to fetch payment data");
      }

      let status = result.dataLengkap.completeData.transaction_status;

      // Cek jika statusnya
      if (status === "pending") {
        Swal.fire({
          icon: "info",
          title: "Info",
          text: "Payment is still pending, redirecting to pending page",
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: true,
        });
        setLoading(false);
        setIsNavigating(true);
        return navigate.push(`/profile/payment/pending/${paymentId}`);
      } else if (status === "settlement" || status === "capture") {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Payment successful, redirecting to success page",
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: true,
        });
        setLoading(false);
        setIsNavigating(true);
        return navigate.push(`/profile/payment/success/${paymentId}`);
      }

      setData(result.dataLengkap);
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
          text: "An unexpected error occurred",
        });
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!paymentId) return;
    fetchPaymentByOrderId();
    navigate.prefetch(`/profile/payment/pending/${paymentId}`);
    navigate.prefetch(`/profile/payment/success/${paymentId}`);
  }, [paymentId]);

  // generate metadata
  generateMetaData({
    title: "Traveloka - Payment Expired",
    description: `Payment for booking ID ${data?.orderId} has expired. Please make a new booking to continue.`,
    canonical: `${apiUrl}/profile/payment/expired/${paymentId}`,
    icons: {
      icon: "traveloka_logo.png",
    },
    ogTitle: "Traveloka - Payment Expired",
    ogDescription: `Payment for booking ID ${data?.orderId} has expired. Please make a new booking to continue.`,
    ogUrl: `${apiUrl}/profile/payment/expired/${paymentId}`,
    ogImage: "traveloka_logo.png",
  });

  return (
    <>
      {loading ? (
        <SkeletonPayment />
      ) : isNavigating ? (
        <div>Redirecting...</div>
      ) : (
        <div className="bg-blue-950 w-full min-h-screen pt-36 px-20 pb-5 flex flex-col justify-start items-center text-white gap-6">
          {/* Awal Judul Expired Payment */}
          <div className="flex flex-col items-center gap-2">
            <Image
              src={"/payment/iconExpiredPayment.png"}
              height={100}
              width={100}
              alt="Logo Pending"
            />
            <div className="font-bold text-3xl capitalize">
              Payment is {data?.completeData?.transaction_status}
            </div>
            <div className="text-sm text-slate-400">
              Your payment has expired. Please make a new booking to continue.
            </div>
          </div>
          {/* Akhir Judul Expired Payment */}

          {/* Awal Sisi Kiri dan Kanan */}
          <div className="flex justify-between items-start w-3/4 gap-6">
            {/* Awal Kiri */}
            <div className=" w-2/3 flex flex-col gap-4">
              {/* Awal Flight Detail */}
              <div className="bg-black/70 w-full h-fit p-4 rounded-xl flex flex-col gap-2 items-start justify-center">
                {/* Awal Flight Detail */}
                <div className="flex items-center gap-2 mb-5">
                  <LuPlane className="text-2xl" />
                  <div className="text-xl font-semibold">Flight Detail</div>
                </div>
                {/* Akhir Flight Detail */}
                {/* Awal Airline and Cabin */}
                <div className="flex justify-between items-center w-full">
                  <div className="flex flex-col  justify-center items-start">
                    <div className="font-semibold text-xl">
                      {data?.flightData?.airline}
                    </div>
                    <div className="text-sm text-slate-400">
                      GA 512 - Boeing 737-900 ER
                      {data?.flightData?.flightNumber} -{" "}
                      {data?.flightData?.aircraft}
                    </div>
                  </div>
                  <div className="py-1 px-2 border border-white rounded-md text-sm">
                    {data?.serviceDetails?.cabinClass}
                  </div>
                </div>
                {/* Akhir Airline and Cabin */}
                {/* Awal Line */}
                <div className="border-[0.5px] border-slate-800 w-full"></div>
                {/* Akhir Line */}
                {/* Awal Info Keberangkatan dan Kedatangan */}
                <div className=" w-full flex justify-between items-start gap-2">
                  <div className=" w-full flex flex-col gap-2 justify-center items-start">
                    <div className="text-sm text-slate-400">Departure</div>
                    <div className="font-semibold text-2xl">
                      {getHourAndMinute(data?.flightData?.departure?.time)}
                    </div>
                    <div className="text-sm text-slate-400">
                      {formatDate(data?.flightData?.departure?.time)}
                    </div>
                    <div className="text-xs text-slate-400">
                      {data?.flightData?.departure?.airportName}
                    </div>
                  </div>
                  <div className=" w-full flex flex-col gap-2 justify-center items-start">
                    <div className="text-sm text-slate-400">Arrival</div>
                    <div className="font-semibold text-2xl">
                      {getHourAndMinute(data?.flightData?.arrival?.time)}
                    </div>
                    <div className="text-sm text-slate-400">
                      {formatDate(data?.flightData?.arrival?.time)}
                    </div>
                    <div className="text-xs text-slate-400">
                      {data?.flightData?.arrival?.airportName}
                    </div>
                  </div>
                </div>
                {/* Akhir Info Keberangkatan dan Kedatangan */}
                {/* Awal Durasi */}
                <div className="flex justify-center items-center gap-2 w-full p-1 mt-3">
                  <FaRegClock className="text-xl " />
                  <div className=" text-sm">
                    {formatDuration(data?.flightData?.duration)}
                  </div>
                </div>
                {/* Akhir Durasi */}
              </div>
              {/* Akhir Flight Detail */}
              {/* Awal Passengers Detail */}
              <div className="bg-black/70 w-full h-fit p-4 rounded-xl flex flex-col gap-2 items-start justify-center">
                {/* Awal Judul Passengers Detail */}
                <div className="flex items-center gap-2 mb-5">
                  <GoPeople className="text-2xl" />
                  <div className="text-xl font-semibold">
                    Passenger(s) Detail
                  </div>
                </div>
                {/* Akhir Judul Passengers Detail */}

                {/* Awal Mapping Passengers Detail */}
                {data?.passengerDetails?.map(
                  (el: PassengerDetails, i: number) => (
                    <CardPassengerDetail key={i} data={el} i={i} />
                  )
                )}
                {/* Akhir Mapping Passengers Detail */}
              </div>
              {/* Akhir Passenger Detail */}
            </div>
            {/* Akhir Kiri */}

            {/* Awal Kanan */}
            <div className="bg-purple-950 w-1/3 flex flex-col gap-4">
              {/* Awal Booking Information */}
              <div className="bg-black/70 w-full h-fit p-4 rounded-xl flex flex-col gap-2 items-start justify-center">
                <div className="flex items-center gap-2 mb-5">
                  <TiDocumentText className="text-2xl" />
                  <div className="text-xl font-semibold">
                    Booking Information
                  </div>
                </div>
                <div className="flex w-full flex-col gap-2 items-start justify-center text-sm">
                  <div className="flex flex-col justify-center items-start gap-1">
                    <div className="text-slate-400">Booking ID</div>
                    <div className="text-lg">{data?.orderId}</div>
                  </div>
                  <div className="flex flex-col justify-center items-start gap-1">
                    <div className="text-slate-400">Transaction ID</div>
                    <div className="text-lg">
                      {data?.completeData?.transaction_id}
                    </div>
                  </div>
                  <div className="border-[0.5px] border-slate-800 w-full"></div>
                  <div className="flex flex-col justify-center items-start gap-1">
                    <div className="text-slate-400">Payment Method</div>
                    <div className="text-lg flex justify-start items-center gap-2 ">
                      <div>
                        {paymentTypeChanger(data?.completeData?.payment_type)}{" "}
                      </div>
                      {data?.completeData?.va_numbers && (
                        <div className="uppercase">
                          {`- VA ${data?.completeData?.va_numbers[0]?.bank}`}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col justify-center items-start gap-1">
                    <div className="text-slate-400">Total Payment</div>
                    <div className="text-red-500 text-lg">
                      {formatRupiah(data?.grossAmount)}
                    </div>
                  </div>
                </div>
              </div>
              {/* Akhir Booking Information */}

              {/* Awal Support */}
              <div className="bg-black/50 w-full p-4 rounded-xl flex flex-col gap-5 justify-center items-start">
                <div className="flex items-center gap-2">
                  <RiCustomerService2Line className="text-2xl" />
                  <div className="text-xl font-semibold">Need Help?</div>
                </div>
                <div className="flex flex-col gap-3 justify-center items-start text-xs">
                  <div>
                    Our customer service team is available 24/7 to assist you.
                  </div>
                  <div className="bg-blue-800 p-2 rounded-md w-full flex justify-center items-center hover:bg-blue-700 cursor-pointer">
                    Contact Customer Service
                  </div>
                </div>
              </div>
              {/* Akhir Support */}
            </div>
            {/* Akhir Kanan */}
          </div>
          {/* Akhir Sisi Kiri dan Kanan */}
        </div>
      )}
    </>
  );
}
