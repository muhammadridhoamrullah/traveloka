import { formatRupiah } from "@/db/utils/helperFunctions";
import toast from "react-hot-toast";
import { CiBank } from "react-icons/ci";
import { MdContentCopy } from "react-icons/md";

interface Props {
  data: any;
}

export default function CardVaPaymentInstruction({ data }: Props) {
  console.log("data di Card Va", data);

  const bank = data?.completeData?.va_numbers[0].bank;
  const vaNumber = data?.completeData?.va_numbers[0].va_number;

  function handleCopy() {
    navigator.clipboard.writeText(vaNumber);
    toast.success("Virtual Account Number copied!");
  }
  return (
    <>
      <div className="bg-gray-200 w-full p-4 h-fit text-blue-700 rounded-xl flex flex-col gap-2 justify-center items-start">
        <div className="flex justify-start items-center gap-2 ">
          <CiBank className="text-3xl" />
          <div className="flex flex-col gap-1 justify-center items-start text-sm">
            <div className="font-bold">
              BANK <span className="uppercase">{bank}</span>
            </div>
            <div className="text-xs">Virtual Account</div>
          </div>
        </div>

        <div className="bg-white w-full h-fit p-2 rounded-md flex justify-between items-end">
          {/* Awal Nomor */}
          <div className="  h-full flex flex-col gap-2 justify-center items-start">
            <div className="text-sm text-blue-500">Virtual Account Number</div>
            <div className="text-xl font-semibold text-black">{vaNumber}</div>
          </div>

          <div
            onClick={handleCopy}
            className="  flex justify-end items-center gap-1 text-black border border-slate-800 p-1 rounded-md cursor-pointer hover:bg-gray-200 font-semibold"
          >
            <MdContentCopy className="text-sm" />
            <div className="text-xs">Copy</div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 justify-center items-start">
        <div className="font-semibold">How to Pay</div>
        <div className="flex justify-start items-center gap-4 text-sm">
          <div className="bg-slate-500 w-6 h-6 rounded-full flex justify-center items-center">
            1
          </div>
          <div className="text-slate-300">
            Open <span className="uppercase">{bank}</span> mobile banking app or
            internet banking.
          </div>
        </div>
        <div className="flex justify-start items-center gap-4 text-sm">
          <div className="bg-slate-500 w-6 h-6 rounded-full flex justify-center items-center">
            2
          </div>
          <div className="text-slate-300">Select Transfer or Payment menu.</div>
        </div>
        <div className="flex justify-start items-center gap-4 text-sm">
          <div className="bg-slate-500 w-6 h-6 rounded-full flex justify-center items-center">
            3
          </div>
          <div className="text-slate-300">
            Enter Virtual Account number: {vaNumber}
          </div>
        </div>
        <div className="flex justify-start items-center gap-4 text-sm">
          <div className="bg-slate-500 w-6 h-6 rounded-full flex justify-center items-center">
            4
          </div>
          <div className="text-slate-300">
            Enter payment amount: <span>{formatRupiah(data?.grossAmount)}</span>
          </div>
        </div>
        <div className="flex justify-start items-center gap-4 text-sm">
          <div className="bg-slate-500 w-6 h-6 rounded-full flex justify-center items-center">
            5
          </div>
          <div className="text-slate-300">
            Confirm and complete the payment.
          </div>
        </div>
      </div>
    </>
  );
}

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
