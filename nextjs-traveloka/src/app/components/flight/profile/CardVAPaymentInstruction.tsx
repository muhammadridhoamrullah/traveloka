import toast from "react-hot-toast";
import { CiBank } from "react-icons/ci";
import { MdContentCopy } from "react-icons/md";

export default function CardVaPaymentInstruction() {
  const vaNumber = "8001234567890123"; //

  function handleCopy() {
    navigator.clipboard.writeText(vaNumber);
    toast.success("Virtual Account Number copied!");
  }
  return (
    <div className="bg-gray-200 w-full p-4 h-fit text-blue-700 rounded-xl flex flex-col gap-2 justify-center items-start">
      {/* Awal Nama Bank */}
      <div className="flex justify-start items-center gap-2 ">
        <CiBank className="text-3xl" />
        <div className="flex flex-col gap-1 justify-center items-start text-sm">
          <div className="font-bold">BANK BCA</div>
          <div className="text-xs">Virtual Account</div>
        </div>
      </div>
      {/* Akhir Nama Bank */}

      {/* Awal Nomor Virtual Account */}
      <div className="bg-white w-full h-fit p-2 rounded-md flex justify-between items-end">
        {/* Awal Nomor */}
        <div className="  h-full flex flex-col gap-2 justify-center items-start">
          <div className="text-sm text-blue-500">Virtual Account Number</div>
          <div className="text-xl font-semibold text-black">
            8001234567890123
          </div>
        </div>
        {/* Akhir Nomor */}
        {/* Awal Salin */}
        <div
          onClick={handleCopy}
          className="  flex justify-end items-center gap-1 text-black border border-slate-800 p-1 rounded-md cursor-pointer hover:bg-gray-200 font-semibold"
        >
          <MdContentCopy className="text-sm" />
          <div className="text-xs">Copy</div>
        </div>
        {/* Akhir Salin */}
      </div>
      {/* Akhir Nomor Virtual Account */}
    </div>
  );
}

// {
//     "_id": "68aac16cc4a09421c5a17f32",
//     "orderId": "TVLKFLTSJ182202508244552",
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
//         "contactDetailMobileNumber": "085363508580",
//         "contactDetailEmail": "ridhoamrullah99@gmail.com"
//     },
//     "passengerDetails": [
//         {
//             "passengerDetailTitle": "Mrs.",
//             "passengerDetailFirstName": "Olivia",
//             "passengerDetailLastName": "Rodrigo",
//             "passengerDetailDateOfBirth": "1999-10-10T00:00:00.000Z",
//             "passengerDetailNationality": "Indonesia"
//         }
//     ],
//     "transactionStatus": "pending",
//     "createdAt": "2025-08-24T07:38:20.679Z",
//     "updatedAt": "2025-08-24T07:38:35.214Z",
//     "fraudStatus": "accept",
//     "paymentType": "bank_transfer",
//     "transactionId": "18d91748-3304-42d5-89a1-fa55e84d3d5f",
//     "transactionTime": "2025-08-24T07:38:26.000Z",
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
