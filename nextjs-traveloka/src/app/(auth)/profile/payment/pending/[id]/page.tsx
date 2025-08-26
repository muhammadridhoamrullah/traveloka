"use client";

import { FaRegCreditCard } from "react-icons/fa6";
import { CiBank } from "react-icons/ci";
import { MdContentCopy, MdMailOutline } from "react-icons/md";
import { LuPlane } from "react-icons/lu";
import { GoPeople } from "react-icons/go";
import { TiDocumentText } from "react-icons/ti";
import { MdPhoneIphone } from "react-icons/md";
import { MdOutlinePayment } from "react-icons/md";
import { RiCustomerService2Line } from "react-icons/ri";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { TiWarningOutline } from "react-icons/ti";

import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import { FaRegCalendarPlus, FaRegClock } from "react-icons/fa";
import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Swal from "sweetalert2";
import {
  formatDate,
  formatDuration,
  formatRupiah,
  getCountDown,
  getHourAndMinute,
  paymentTypeChanger,
} from "@/db/utils/helperFunctions";
import { PassengerDetails } from "@/db/type/payment";
import CardPassengerDetail from "@/app/components/flight/profile/CardPassengerDetail";
import Loading from "./loading";
import CardVaPaymentInstruction from "@/app/components/flight/profile/CardVAPaymentInstruction";
import { CountdownDisplay } from "@/app/components/flight/profile/CountDown";
import CoundtDownReact from "@/app/components/flight/profile/CountDownReact";
import CardQrisPaymentInstruction from "@/app/components/flight/profile/CardQrisPaymentInstruction";

export default function PendingPayment() {
  const navigate = useRouter();
  const params = useParams();
  const [dataPayment, setDataPayment] = useState({} as any);

  const [loading, setLoading] = useState(true);
  const apiUrl = process.env.NEXT_PUBLIC_CLIENT_URL;
  const paymentId = params.id;
  const [hasExpired, setHasExpired] = useState(false);

  const [isPolling, setIsPolling] = useState(false);
  const [lastPolled, setLastPolled] = useState<Date | null>(null);

  // JALAN KEDUA
  async function fetchPaymentByOrderId() {
    try {
      console.log("Jalan ketika expired");

      setLoading(true);
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

      const status = result.findPaymentById?.completeData?.transaction_status;
      console.log(status, "status terbaru");
      if (status === "expire") {
        Swal.fire({
          icon: "error",
          title: "Payment Expired",
          text: "Your payment has expired. Please make a new booking.",
          timer: 2000,
        });
        navigate.push(`/profile/payment/expired/${paymentId}`);
        return;
      } else if (
        status === "settlement" ||
        status === "capture" ||
        status === "success"
      ) {
        Swal.fire({
          icon: "success",
          title: "Payment Successful",
          text: "Your payment was successful. Thank you!",
          timer: 2000,
        });
        navigate.push(`/profile/payment/success/${paymentId}`);
        return;
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
    } finally {
      setLoading(false);
    }
  }

  async function whenExpire() {
    try {
      const response = await fetch(
        `${apiUrl}/api/payment/checkStatus/${paymentId}`
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to check payment status");
      }

      // Fetch ulang data payment
      fetchPaymentByOrderId();

      // Alert
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

  // useEffect untuk fetch data payment by orderId
  // INI JALAN PERTAMA
  useEffect(() => {
    console.log("ke trigger");

    fetchPaymentByOrderId();
  }, [paymentId]);

  function handleExpire() {
    console.log(hasExpired, "kondisi");

    if (hasExpired) return;
    console.log("Jalan ketika has expired");
    setHasExpired(true);
    whenExpire();
  }

  // useEffect yang dijalankan setiap 20 detik
  useEffect(() => {
    if (dataPayment?.completeData?.transaction_status !== "pending") return;
    console.log("JALAN 20 DETIK");

    setIsPolling(true);

    const pollInterval = setInterval(async () => {
      try {
        setLastPolled(new Date());
        const response = await fetch(
          `${apiUrl}/api/payment/checkStatus/${paymentId}`
        );

        const result = await response.json();
        console.log(result, "pol");

        if (!response.ok) {
          throw new Error(result.message || "Failed to check payment status");
        }
        console.log(result.data.transaction_status, "status poling");

        if (result.data.transaction_status !== "pending") {
          fetchPaymentByOrderId();
          setIsPolling(false);
          clearInterval(pollInterval);
        }
      } catch (error) {
        console.error("Polling error:", error);
      }
    }, 20000);

    return () => {
      console.log("Stop polling woi");

      clearInterval(pollInterval);
      setIsPolling(false);
    };
  }, [dataPayment?.completeData?.transaction_status, paymentId]);

  if (loading) {
    return <Loading />;
  }

  function renderCardPaymentInstruction() {
    switch (dataPayment?.completeData?.payment_type) {
      case "bank_transfer":
        return <CardVaPaymentInstruction data={dataPayment} />;
      case "qris":
        return <CardQrisPaymentInstruction data={dataPayment} />;
      // case "cstore":
      //   return <div>Ini Alfamart/Indomaret cuy</div>;
      // case "echannel":
      //   return <div>Ini Mandiri Bill Payment cuy</div>;
    }
  }

  return (
    <div className="bg-blue-950 w-full min-h-screen pt-36 px-20 pb-5 flex flex-col justify-start items-center text-white gap-6">
      <Toaster position="top-center" reverseOrder={false} />
      {/* Awal Payment Pending */}
      <div className="flex flex-col items-center gap-2">
        <Image
          src={"/payment/iconPendingPayment.png"}
          height={100}
          width={100}
          alt="Logo Pending"
        />
        <div className="font-bold text-3xl">
          Waiting For Payment {dataPayment?.completeData?.transaction_status}
        </div>
        <div className="text-sm text-slate-400">
          Your booking has been created. Please complete the payment before the
          deadline.
        </div>
      </div>
      {/* Akhir Payment Pending */}

      {/* Awal Remaining Payment Time */}
      <CoundtDownReact
        expiryTime={dataPayment?.completeData?.expiry_time}
        onExpire={handleExpire}
      />
      {/* Akhir Remaining Payment Time */}

      {/* Awal Sisi Kiri dan Kanan */}
      <div className="flex justify-between items-start w-3/4 gap-6">
        {/* Awal Kiri */}
        <div className=" w-2/3 flex flex-col gap-4">
          {/* Awal Payment Instructions */}
          <div className="bg-black/70 w-full h-fit p-4 flex flex-col gap-2 rounded-xl justify-center items-start">
            {/* Awal Judul Payment Instructions */}
            <div className="flex items-center gap-2 mb-5">
              <FaRegCreditCard className="text-2xl" />
              <div className="text-xl font-semibold">Payment Instructions</div>
            </div>
            {/* Akhir Judul Payment Instructions */}

            {/* Awal Component Payment Type */}

            {renderCardPaymentInstruction()}
            {/* Akhir Component Payment Type */}
          </div>
          {/* Akhir Payment instructions */}

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
                  GA 512 - Boeing 737-900 ER
                  {dataPayment?.flightData?.flightNumber} -{" "}
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
                  {getHourAndMinute(dataPayment?.flightData?.departure?.time)}
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
          {/* Awal Passengers Detail */}
          <div className="bg-black/70 w-full h-fit p-4 rounded-xl flex flex-col gap-2 items-start justify-center">
            {/* Awal Judul Passengers Detail */}
            <div className="flex items-center gap-2 mb-5">
              <GoPeople className="text-2xl" />
              <div className="text-xl font-semibold">Passenger(s) Detail</div>
            </div>
            {/* Akhir Judul Passengers Detail */}

            {/* Awal Mapping Passengers Detail */}
            {dataPayment?.passengerDetails?.map(
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
              <div className="text-xl font-semibold">Booking Information</div>
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
                <div className="text-lg flex justify-start items-center gap-2 ">
                  <div>
                    {paymentTypeChanger(
                      dataPayment?.completeData?.payment_type
                    )}{" "}
                  </div>
                  {dataPayment?.completeData?.va_numbers && (
                    <div className="uppercase">
                      {`- VA ${dataPayment?.completeData?.va_numbers[0]?.bank}`}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col justify-center items-start gap-1">
                <div className="text-slate-400">Total Payment</div>
                <div className="text-green-400 text-lg">
                  {formatRupiah(dataPayment?.grossAmount)}
                </div>
              </div>
            </div>
          </div>
          {/* Akhir Booking Information */}
          {/* Awal 3 Button */}
          <div className="flex flex-col gap-2 w-full justify-center items-start">
            <div className="bg-black w-full p-3 flex justify-center items-center gap-2 rounded-xl hover:bg-green-800 cursor-pointer">
              <MdPhoneIphone className="text-xl" />
              <div className="text-sm">Check Payment Status</div>
            </div>
            <div className="border border-slate-600 w-full flex justify-center items-center p-3 gap-2 rounded-xl hover:bg-green-800 hover:border-transparent cursor-pointer">
              <MdMailOutline className="text-xl" />
              <div className="text-sm">Change Payment Method</div>
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
          {/* Awal Important Information */}
          <div className="w-full p-4 rounded-xl bg-black/50 flex flex-col gap-5 justify-center items-start text-blue-600 border border-blue-600">
            <div className="flex items-center gap-2 bg">
              <AiOutlineInfoCircle className="text-2xl" />
              <div className="text-xl font-semibold">Important Notes</div>
            </div>
            <div className="flex flex-col gap-3 justify-center items-start text-xs ">
              <div>• Payment will be verified automatically</div>
              <div>• E-Ticket will be sent after the payment is successful</div>
              <div>
                • Booking will be canceled if the payment deadline is exceeded
              </div>
              <div>• Keep your booking ID for reference</div>
            </div>
          </div>
          {/* Akhir Important Information */}
        </div>
        {/* Akhir Kanan */}
      </div>
      {/* Akhir Sisi Kiri dan Kanan */}
    </div>
  );
}

// BCA PENDING SANGAT TERBARU 25 AGUSTUS 2025 - 20:02
// {
//     "_id": "68ac5d526aa39217aa130987",
//     "orderId": "TVLKFLTGA147202508256118",
//     "UserId": "6878ad465f1297aa559b872f",
//     "grossAmount": 2500000,
//     "serviceType": "flight",
//     "serviceDetails": {
//         "flightId": "689ae790816e5cc195291ed7",
//         "flightNumber": "GA147",
//         "passengerCount": 2,
//         "cabinClass": "Economy"
//     },
//     "contactDetails": {
//         "contactDetailFirstName": "Muhammad Ridho",
//         "contactDetailLastName": "Amrullah",
//         "contactDetailMobileNumber": "085363534657",
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
//             "passengerDetailDateOfBirth": "1999-10-11T00:00:00.000Z",
//             "passengerDetailNationality": "United States"
//         }
//     ],
//     "createdAt": "2025-08-25T12:55:46.827Z",
//     "updatedAt": "2025-08-25T12:56:08.596Z",
//     "completeData": {
//         "status_code": "201",
//         "transaction_id": "cd3611b0-1ac9-41d3-a564-530d7662f950",
//         "gross_amount": "2500000.00",
//         "currency": "IDR",
//         "order_id": "TVLKFLTGA147202508256118",
//         "payment_type": "bank_transfer",
//         "signature_key": "d6d65779a5ddd8414161d3d3f09660cc6e1d84d5e95702762288406a4434b168d7b6455895e76c834fa4848b011378242d0875f219441e92eba4cdcc16a7981e",
//         "transaction_status": "pending",
//         "fraud_status": "accept",
//         "status_message": "Success, transaction is found",
//         "merchant_id": "G378340427",
//         "va_numbers": [
//             {
//                 "bank": "bca",
//                 "va_number": "40427803028184533761012"
//             }
//         ],
//         "payment_amounts": [],
//         "transaction_time": "2025-08-25 19:55:59",
//         "expiry_time": "2025-08-26 19:55:59"
//     },
//     "flightData": {
//         "_id": "689ae790816e5cc195291ed7",
//         "flightNumber": "GA147",
//         "airline": "Garuda Indonesia",
//         "aircraft": "Boeing 737-800",
//         "totalSeats": 162,
//         "departure": {
//             "airportCode": "PKU",
//             "airportName": "Sultan Syarif Kasim II International Airport",
//             "city": "Pekanbaru",
//             "country": "Indonesia",
//             "terminal": "A",
//             "gate": "3",
//             "time": "2025-09-15T08:30:00.000Z",
//             "timezone": "Asia/Jakarta"
//         },
//         "arrival": {
//             "airportCode": "CGK",
//             "airportName": "Soekarno-Hatta International Airport",
//             "city": "Jakarta",
//             "country": "Indonesia",
//             "terminal": "3",
//             "gate": "E4",
//             "time": "2025-09-15T10:05:00.000Z",
//             "timezone": "Asia/Jakarta"
//         },
//         "duration": 95,
//         "cabinClasses": [
//             {
//                 "class": "Economy",
//                 "price": 1250000,
//                 "seatsAvailable": 162,
//                 "facilities": [
//                     "Snack",
//                     "Drink",
//                     "In-flight Entertainment"
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
//     "_id": "68a9734adeb1c6c13afa8742",
//     "orderId": "TVLKFLTSJ182202508236376",
//     "UserId": "6878ad465f1297aa559b872f",
//     "grossAmount": 980000,
//     "serviceType": "flight",
//     "serviceDetails": {
//         "flightId": "689449ff68fa399516b20693",
//         "flightNumber": "SJ182",
//         "passengerCount": 1,
//         "cabinClass": "Economy"
//     },
//     "contactDetails": {
//         "contactDetailFirstName": "Muhammad Ridho",
//         "contactDetailLastName": "Amrullah",
//         "contactDetailMobileNumber": "085363465746",
//         "contactDetailEmail": "ridhoamrullah99@gmail.com"
//     },
//     "passengerDetails": [
//         {
//             "passengerDetailTitle": "Ms.",
//             "passengerDetailFirstName": "Kim",
//             "passengerDetailLastName": "Minji",
//             "passengerDetailDateOfBirth": "2000-05-10T00:00:00.000Z",
//             "passengerDetailNationality": "Indonesia"
//         }
//     ],
//     "transactionStatus": "pending",
//     "createdAt": "2025-08-23T07:52:42.597Z",
//     "updatedAt": "2025-08-23T07:52:42.597Z",
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

// BCA VIRTUAL PENDING TERBARU
// {
//     "_id": "68ac1d485a3961cb46fedae3",
//     "orderId": "TVLKFLTGA147202508255859",
//     "UserId": "6878ad465f1297aa559b872f",
//     "grossAmount": 1250000,
//     "serviceType": "flight",
//     "serviceDetails": {
//         "flightId": "689ae790816e5cc195291ed7",
//         "flightNumber": "GA147",
//         "passengerCount": 1,
//         "cabinClass": "Economy"
//     },
//     "contactDetails": {
//         "contactDetailFirstName": "Muhammad Ridho",
//         "contactDetailLastName": "Amrullah",
//         "contactDetailMobileNumber": "085363508580",
//         "contactDetailEmail": "daniellemarsh@gmail.com"
//     },
//     "passengerDetails": [
//         {
//             "passengerDetailTitle": "Mr.",
//             "passengerDetailFirstName": "Muhammad Ridho",
//             "passengerDetailLastName": "Amrullah",
//             "passengerDetailDateOfBirth": "2222-11-11T00:00:00.000Z",
//             "passengerDetailNationality": "Indonesia"
//         }
//     ],
//     "createdAt": "2025-08-25T08:22:32.714Z",
//     "updatedAt": "2025-08-25T08:22:54.329Z",
//     "completeData": {
//         "status_code": "201",
//         "transaction_id": "cb5e7160-b33e-49b2-b6e6-e2961b81a5d2",
//         "gross_amount": "1250000.00",
//         "currency": "IDR",
//         "order_id": "TVLKFLTGA147202508255859",
//         "payment_type": "bank_transfer",
//         "signature_key": "2b99e143597f75da48442875d0bc9ed2039787f3824d271816c0efda0dd89066e53203eeb6363effee292aca499c696d4ceb52ced5cac545cdbd03caee71ca6a",
//         "transaction_status": "pending",
//         "fraud_status": "accept",
//         "status_message": "Success, transaction is found",
//         "merchant_id": "G378340427",
//         "va_numbers": [
//             {
//                 "bank": "bca",
//                 "va_number": "40427079860448812137821"
//             }
//         ],
//         "payment_amounts": [],
//         "transaction_time": "2025-08-25 15:22:41",
//         "expiry_time": "2025-08-26 15:22:41"
//     },
//     "flightData": {
//         "_id": "689ae790816e5cc195291ed7",
//         "flightNumber": "GA147",
//         "airline": "Garuda Indonesia",
//         "aircraft": "Boeing 737-800",
//         "totalSeats": 162,
//         "departure": {
//             "airportCode": "PKU",
//             "airportName": "Sultan Syarif Kasim II International Airport",
//             "city": "Pekanbaru",
//             "country": "Indonesia",
//             "terminal": "A",
//             "gate": "3",
//             "time": "2025-09-15T08:30:00.000Z",
//             "timezone": "Asia/Jakarta"
//         },
//         "arrival": {
//             "airportCode": "CGK",
//             "airportName": "Soekarno-Hatta International Airport",
//             "city": "Jakarta",
//             "country": "Indonesia",
//             "terminal": "3",
//             "gate": "E4",
//             "time": "2025-09-15T10:05:00.000Z",
//             "timezone": "Asia/Jakarta"
//         },
//         "duration": 95,
//         "cabinClasses": [
//             {
//                 "class": "Economy",
//                 "price": 1250000,
//                 "seatsAvailable": 162,
//                 "facilities": [
//                     "Snack",
//                     "Drink",
//                     "In-flight Entertainment"
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
// Awal Payment Remaining
// {dataPayment?.completeData?.expiry_time && (
//         <Countdown
//           date={new Date(dataPayment.completeData.expiry_time)}
//           renderer={countdownRenderer}
//           onComplete={() => {
//             // Handle ketika countdown selesai
//             console.log("Payment expired!");
//             // Bisa redirect ke halaman expired atau show modal
//             Swal.fire({
//               icon: "warning",
//               title: "Payment Expired",
//               text: "Your payment time has expired. Please create a new booking.",
//             });
//           }}
//           precision={1000}
//           autoStart={true}
//           controlled={false}
//         />
//       )}
// Tambahkan function untuk custom rendering
// const countdownRenderer = ({
//   hours,
//   minutes,
//   seconds,
//   completed,
// }: {
//   hours: number;
//   minutes: number;
//   seconds: number;
//   completed: boolean;
// }) => {
//   if (completed) {
//     // Countdown selesai - handle expiry
//     return <div className="text-red-500 font-bold">Payment Expired!</div>;
//   } else {
//     // Render countdown dengan style yang sama seperti existing
//     return (
//       <div className="flex justify-start items-center gap-3">
//         {/* Hour */}
//         <div className="flex flex-col justify-center items-center rounded-lg border border-gray-500 p-2">
//           <div className="text-3xl font-bold">
//             {String(hours).padStart(2, "0")}
//           </div>
//           <div className="text-sm">Hour</div>
//         </div>
//         <div>:</div>

//         {/* Minutes */}
//         <div className="flex flex-col justify-center items-center rounded-lg border border-gray-500 p-2">
//           <div className="text-3xl font-bold">
//             {String(minutes).padStart(2, "0")}
//           </div>
//           <div className="text-sm">Minutes</div>
//         </div>
//         <div>:</div>

//         {/* Seconds */}
//         <div className="flex flex-col justify-center items-center rounded-lg border border-gray-500 p-2">
//           <div className="text-3xl font-bold">
//             {String(seconds).padStart(2, "0")}
//           </div>
//           <div className="text-sm">Seconds</div>
//         </div>
//       </div>
//     );
//   }
// };
