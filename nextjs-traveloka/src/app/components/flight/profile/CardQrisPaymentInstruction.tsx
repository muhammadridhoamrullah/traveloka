"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface Props {
  data: any;
}
export default function CardQrisPaymentInstruction({ data }: Props) {
  const [qrisUrl, setQrisUrl] = useState(null);

  async function fetchQris() {
    try {
      const response = await fetch(
        `http://localhost:3000/api/payment/qrisGenerator?transactionId=${data.completeData.transaction_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to fetch QRIS");
      }

      setQrisUrl(result.base64Image);
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
          text: "An unexpected error occurred during fetching QRIS.",
        });
      }
    }
  }

  useEffect(() => {
    fetchQris();
  }, []);

  return (
    <div className="w-full h-fit flex flex-col justify-center items-center gap-4">
      <div className="text-xl font-semibold">Please scan this QR Code </div>
      {data.completeData.transaction_status === "pending" ? (
        qrisUrl ? (
          <Image
            src={`data:image/png;base64,${qrisUrl}`}
            alt="QRIS Code"
            width={250}
            height={250}
            className="object-contain"
          />
        ) : (
          <AiOutlineLoading3Quarters className="animate-spin text-4xl" />
        )
      ) : null}
    </div>
  );
}

// {
//     "_id": "68ad5126a1df2a338a184b86",
//     "orderId": "TVLKFLTJT684202508263716",
//     "UserId": "6878ad465f1297aa559b872f",
//     "grossAmount": 850000,
//     "serviceType": "flight",
//     "serviceDetails": {
//         "flightId": "689ae7fa816e5cc195291ed9",
//         "flightNumber": "JT684",
//         "passengerCount": 1,
//         "cabinClass": "Economy"
//     },
//     "contactDetails": {
//         "contactDetailFirstName": "Olivia",
//         "contactDetailLastName": "Rodrigo",
//         "contactDetailMobileNumber": "085363546574",
//         "contactDetailEmail": "oliviarodrigo@gmail.com"
//     },
//     "passengerDetails": [
//         {
//             "passengerDetailTitle": "Ms.",
//             "passengerDetailFirstName": "Olivia",
//             "passengerDetailLastName": "Rodrigo",
//             "passengerDetailDateOfBirth": "2000-11-11T00:00:00.000Z",
//             "passengerDetailNationality": "United States"
//         }
//     ],
//     "createdAt": "2025-08-26T06:16:06.759Z",
//     "updatedAt": "2025-08-26T06:16:18.286Z",
//     "completeData": {
//         "status_code": "201",
//         "transaction_id": "27ff9927-6182-45f3-8f83-7802743c1557",
//         "gross_amount": "850000.00",
//         "currency": "IDR",
//         "order_id": "TVLKFLTJT684202508263716",
//         "payment_type": "qris",
//         "signature_key": "919a815cd88f366059b561c6f1658fd04c5e97c03b9cd99a56c2202a6bd9bb0e7784d14aee1129c30a342ddc1cd524e44ea5f6afe4fbf8b4848b6eb372375492",
//         "transaction_status": "pending",
//         "fraud_status": "accept",
//         "status_message": "Success, transaction is found",
//         "merchant_id": "G378340427",
//         "transaction_time": "2025-08-26 13:16:10",
//         "expiry_time": "2025-08-26 13:51:10"
//     },
//     "flightData": {
//         "_id": "689ae7fa816e5cc195291ed9",
//         "flightNumber": "JT684",
//         "airline": "Lion Air",
//         "aircraft": "Boeing 737-900ER",
//         "totalSeats": 207,
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
//                 "seatsAvailable": 207,
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
