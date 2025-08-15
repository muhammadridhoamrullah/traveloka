"use client";

import ButtonBack from "@/app/components/flight/detail/ButtonBack";
import { Flight } from "@/db/type/flight";
import {
  formatDuration,
  getAirlineLogoFromUtils,
  getTimeAndDate,
} from "@/db/utils/helperFunctions";
import { Metadata } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import Loading from "./loading";
import { generateMetaData } from "@/db/utils/metadata";
import { useParams } from "next/navigation";
import { LuPlane } from "react-icons/lu";

// export async function generateMetadata({
//   params,
//   searchParams,
// }: Props): Promise<Metadata> {
//   const { flightData } = await searchParams;
//   const flightInfo = flightData
//     ? JSON.parse(decodeURIComponent(flightData))
//     : null;

//   return {
//     title: `Flight Detail - ${flightInfo.flightNumber} - ${flightInfo.departure.airportCode} to ${flightInfo.arrival.airportCode} - ${flightInfo.airline}`,
//     description: `Detail flight for ${flightInfo.flightNumber} from ${
//       flightInfo.departure.airportName
//     } to ${flightInfo.arrival.airportName}. Departure at ${new Date(
//       flightInfo.departure.time
//     ).toLocaleTimeString()} and arrival at ${new Date(
//       flightInfo.arrival.time
//     ).toLocaleTimeString()}.`,
//     icons: {
//       icon: "/traveloka_logo.png",
//     },
//   };
// }

export default function DetailFlight() {
  const params = useParams();
  const [flightData, setFlightData] = useState<Flight>({} as Flight);
  const [loading, setLoading] = useState(true);

  // Generate metdata dynamically
  generateMetaData({
    title: `Flight Detail: ${flightData?.flightNumber} - ${flightData?.departure?.airportCode} to ${flightData?.arrival?.airportCode} - ${flightData?.airline}`,
    description: `Detail flight for ${flightData?.flightNumber} from ${
      flightData?.departure?.airportName
    } to ${flightData?.arrival?.airportName}. Departure at ${new Date(
      flightData?.departure?.time
    ).toLocaleTimeString()} and arrival at ${new Date(
      flightData?.arrival?.time
    ).toLocaleTimeString()}.`,
    canonical: `/flight/detail/${params.id}`,
    icons: {
      icon: "/traveloka_logo.png",
    },
    ogTitle: `Flight Detail - ${flightData?.flightNumber} - ${flightData?.departure?.airportCode} to ${flightData?.arrival?.airportCode} - ${flightData?.airline}`,
    ogDescription: `Detail flight for ${flightData?.flightNumber} from ${
      flightData?.departure?.airportName
    } to ${flightData?.arrival?.airportName}. Departure at ${new Date(
      flightData?.departure?.time
    ).toLocaleTimeString()} and arrival at ${new Date(
      flightData?.arrival?.time
    ).toLocaleTimeString()}.`,
    ogUrl: `/flight/detail/${params.id}`,
    ogImage: "/traveloka_logo.png",
  });

  async function getFlightDataFromSession() {
    setLoading(true);
    const flightDataFromSession = sessionStorage.getItem("flightData");
    if (flightDataFromSession) {
      const parsedFlightData = JSON.parse(flightDataFromSession);
      setFlightData(parsedFlightData);
    } else {
      console.error("No flight data found in session storage.");
    }
    setLoading(false);
  }

  useEffect(() => {
    getFlightDataFromSession();
  }, [params.id]);

  // if (loading) {
  //   return (
  //     <div className="w-full min-h-screen pt-36 pb-5 px-20 bg-red-800 flex items-center justify-center">
  //       <div className="text-white text-xl">Loading flight details...</div>
  //     </div>
  //   );
  // }

  if (loading) {
    return <Loading />;
  }

  const airlineLogo = getAirlineLogoFromUtils(flightData?.airline);
  const getTimeAndDateDeparture = getTimeAndDate(flightData?.departure?.time);
  const getTimeAndDateArrival = getTimeAndDate(flightData?.arrival?.time);
  const duration = formatDuration(flightData?.duration);

  const directOrTransit = flightData?.stops?.length ? "Transit" : "Direct";
  const howManyStops = flightData?.stops ? flightData?.stops.length : 0;

  return (
    <div className="w-full min-h-screen pt-36 pb-5 px-20 bg-blue-950 flex flex-col gap-4 text-white">
      {/* Awal Tombol Back */}

      <ButtonBack />
      {/* Akhir Tombol Back */}

      {/* Awal Judul */}
      <div className=" flex items-center justify-center font-bold text-2xl ">
        Detail Flight - {flightData?.airline} - {flightData?.flightNumber} -{" "}
        {flightData?.departure?.airportCode} to{" "}
        {flightData?.arrival?.airportCode}
      </div>
      {/* Akhir Judul */}

      {/* Awal Flex Samping */}

      <div className=" flex justify-between items-center gap-4v w-full h-full gap-4">
        {/* Awal Kiri Card Detail */}

        <div className="w-2/3 h-fit flex flex-col gap-2 items-start">
          {/* Awal Card Detail Flight */}
          <div className="bg-black/70 w-full h-60 rounded-xl p-5 flex flex-col justify-between items-start  shadow-lg gap-2">
            <div className=" w-full h-1/3 flex justify-between items-center">
              {/* Awal Logo dan Airline Name */}
              <div className="flex items-center gap-3 ">
                <Image
                  src={airlineLogo}
                  height={59}
                  width={59}
                  alt={flightData?.airline}
                />
                <div className="flex flex-col justify-between items-start ">
                  <div className="text-xl font-semibold">
                    {flightData?.airline}
                  </div>
                  <div className="text-sm text-slate-300">
                    {flightData?.flightNumber} • {flightData?.aircraft}
                  </div>
                </div>
              </div>
              {/* Akhir Logo dan Airline Name */}

              {/* Awal Review */}
              <div className=" flex items-center gap-1">
                <FaStar className="text-yellow-400" />
                <div className="text-sm font-semibold">4.5</div>
                <div className="text-sm text-slate-300">(1247 reviews)</div>
              </div>
              {/* Akhir Review */}
            </div>
            {/* Awal Jadwal */}
            <div className=" w-full h-2/3 flex justify-between items-center gap-2">
              <div className=" w-1/5 h-full flex flex-col justify-between items-center">
                <div className="font-semibold text-2xl">
                  {getTimeAndDateDeparture.time}
                </div>
                <div className=" text-xs text-slate-500">
                  {getTimeAndDateDeparture.date}
                </div>
                <div className="font-semibold">
                  {flightData?.departure?.airportCode}
                </div>
                <div className=" text-xs text-slate-500">
                  {flightData?.departure?.city}
                </div>
                <div className=" text-xs text-slate-500">
                  Terminal {flightData?.departure?.terminal}
                </div>
              </div>
              <div className=" w-3/5 h-full flex flex-col gap-2 justify-center items-center">
                <LuPlane className="text-xl" />
                <div className=" w-full flex justify-between items-center gap-1">
                  <div className="w-2/5 border border-dashed border-slate-500"></div>
                  <div className="w-1/5 flex justify-center items-center font-semibold">
                    {duration}
                  </div>
                  <div className="w-2/5 border border-dashed border-slate-500"></div>
                </div>
                <div className="text-xs text-slate-500">
                  {howManyStops > 0
                    ? `${howManyStops} ${directOrTransit}`
                    : directOrTransit}
                </div>
              </div>
              <div className="w-1/5 h-full flex flex-col justify-between items-center">
                <div className="font-semibold text-2xl">
                  {getTimeAndDateArrival.time}
                </div>
                <div className="text-xs text-slate-500">
                  {getTimeAndDateArrival.date}
                </div>
                <div className="font-semibold">
                  {flightData?.arrival?.airportCode}
                </div>
                <div className="text-xs text-slate-500">
                  {flightData?.arrival?.city}
                </div>
                <div className="text-xs text-slate-500">
                  Terminal {flightData?.arrival?.terminal}
                </div>
              </div>
            </div>
            {/* Akhir Jadwal */}
          </div>
          {/* Akhir Card Detail Flight */}

          {/* Awal Inflight Facilities */}
          <div className="bg-red-800">Inflight Facilities</div>
          {/* Akhir Inflight Facilites */}

          {/* Awal Baggage & Policies */}
          <div className="bg-orange-700">Baggage & Policies</div>
          {/* Akhir Baggage & Policies */}
        </div>
        {/* Akhir Kiri Card Detail */}

        {/* Awal Kanan Pay Ticket */}
        <div className="bg-blue-500 w-1/3 h-full">Pay Ticket</div>
        {/* Akhir Kanan Pay Ticket */}
      </div>

      {/* Akhir Flex Samping */}
    </div>
  );
}

// Flight Info di detail: {
//   _id: '689ae7fa816e5cc195291ed9',
//   flightNumber: 'JT684',
//   airline: 'Lion Air',
//   aircraft: 'Boeing 737-900ER',
//   totalSeats: 215,
//   departure: {
//     airportCode: 'CGK',
//     airportName: 'Soekarno-Hatta International Airport',
//     city: 'Jakarta',
//     country: 'Indonesia',
//     terminal: '1C',
//     gate: 'C2',
//     time: '2025-09-15T13:10:00.000Z',
//     timezone: 'Asia/Jakarta'
//   },
//   arrival: {
//     airportCode: 'PNK',
//     airportName: 'Supadio Airport',
//     city: 'Pontianak',
//     country: 'Indonesia',
//     terminal: 'Domestic',
//     gate: '1',
//     time: '2025-09-15T14:55:00.000Z',
//     timezone: 'Asia/Jakarta'
//   },
//   duration: 105,
//   cabinClasses: [
//     {
//       class: 'Economy',
//       price: 850000,
//       seatsAvailable: 215,
//       facilities: [Array],
//       baggage: [Object]
//     }
//   ],
//   stops: [],
//   deletedAt: null,
//   UserId: '68888276782e842cd0e3e915',
//   UserCreated: {
//     _id: '68888276782e842cd0e3e915',
//     firstName: 'Kang',
//     lastName: 'Haerin',
//     username: 'kanghaerin',
//     email: 'kanghaerin@gmail.com',
//     phoneNumber: '085363508587',
//     dateOfBirth: '2025-06-10T08:12:00.000Z',
//     address: 'Jalan Yos Sudarso',
//     role: 'Admin',
//     isEmailVerified: true,
//     createdAt: '2025-07-29T08:12:38.133Z',
//     updatedAt: '2025-07-29T08:12:38.133Z'
//   }
// }
