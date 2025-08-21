"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
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

export default function SuccessPayment() {
  const params = useParams();
  const apiUrl = process.env.NEXT_PUBLIC_CLIENT_URL;
  const paymentId = params.id;
  const [dataPayment, setDataPayment] = useState(null);
  console.log("Data Payment:", dataPayment);

  // fetch data payment by ID
  async function fetchPaymentByOrderId() {
    try {
      const response = await fetch(`${apiUrl}/api/payment/${paymentId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to fetch payment data");
      }

      setDataPayment(result.findPaymentById);
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
    }
  }

  useEffect(() => {
    if (paymentId) {
      fetchPaymentByOrderId();
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Payment ID is required",
      });
    }
  }, [paymentId]);

  return (
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
          Your ticket has been successfully purchased. The E-Ticket will be sent
          to your email very soon.
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
                <div className="font-semibold text-xl">Garuda Indonesia</div>
                <div className="text-sm text-slate-400">
                  GA 512 - Boeing 737-900 ER
                </div>
              </div>
              <div className="py-1 px-2 border border-white rounded-md text-sm">
                Economy
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
                <div className="font-semibold text-xl">Jam</div>
                <div className="text-sm text-slate-400">
                  Tanggal, Bulan, Tahun
                </div>
                <div className="text-xs text-slate-400">
                  Soekarno-Hatta International Airport
                </div>
              </div>
              <div className=" w-full flex flex-col gap-2 justify-center items-start">
                <div className="text-sm text-slate-400">Arrival</div>
                <div className="font-semibold text-xl">Jam</div>
                <div className="text-sm text-slate-400">
                  Tanggal, Bulan, Tahun
                </div>
                <div className="text-xs text-slate-400">
                  Ngurah Rai International Airport
                </div>
              </div>
            </div>
            {/* Akhir Info Keberangkatan dan Kedatangan */}
            {/* Awal Durasi */}
            <div className="flex justify-center items-center gap-2 w-full p-1 mt-3">
              <FaRegClock className="text-xl " />
              <div className=" text-sm">Durasi</div>
            </div>
            {/* Akhir Durasi */}
          </div>
          {/* Akhir Flight Detail */}

          {/* Awal Passenger Detail */}
          <div className="w-full bg-red-950">Passenger Detail</div>
          {/* Akhir Passenger Detail */}

          {/* Awal Important Information */}
          <div className="w-full p-4 rounded-xl bg-black/50 flex flex-col gap-5 justify-center items-start text-blue-600 border border-blue-600">
            <div className="flex items-center gap-2">
              <AiOutlineInfoCircle className="text-2xl" />
              <div className="text-xl font-semibold">Important Information</div>
            </div>
            <div className="flex flex-col gap-2 justify-center items-start text-sm ">
              <div>
                • Your e-ticket will be sent to your email within 5–10 minutes
              </div>
              <div>
                • Please arrive at the airport at least 2 hours before departure
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
              <div className="text-xl font-semibold">Booking Information</div>
            </div>
            <div className="flex w-full flex-col gap-2 items-start justify-center text-sm">
              <div className="flex flex-col justify-center items-start gap-1">
                <div className="text-slate-400">Booking ID</div>
                <div className="text-lg">TVLKFLT20250810293293</div>
              </div>
              <div className="flex flex-col justify-center items-start gap-1">
                <div className="text-slate-400">Transaction ID</div>
                <div className="text-lg">TVLKFLT20250810293293</div>
              </div>
              <div className="border-[0.5px] border-slate-800 w-full"></div>
              <div className="flex flex-col justify-center items-start gap-1">
                <div className="text-slate-400">Payment Method</div>
                <div className="text-lg">QRIS</div>
              </div>
              <div className="flex flex-col justify-center items-start gap-1">
                <div className="text-slate-400">Total Payment</div>
                <div className="text-green-400 text-lg">Rp. 25.000.000</div>
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
  );
}

// {
//     "_id": "68a426fe0e2b085c7b6a5f64",
//     "orderId": "TVLKFLTJT684202508199595",
//     "UserId": "6878ad465f1297aa559b872f",
//     "grossAmount": 3400000,
//     "serviceType": "flight",
//     "serviceDetails": {
//         "flightId": "689ae7fa816e5cc195291ed9",
//         "flightNumber": "JT684",
//         "passengerCount": 4,
//         "cabinClass": "Economy"
//     },
//     "transactionStatus": "capture",
//     "createdAt": "2025-08-19T07:25:50.466Z",
//     "updatedAt": "2025-08-19T07:26:19.090Z",
//     "fraudStatus": "accept",
//     "paymentType": "credit_card",
//     "transactionId": "072ae76a-d9ed-48d7-9b14-6b2e09534538",
//     "transactionTime": "2025-08-19T07:26:10.000Z",
//     "flightData": {
//         "_id": "689ae7fa816e5cc195291ed9",
//         "flightNumber": "JT684",
//         "airline": "Lion Air",
//         "aircraft": "Boeing 737-900ER",
//         "totalSeats": 211,
//         "departure": {
//             "airportCode": "CGK",
//             "airportName": "Soekarno-Hatta International Airport",
//             "city": "Jakarta",
//             "country": "Indonesia",
//             "terminal": "1C",
//             "gate": "C2",
//             "time": "2025-09-15T13:10:00.000Z",
//             "timezone": "Asia/Jakarta"
//         },
//         "arrival": {
//             "airportCode": "PNK",
//             "airportName": "Supadio Airport",
//             "city": "Pontianak",
//             "country": "Indonesia",
//             "terminal": "Domestic",
//             "gate": "1",
//             "time": "2025-09-15T14:55:00.000Z",
//             "timezone": "Asia/Jakarta"
//         },
//         "duration": 105,
//         "cabinClasses": [
//             {
//                 "class": "Economy",
//                 "price": 850000,
//                 "seatsAvailable": 211,
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

// {/* Conditional rendering dengan error handling */}
// {dataPayment ? (
//   dataPayment.serviceDetails?.passengerCount > 0 ? (
//     <div className="w-full flex flex-col gap-3">
//       {Array.from(
//         { length: dataPayment.serviceDetails.passengerCount }, 
//         (_, index) => index + 1
//       ).map((passengerNumber) => (
//         <div key={passengerNumber} className="bg-black/70 w-full p-4 rounded-xl">
//           {/* Passenger content */}
//         </div>
//       ))}
//     </div>
//   ) : (
//     <div className="text-slate-400">No passengers found</div>
//   )
// ) : (
//   <div className="text-slate-400">Loading passenger data...</div>
// )}