import CardResultSearchFlight from "@/app/components/flight/CardResultSearchFlight";
import { Flight } from "@/db/type/flight";
import { formatDate, formatRupiah } from "@/db/utils/helperFunctions";
import { get } from "http";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { useSearchParams } from "next/navigation";
import { FaArrowRight } from "react-icons/fa";

interface Props {
  searchParams: {
    departureAirport: string;
    arrivalAirport: string;
    departureTime: string;
    cabinClass: string;
    passengerCount: number;
  };
}

interface FlightStats {
  lowestFlight: string;
  lowestPrice: number;
  shortestFlight: number;
  shortestFlightNumber: string;
}

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const params = await searchParams;

  return {
    title: `Flight Search: ${params.departureAirport} to ${params.arrivalAirport} - Traveloka`,
    description: `Find flights from ${params.departureAirport} to ${params.arrivalAirport} on ${params.departureTime}. Compare prices and book with Traveloka.`,
    icons: {
      icon: "/traveloka_logo.png",
    },
  };
}

async function fetchResultSearchFlight(params: Props["searchParams"]) {
  const cookiesStore = await cookies();

  const queryParams = new URLSearchParams({
    departureAirport: params.departureAirport,
    arrivalAirport: params.arrivalAirport,
    departureTime: params.departureTime,
    cabinClass: params.cabinClass,
    passengerCount: params.passengerCount.toString(),
  });

  const apiUrl = process.env.NEXT_PUBLIC_CLIENT_URL;

  const response = await fetch(
    `${apiUrl}/api/flights/search?${queryParams.toString()}`,
    {
      method: "GET",
      headers: {
        Cookie: cookiesStore.toString(),
      },
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to fetch flight data");
  }

  return result;
}

async function getLowestPriceAndShortestFlight(dataFlight: {
  flights: Flight[];
}) {
  if (!dataFlight || dataFlight.flights.length === 0) {
    console.log("ini jalan error");
    return {
      lowestFlight: null,
      lowestPrice: 0,
      shortestFlight: null,
      shortestFlightNumber: null,
    };
  }
  let lowestPrice = Infinity;
  let lowestFlight = null;
  let shortestFlight = Infinity;
  let shortestFlightNumber = null;

  dataFlight.flights.forEach((flight) => {
    flight.cabinClasses.forEach((cabinClass) => {
      if (cabinClass.price < lowestPrice) {
        lowestPrice = cabinClass.price;
        lowestFlight = flight.flightNumber;
      }
    });
    if (flight.duration < shortestFlight) {
      shortestFlight = flight.duration;
      shortestFlightNumber = flight.flightNumber;
    }
  });

  return { lowestFlight, lowestPrice, shortestFlight, shortestFlightNumber };
}

export default async function SearchFlightsPage({ searchParams }: Props) {
  const params = await searchParams;

  const query = {
    departureAirport: params.departureAirport,
    arrivalAirport: params.arrivalAirport,
    departureTime: new Date(params.departureTime),
    cabinClass: params.cabinClass,
    passengerCount: params.passengerCount,
  };

  const data = (await fetchResultSearchFlight(params)) as {
    flights: Flight[];
  };
  console.log("Data fetched:", data);

  const flightData = (await getLowestPriceAndShortestFlight(
    data
  )) as unknown as FlightStats;
  // bg-[#F7F9FA]
  return (
    <div className="bg-blue-950 w-full min-h-screen pt-36 px-20 pb-5 text-black flex justify-between items-start gap-2">
      {/* Awal Filter */}
      <div className="bg-amber-300 w-1/3 h-full">Filter</div>
      {/* Akhir Filter */}

      {/* Awal Search Result & All Flights */}
      <div className=" w-2/3 h-full flex flex-col gap-2">
        {/* Awal Search Result */}
        <div className="flex flex-col">
          {/* Awal Search Result */}
          <div className="bg-black/70 py-2 px-3 rounded-t-xl flex flex-col gap-2 text-white">
            <div className="font-semibold text-xl  flex items-center justify-between">
              <div className="text-2xl">{params.departureAirport}</div>
              <FaArrowRight className="text-2xl" />
              <div className="text-2xl">{params.arrivalAirport}</div>
            </div>
            <div className="border border-slate-500"></div>
            <div className=" flex items-center gap-2 ">
              <div>{formatDate(params.departureTime)}</div>
              <div>|</div>
              <div>{params.passengerCount} passenger(s)</div>
              <div>|</div>
              <div>{params.cabinClass}</div>
            </div>
          </div>
          {/* Akhir Search Result */}

          {/* Awal Lowest Price dll */}
          <div className="bg-white py-2 px-3 h-24 flex justify-between items-center rounded-b-xl shadow-lg font-semibold">
            <div className="flex flex-col gap-1  h-full justify-between items-start">
              <div className="text-[#0194F3]">Lowest Price</div>
              <div className="flex flex-col">
                <div className="text-[#707577]">
                  {formatRupiah(flightData.lowestPrice)}
                </div>
                <div className="text-xs text-[#707577]">
                  {flightData.lowestFlight}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1  h-full justify-between items-start">
              <div className="text-[#0194F3]">Shortest Flight</div>
              <div className="flex flex-col">
                <div className="text-[#707577]">
                  {flightData.shortestFlight} minutes
                </div>
                <div className="text-xs text-[#707577]">
                  {flightData.shortestFlightNumber}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1  h-full justify-between items-start">
              <div className="text-[#0194F3]">Total Flights</div>
              <div className="text-[#707577]">
                {data.flights.length}{" "}
                {data.flights.length > 1 ? "flights" : "flight"}
              </div>
            </div>
          </div>
          {/* Akhir Lowest Price dll */}
        </div>
        {/* Akhir Search Result */}

        {/* Awal All Flights */}
        <div className="text-white font-bold text-2xl">All Flight</div>
        {data.flights.length > 0 ? (
          <div className=" flex flex-col gap-3 w-full h-full">
            {data.flights.map((el, index) => (
              <CardResultSearchFlight key={index} data={el} query={query} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full gap-4">
            <h1 className="text-white text-2xl font-semibold">
              No flights found
            </h1>
            <p className="text-white text-lg">
              Please try different search criteria.
            </p>
          </div>
        )}

        {/* Akhir All Flights */}
      </div>
      {/* Akhir Search Result & All Flights */}
    </div>
  );
}

// {
//     "flights": [
//         {
//             "_id": "689ae7fa816e5cc195291ed9",
//             "flightNumber": "JT684",
//             "airline": "Lion Air",
//             "aircraft": "Boeing 737-900ER",
//             "totalSeats": 215,
//             "departure": {
//                 "airportCode": "CGK",
//                 "airportName": "Soekarno-Hatta International Airport",
//                 "city": "Jakarta",
//                 "country": "Indonesia",
//                 "terminal": "1C",
//                 "gate": "C2",
//                 "time": "2025-09-15T13:10:00.000Z",
//                 "timezone": "Asia/Jakarta"
//             },
//             "arrival": {
//                 "airportCode": "PNK",
//                 "airportName": "Supadio Airport",
//                 "city": "Pontianak",
//                 "country": "Indonesia",
//                 "terminal": "Domestic",
//                 "gate": "1",
//                 "time": "2025-09-15T14:55:00.000Z",
//                 "timezone": "Asia/Jakarta"
//             },
//             "duration": 105,
//             "cabinClasses": [
//                 {
//                     "class": "Economy",
//                     "price": 850000,
//                     "seatsAvailable": 215,
//                     "facilities": [
//                         "Snack",
//                         "Drink"
//                     ],
//                     "baggage": {
//                         "carry": "7kg",
//                         "checked": "20kg"
//                     }
//                 }
//             ],
//             "stops": [],
//             "deletedAt": null,
//             "UserId": "68888276782e842cd0e3e915",
//             "UserCreated": {
//                 "_id": "68888276782e842cd0e3e915",
//                 "firstName": "Kang",
//                 "lastName": "Haerin",
//                 "username": "kanghaerin",
//                 "email": "kanghaerin@gmail.com",
//                 "phoneNumber": "085363508587",
//                 "dateOfBirth": "2025-06-10T08:12:00.000Z",
//                 "address": "Jalan Yos Sudarso",
//                 "role": "Admin",
//                 "isEmailVerified": true,
//                 "createdAt": "2025-07-29T08:12:38.133Z",
//                 "updatedAt": "2025-07-29T08:12:38.133Z"
//             }
//         },
//         {
//             "_id": "689449ff68fa399516b20693",
//             "flightNumber": "SJ182",
//             "airline": "Sriwijaya Air",
//             "aircraft": "Boeing 737-500",
//             "totalSeats": 112,
//             "departure": {
//                 "airportCode": "CGK",
//                 "airportName": "Soekarno-Hatta International Airport",
//                 "city": "Jakarta",
//                 "country": "Indonesia",
//                 "terminal": "1B",
//                 "gate": "D5",
//                 "time": "2025-09-15T19:40:00.000Z",
//                 "timezone": "Asia/Jakarta"
//             },
//             "arrival": {
//                 "airportCode": "PNK",
//                 "airportName": "Supadio Airport",
//                 "city": "Pontianak",
//                 "country": "Indonesia",
//                 "terminal": "Domestic",
//                 "gate": "2",
//                 "time": "2025-09-15T21:25:00.000Z",
//                 "timezone": "Asia/Jakarta"
//             },
//             "duration": 105,
//             "cabinClasses": [
//                 {
//                     "class": "Economy",
//                     "price": 980000,
//                     "seatsAvailable": 112,
//                     "facilities": [
//                         "Snack",
//                         "Drink"
//                     ],
//                     "baggage": {
//                         "carry": "7kg",
//                         "checked": "20kg"
//                     }
//                 }
//             ],
//             "stops": [],
//             "deletedAt": null,
//             "UserId": "68888276782e842cd0e3e915",
//             "UserCreated": {
//                 "_id": "68888276782e842cd0e3e915",
//                 "firstName": "Kang",
//                 "lastName": "Haerin",
//                 "username": "kanghaerin",
//                 "email": "kanghaerin@gmail.com",
//                 "phoneNumber": "085363508587",
//                 "dateOfBirth": "2025-06-10T08:12:00.000Z",
//                 "address": "Jalan Yos Sudarso",
//                 "role": "Admin",
//                 "isEmailVerified": true,
//                 "createdAt": "2025-07-29T08:12:38.133Z",
//                 "updatedAt": "2025-07-29T08:12:38.133Z"
//             }
//         }
//     ]
// }
