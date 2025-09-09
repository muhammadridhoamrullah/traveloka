"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { LuPlane } from "react-icons/lu";
import { FaRegClock } from "react-icons/fa6";
import { GoPeople } from "react-icons/go";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { TiDocumentText } from "react-icons/ti";
import { FiDownload } from "react-icons/fi";
import { MdMailOutline } from "react-icons/md";
import { FaRegCalendarPlus } from "react-icons/fa6";
import { RiCustomerService2Line } from "react-icons/ri";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  formatDate,
  formatDuration,
  formatRupiah,
  getHourAndMinute,
  getHourAndMinuteFromDate,
  getTimeAndDate,
  paymentTypeChanger,
} from "@/db/utils/helperFunctions";
import { PassengerDetails } from "@/db/type/payment";
import CardPassengerDetail from "@/app/components/flight/profile/CardPassengerDetail";
import { generateMetaData } from "@/db/utils/metadata";
import SkeletonPayment from "@/app/components/skeleton/profile/SkeletonPayment";

export default function SuccessPayment() {
  const params = useParams();
  const apiUrl = process.env.NEXT_PUBLIC_CLIENT_URL;
  const paymentId = params.id;
  const navigate = useRouter();
  const [dataPayment, setDataPayment] = useState({} as any);
  const [loading, setLoading] = useState(true);
  const [isNavigating, setIsNavigating] = useState(false);
  console.log("Data Payment:", dataPayment);

  // fetch data payment by ID
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

      let status = result.dataLengkap?.completeData?.transaction_status;
      if (status === "pending") {
        Swal.fire({
          icon: "info",
          title: "Info",
          text: "Payment is still pending, redirecting to pending page",
          timer: 3000,
          showConfirmButton: true,
          timerProgressBar: true,
        });
        setLoading(false);
        setIsNavigating(true);
        navigate.push(`/profile/payment/pending/${paymentId}`);
        return;
      } else if (status === "expire") {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Payment has expired, redirecting to failed page",
          timer: 3000,
          showConfirmButton: true,
          timerProgressBar: true,
        });
        setLoading(false);
        setIsNavigating(true);
        navigate.push(`/profile/payment/expired/${paymentId}`);
        return;
      }

      setDataPayment(result.dataLengkap);
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
    if (paymentId) {
      navigate.prefetch(`/profile/payment/pending/${paymentId}`);
      navigate.prefetch(`/profile/payment/expired/${paymentId}`);
      fetchPaymentByOrderId();
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Payment ID is required",
      });
    }
  }, [paymentId]);

  // Generate Metadata
  generateMetaData({
    title: "Traveloka - Payment Success",
    description: `Payment successful for order ${dataPayment?.orderId}. View your flight details and e-ticket information.`,
    canonical: `${apiUrl}/profile/payment/success/${dataPayment?.orderId}`,
    icons: {
      icon: "/traveloka_logo.png",
    },
    ogTitle: "Traveloka - Payment Success",
    ogDescription: `Payment successful for order ${dataPayment?.orderId}. View your flight details and e-ticket information.`,
    ogUrl: `${apiUrl}/profile/payment/success/${dataPayment?.orderId}`,
    ogImage: "traveloka_logo.png",
  });
  return (
    <>
      {loading ? (
        <SkeletonPayment />
      ) : isNavigating ? (
        <div>Navigating</div>
      ) : (
        <div className="bg-blue-950 w-full min-h-screen pt-36 px-20 pb-5 flex flex-col justify-start items-center text-white gap-6">
          {/* Awal Payment Successful */}
          <div className="flex flex-col gap-2 items-center">
            <Image
              src={"/payment/iconSuccessPayment.png"}
              width={100}
              height={100}
              alt="Logo Success Payment"
            />
            <div className="font-bold text-3xl">Payment Successful!</div>
            <div className="text-sm text-slate-400">
              Your ticket has been successfully purchased. The E-Ticket will be
              sent to your email very soon.
            </div>
          </div>
          {/* Akhir Payment Successful */}

          {/* Awal Sisi Kiri dan Kanan */}
          <div className="flex justify-between items-start w-3/4 gap-6">
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
                      {dataPayment?.flightData?.airline}
                    </div>
                    <div className="text-sm text-slate-400">
                      {dataPayment?.serviceDetails?.flightNumber} -{" "}
                      {dataPayment?.flightData?.aircraft}
                    </div>
                  </div>
                  <div className="py-1 px-2 border border-white rounded-md text-sm">
                    {dataPayment?.serviceDetails?.cabinClass}
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
                      {getHourAndMinute(
                        dataPayment?.flightData?.departure?.time
                      )}
                    </div>
                    <div className="text-sm text-slate-400">
                      {formatDate(dataPayment?.flightData?.departure?.time)}
                    </div>
                    <div className="text-xs text-slate-400">
                      {dataPayment?.flightData?.departure?.airportName}
                    </div>
                  </div>
                  <div className=" w-full flex flex-col gap-2 justify-center items-start">
                    <div className="text-sm text-slate-400">Arrival</div>
                    <div className="font-semibold text-2xl">
                      {getHourAndMinute(dataPayment?.flightData?.arrival?.time)}
                    </div>
                    <div className="text-sm text-slate-400">
                      {formatDate(dataPayment?.flightData?.arrival?.time)}
                    </div>
                    <div className="text-xs text-slate-400">
                      {dataPayment?.flightData?.arrival?.airportName}
                    </div>
                  </div>
                </div>
                {/* Akhir Info Keberangkatan dan Kedatangan */}
                {/* Awal Durasi */}
                <div className="flex justify-center items-center gap-2 w-full p-1 mt-3">
                  <FaRegClock className="text-xl " />
                  <div className=" text-sm">
                    {formatDuration(dataPayment?.flightData?.duration)}
                  </div>
                </div>
                {/* Akhir Durasi */}
              </div>
              {/* Akhir Flight Detail */}

              {/* Awal Passenger Detail */}
              <div className="bg-black/70 w-full h-fit p-4 rounded-xl flex flex-col gap-2 items-start justify-center">
                {/* Awal Judul Passenger Detail */}
                <div className="flex items-center gap-2 mb-5">
                  <GoPeople className="text-2xl" />
                  <div className="text-xl font-semibold">
                    Passenger(s) Detail
                  </div>
                </div>
                {/* Awal Mapping Card Passenger Detail */}
                {dataPayment?.passengerDetails?.map(
                  (el: PassengerDetails, i: number) => (
                    <CardPassengerDetail key={i} i={i} data={el} />
                  )
                )}
                {/* Akhir Mapping Card Passenger Detail */}
                {/* Akhir Judul Passenger Detail */}
              </div>
              {/* Akhir Passenger Detail */}

              {/* Awal Important Information */}
              <div className="w-full p-4 rounded-xl bg-black/50 flex flex-col gap-5 justify-center items-start text-blue-600 border border-blue-600">
                <div className="flex items-center gap-2">
                  <AiOutlineInfoCircle className="text-2xl" />
                  <div className="text-xl font-semibold">
                    Important Information
                  </div>
                </div>
                <div className="flex flex-col gap-2 justify-center items-start text-sm ">
                  <div>
                    • Your e-ticket will be sent to your email within 5–10
                    minutes
                  </div>
                  <div>
                    • Please arrive at the airport at least 2 hours before
                    departure
                  </div>
                  <div>
                    • Bring a valid identification document (ID card/Passport)
                  </div>
                  <div>
                    • Online check-in is available 24 hours before departure
                  </div>
                </div>
              </div>
              {/* Akhir Important Information */}
            </div>
            <div className="w-1/3 flex flex-col gap-4">
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
                    <div className="text-lg">{dataPayment?.orderId}</div>
                  </div>
                  <div className="flex flex-col justify-center items-start gap-1">
                    <div className="text-slate-400">Transaction ID</div>
                    <div className="text-lg">
                      {dataPayment?.completeData?.transaction_id}
                    </div>
                  </div>
                  <div className="border-[0.5px] border-slate-800 w-full"></div>
                  <div className="flex flex-col justify-center items-start gap-1">
                    <div className="text-slate-400">Payment Method</div>
                    <div className="text-lg">
                      {paymentTypeChanger(
                        dataPayment?.completeData?.payment_type
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col justify-center items-start gap-1">
                    <div className="text-slate-400">Total Payment</div>
                    <div className="text-green-400 text-lg">
                      {formatRupiah(dataPayment?.grossAmount)}
                    </div>
                  </div>

                  <div className="flex flex-col justify-center items-start gap-1">
                    <div className="text-slate-400">Settlement Time</div>
                    <div className="text-green-400 text-lg">
                      {formatDate(dataPayment?.completeData?.settlement_time)}{" "}
                      at{" "}
                      {getHourAndMinuteFromDate(
                        dataPayment?.completeData?.settlement_time
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {/* Akhir Booking Information */}
              {/* Awal 3 Button */}
              <div className="flex flex-col gap-2 w-full justify-center items-start">
                <div className="bg-black w-full p-3 flex justify-center items-center gap-2 rounded-xl hover:bg-green-800 cursor-pointer">
                  <FiDownload className="text-xl" />
                  <div className="text-sm">Download E-Ticket</div>
                </div>
                <div className="border border-slate-600 w-full flex justify-center items-center p-3 gap-2 rounded-xl hover:bg-green-800 hover:border-transparent cursor-pointer">
                  <MdMailOutline className="text-xl" />
                  <div className="text-sm">Resend Email</div>
                </div>
                <div className="border border-slate-600 w-full flex justify-center items-center p-3 gap-2 rounded-xl hover:bg-green-800 hover:border-transparent cursor-pointer">
                  <FaRegCalendarPlus className="text-xl" />
                  <div className="text-sm">Add to Calendar</div>
                </div>
              </div>
              {/* Akhir 3 Button */}
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
          </div>
          {/* Akhir Sisi Kiri dan Kanan */}
        </div>
      )}
    </>
  );
}

// {
//     "_id": "68a9675481835fbc5d7df665",
//     "orderId": "TVLKFLTSJ182202508232645",
//     "UserId": "6878ad465f1297aa559b872f",
//     "grossAmount": 1960000,
//     "serviceType": "flight",
//     "serviceDetails": {
//         "flightId": "689449ff68fa399516b20693",
//         "flightNumber": "SJ182",
//         "passengerCount": 2,
//         "cabinClass": "Economy"
//     },
//     "contactDetails": {
//         "contactDetailFirstName": "Muhammad Ridho",
//         "contactDetailLastName": "Amrullah",
//         "contactDetailMobileNumber": "085363508580",
//         "contactDetailEmail": "ridhoamrullah99@gmail.com"
//     },
//     "passengerDetails": [
//         {
//             "passengerDetailTitle": "Mr.",
//             "passengerDetailFirstName": "Muhammad Ridho",
//             "passengerDetailLastName": "Amrullah",
//             "passengerDetailDateOfBirth": "1999-10-10T00:00:00.000Z",
//             "passengerDetailNationality": "Indonesia"
//         },
//         {
//             "passengerDetailTitle": "Mrs.",
//             "passengerDetailFirstName": "Olivia",
//             "passengerDetailLastName": "Rodrigo",
//             "passengerDetailDateOfBirth": "2000-02-01T00:00:00.000Z",
//             "passengerDetailNationality": "United Kingdom"
//         }
//     ],
//     "transactionStatus": "capture",
//     "createdAt": "2025-08-23T07:01:40.638Z",
//     "updatedAt": "2025-08-23T07:02:24.724Z",
//     "fraudStatus": "accept",
//     "paymentType": "credit_card",
//     "transactionId": "6bb3cba8-0ea9-44f9-b65e-2a2279b4ba0d",
//     "transactionTime": "2025-08-23T07:02:10.000Z",
//     "flightData": {
//         "_id": "689449ff68fa399516b20693",
//         "flightNumber": "SJ182",
//         "airline": "Sriwijaya Air",
//         "aircraft": "Boeing 737-500",
//         "totalSeats": 109,
//         "departure": {
//             "airportCode": "CGK",
//             "airportName": "Soekarno-Hatta International Airport",
//             "city": "Jakarta",
//             "country": "Indonesia",
//             "terminal": "1B",
//             "gate": "D5",
//             "time": "2025-09-15T19:40:00.000Z",
//             "timezone": "Asia/Jakarta"
//         },
//         "arrival": {
//             "airportCode": "PNK",
//             "airportName": "Supadio Airport",
//             "city": "Pontianak",
//             "country": "Indonesia",
//             "terminal": "Domestic",
//             "gate": "2",
//             "time": "2025-09-15T21:25:00.000Z",
//             "timezone": "Asia/Jakarta"
//         },
//         "duration": 105,
//         "cabinClasses": [
//             {
//                 "class": "Economy",
//                 "price": 980000,
//                 "seatsAvailable": 109,
//                 "facilities": [
//                     "Snack",
//                     "Drink"
//                 ],
//                 "baggage": {
//                     "checked": "20kg",
//                     "cabin": "7kg"
//                 }
//             }
//         ],
//         "stops": [],
//         "deletedAt": null,
//         "UserId": "68888276782e842cd0e3e915"
//     }
// }
