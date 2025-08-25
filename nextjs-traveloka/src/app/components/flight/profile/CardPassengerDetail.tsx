import { PassengerDetails } from "@/db/type/payment";
import { getPassengerCategory } from "@/db/utils/helperFunctions";

interface Props {
  data: PassengerDetails;
  i: number;
}

export default function CardPassengerDetail({ data, i }: Props) {
  return (
    <div className=" w-full h-fit flex flex-col gap-2 items-start justify-center">
      <div className="flex justify-start items-end gap-2 ">
        <div className="text-gray-400">{i + 1}.</div>
        <div className="font-semibold text-xl">
          {data.passengerDetailTitle} {data.passengerDetailFirstName}{" "}
          {data.passengerDetailLastName}
        </div>
        <div className=" text-gray-500">
          - {data.passengerDetailNationality}
        </div>
      </div>
      <div className="text-gray-300 border border-gray-700 rounded-md p-2 w-fit">
        {getPassengerCategory(data.passengerDetailDateOfBirth)}
      </div>
      <div className="w-full border border-gray-700 mt-3"></div>
    </div>
  );
}

// "passengerDetailTitle": "Mrs.",
// //             "passengerDetailFirstName": "Olivia",
// //             "passengerDetailLastName": "Rodrigo",
// //             "passengerDetailDateOfBirth": "2000-02-01T00:00:00.000Z",
// //             "passengerDetailNationality": "United Kingdom"
