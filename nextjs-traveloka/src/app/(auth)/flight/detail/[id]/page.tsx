"use client";

import ButtonBack from "@/app/components/flight/detail/ButtonBack";
import { Flight } from "@/db/type/flight";

import { Metadata } from "next";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import Loading from "./loading";
import { generateMetaData } from "@/db/utils/metadata";
import { useParams } from "next/navigation";
import { LuPlane } from "react-icons/lu";
import {
  formatDuration,
  formatRupiah,
  getAirlineLogoFromUtils,
  getFacilityIconName,
  getTimeAndDate,
} from "@/db/utils/helperFunctions";
import { ImSpoonKnife } from "react-icons/im";
import { BiMoviePlay } from "react-icons/bi";
import { IoWifiSharp } from "react-icons/io5";
import { GiHotMeal } from "react-icons/gi";
import { MdAirlineSeatReclineExtra } from "react-icons/md";
import { MdSetMeal } from "react-icons/md";
import { TbBedFlat } from "react-icons/tb";
import { GrLounge } from "react-icons/gr";
import { PiChefHatBold } from "react-icons/pi";
import { MdOutlineAirlineSeatIndividualSuite } from "react-icons/md";
import { FaCar } from "react-icons/fa";
import { GiChipsBag } from "react-icons/gi";
import { IoFastFoodOutline } from "react-icons/io5";
import { RiDrinks2Line } from "react-icons/ri";
import { RiMovieAiLine } from "react-icons/ri";
import { FaBed } from "react-icons/fa";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { LuLuggage } from "react-icons/lu";
import { LuShieldCheck } from "react-icons/lu";
import PaymentButton from "@/app/components/PaymentButton";

export default function DetailFlight() {
  const params = useParams();
  const [flightData, setFlightData] = useState<Flight>({} as Flight);
  const [query, setQuery] = useState({
    departureAirport: "",
    arrivalAirport: "",
    departureTime: new Date(),
    cabinClass: "",
    passengerCount: 0,
  });
  console.log("Flight Data:", flightData);

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
    const flightQueryFromSession = sessionStorage.getItem("queryData");
    if (flightDataFromSession) {
      const parsedFlightData = JSON.parse(flightDataFromSession);
      setFlightData(parsedFlightData);
    } else {
      console.error("No flight data found in session storage.");
    }

    if (flightQueryFromSession) {
      const parsedQueryData = JSON.parse(flightQueryFromSession);
      setQuery(parsedQueryData);
    } else {
      console.error("No query data found in session storage.");
    }

    // Set query based on flightData

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

  function getFacilities(cabinClass: string) {
    let facilities: string[] = [];
    flightData.cabinClasses.forEach((cabin) => {
      if (cabin.class === cabinClass && cabin.facilities) {
        facilities = cabin.facilities;
      }
    });
    return facilities.length > 0 ? facilities : [];
  }

  const listFacilities = getFacilities(query.cabinClass);

  function getIconFacility(facilityCode: string) {
    switch (facilityCode) {
      case "Meal":
        return <ImSpoonKnife />;
      case "Entertainment":
        return <BiMoviePlay />;
      case "WiFi":
        return <IoWifiSharp />;
      case "Premium Meal":
        return <GiHotMeal />;
      case "Extra Legroom":
        return <MdAirlineSeatReclineExtra />;
      case "Gourmet Meal":
        return <MdSetMeal />;
      case "Flat Bed":
        return <TbBedFlat />;
      case "Lounge Access":
        return <GrLounge />;
      case "Chef Meal":
        return <PiChefHatBold />;
      case "Private Suite":
        return <MdOutlineAirlineSeatIndividualSuite />;
      case "Chauffeur":
        return <FaCar />;
      case "Snack":
        return <GiChipsBag />;
      case "Snack Purchase":
        return <IoFastFoodOutline />;
      case "Drink":
        return <RiDrinks2Line />;
      case "In-flight Entertainment":
        return <RiMovieAiLine />;
      case "Extra Space":
        return <FaBed />;
      default:
        return <IoMdHelpCircleOutline />;
    }
  }

  function getBaggage(cabinClass: string) {
    let cabinBaggage = Infinity;
    let checkedBaggage = Infinity;

    flightData.cabinClasses.forEach((cabin) => {
      if (cabin.class === cabinClass) {
        cabinBaggage = cabin.baggage?.cabin || 0;
        checkedBaggage = cabin.baggage?.checked || 0;
      }
    });

    return {
      cabinBaggage: cabinBaggage,
      checkedBaggage: checkedBaggage,
    };
  }

  const listBaggage = getBaggage(query.cabinClass);

  function payMyTicket(cabinClass: string) {
    let price = 0;

    flightData.cabinClasses.forEach((cabin) => {
      if (cabin.class === cabinClass) {
        price = cabin.price;
      }
    });

    return price;
  }

  const ticketPrice = payMyTicket(query.cabinClass);
  const totalPrice = payMyTicket(query.cabinClass) * query.passengerCount;
  const datePayTicket = new Date().toISOString().slice(0, 10).replace(/-/g, "");

  const dataForPayment = {
    orderId: `TVLKFLT${flightData?.flightNumber}${datePayTicket}${Math.floor(
      1000 + Math.random() * 9000
    )}`,
    grossAmount: totalPrice,
    serviceType: "flight",
    serviceDetails: {
      flightId: flightData?._id,
      flightNumber: flightData?.flightNumber,
      passengerCount: query.passengerCount,
      cabinClass: query.cabinClass,
    },
  };

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

      <div className="flex justify-between items-start w-full h-full gap-4">
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
          <div className="bg-black/70 w-full h-fit p-5 rounded-xl shadow-lg flex flex-col gap-5 ">
            <div className="text-lg font-semibold">In-Flight Facilities</div>
            {listFacilities.length > 0 ? (
              <div className="flex  flex-wrap  gap-2 ">
                {listFacilities.map((facility, index) => (
                  <div key={index} className="flex items-center   py-1 ">
                    <div className="w-5 h-5 text-[#0194F3] flex items-center ">
                      {getIconFacility(facility)}
                    </div>
                    <div className="text-sm flex items-center">{facility}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-slate-400">No Facility</div>
            )}
          </div>
          {/* Akhir Inflight Facilites */}

          {/* Awal Baggage & Policies */}
          <div className="bg-black/70 w-full h-fit p-5 rounded-xl shadow-lg flex flex-col gap-5">
            <div className="text-lg font-semibold">Baggage & Policies</div>
            <div className="flex flex-col gap-4 ">
              {/* Awal Baggage Allowance */}
              <div className="flex flex-col gap-2 ">
                <div className=" flex items-center justify-start gap-2">
                  <LuLuggage className="text-2xl" />
                  <div>Baggage Allowance</div>
                </div>
                <div className=" flex justify-start items-center gap-5 text-sm">
                  <div className="flex flex-col gap-1 ">
                    <div>Cabin Baggage</div>
                    <div className="text-slate-500">
                      {listBaggage.cabinBaggage}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 ">
                    <div>Checked Baggage</div>
                    <div className="text-slate-500">
                      {listBaggage.checkedBaggage}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 ">
                    <div>Excess Baggage</div>
                    <div className="text-slate-500">Rp, 50.000/kg</div>
                  </div>
                </div>
              </div>
              {/* Akhir Baggage Allowance */}
              <div className="border-[0.1px] border-slate-800"></div>
              {/* Awal Booking Policies */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-start items-center gap-2">
                  <LuShieldCheck className="text-2xl" />
                  <div>Booking Policies</div>
                </div>
                <div className="text-sm flex flex-col gap-2">
                  <div className="flex flex-col gap-1">
                    <div>Cancellation</div>
                    <div className="text-slate-500">
                      Free cancellation up to 24 hours before departure
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div>Changes</div>
                    <div className="text-slate-500">
                      Changes allowed with fee starting from Rp 150,000
                    </div>
                  </div>
                </div>
              </div>
              {/* Akhir Booking Policies */}
            </div>
          </div>
          {/* Akhir Baggage & Policies */}
        </div>
        {/* Akhir Kiri Card Detail */}

        {/* Awal Kanan Pay Ticket */}
        <div className="bg-black/70 w-1/3 h-full rounded-xl p-5 flex flex-col gap-2 items-start justify-between shadow-lg ">
          <div className="text-lg font-semibold ">Pay Your Ticket</div>
          <div className="bg-blue-950 w-full h-fit p-2 rounded-lg flex flex-col gap-2">
            <div className="flex justify-between items-start ">
              <div className="flex flex-col ">
                <div className="text-lg font-semibold">{query.cabinClass}</div>
                <div className="text-slate-400 text-sm">
                  {listFacilities.join(", ")}
                </div>
              </div>
              <div className="flex flex-col">
                <div className="font-bold text-2xl flex items-center">
                  {formatRupiah(totalPrice)}
                </div>
                <div className="text-sm text-slate-400 flex justify-end">
                  {formatRupiah(ticketPrice)}/pax
                </div>
              </div>
            </div>
            {/* Awal Component Pay Button */}
            <PaymentButton data={dataForPayment} />
            {/* Akhir Component Pay Button */}
          </div>
        </div>
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

// {
//     "_id": "689449ff68fa399516b20692",
//     "flightNumber": "QZ8501",
//     "airline": "AirAsia",
//     "aircraft": "Airbus A320-200",
//     "totalSeats": 162,
//     "departure": {
//         "airportCode": "SUB",
//         "airportName": "Juanda International Airport",
//         "city": "Surabaya",
//         "country": "Indonesia",
//         "terminal": "2",
//         "gate": "A3",
//         "time": "2025-09-01T06:00:00.000Z",
//         "timezone": "Asia/Jakarta"
//     },
//     "arrival": {
//         "airportCode": "KUL",
//         "airportName": "Kuala Lumpur International Airport",
//         "city": "Kuala Lumpur",
//         "country": "Malaysia",
//         "terminal": "2",
//         "gate": "J12",
//         "time": "2025-09-01T09:15:00.000Z",
//         "timezone": "Asia/Kuala_Lumpur"
//     },
//     "duration": 135,
//     "cabinClasses": [
//         {
//             "class": "Economy",
//             "price": 1800000,
//             "seatsAvailable": 150,
//             "facilities": [
//                 "Snack Purchase",
//                 "Entertainment"
//             ],
//             "baggage": {
//                 "carry": "7kg",
//                 "checked": "20kg"
//             }
//         },
//         {
//             "class": "Premium Economy",
//             "price": 4500000,
//             "seatsAvailable": 12,
//             "facilities": [
//                 "Meal",
//                 "Flat Bed",
//                 "Entertainment",
//                 "WiFi"
//             ],
//             "baggage": {
//                 "carry": "7kg",
//                 "checked": "35kg"
//             }
//         }
//     ],
//     "stops": [
//         {
//             "airportCode": "BTJ",
//             "airportName": "Sultan Iskandar Muda Airport",
//             "city": "Banda Aceh",
//             "country": "Indonesia",
//             "arrivalTime": "2025-09-01T07:30:00.000Z",
//             "departureTime": "2025-09-01T08:15:00.000Z",
//             "duration": 45,
//             "terminal": "1"
//         }
//     ],
//     "deletedAt": null,
//     "UserId": "6878ad465f1297aa559b872f",
//     "UserCreated": {
//         "_id": "6878ad465f1297aa559b872f",
//         "firstName": "Kim",
//         "lastName": "Minji",
//         "username": "kimminji",
//         "email": "kimminji@gmail.com",
//         "phoneNumber": "081234567890",
//         "dateOfBirth": "1999-05-12",
//         "address": "Jl. Melati No. 10, Korea Selatan",
//         "role": "Admin",
//         "isEmailVerified": true,
//         "createdAt": "2025-07-17T07:59:02.841Z",
//         "updatedAt": "2025-07-17T07:59:24.122Z",
//         "lastLoginAt": "2025-08-17T06:23:12.071Z"
//     }
// }
