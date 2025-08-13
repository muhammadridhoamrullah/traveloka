"use client";
import { Flight } from "@/db/type/flight";
import { LuLuggage } from "react-icons/lu";

import Image from "next/image";
import { formatDuration, formatRupiah } from "@/db/utils/helperFunctions";
import Link from "next/link";
import PaymentButton from "./PaymentButton";

interface Props {
  data: Flight;
  key: number;
  query: {
    departureAirport: string;
    arrivalAirport: string;
    departureTime: Date;
    cabinClass: string;
    passengerCount: number;
  };
}

let airlineLogo: { [key: string]: string } = {
  "Garuda Indonesia":
    "/airplaneCompany/garudaIndonesia/garuda-indonesia-logo.png",
  "Lion Air": "/airplaneCompany/lionAir/lion-air-logo.png",
  AirAsia: "/airplaneCompany/airAsia/airasia-logo.png",
  Citilink: "/airplaneCompany/citilink/citilink-logo.png",
  "Sriwijaya Air": "/airplaneCompany/sriwijayaAir/sriwijaya-air-logo.png",
  "Batik Air": "/airplaneCompany/batikAir/batik-air-logo.png",
  "NAM Air": "/airplaneCompany/namAir/nam-air-logo.png",
  "Pelita Air": "/airplaneCompany/pelitaAir/pelita-air-logo.png",
  "Super Air Jet": "/airplaneCompany/superAirJet/super-air-jet-logo.png",
  "Trans Nusa": "/airplaneCompany/transNusa/transnusa-logo.png",
  "Trigana Air": "/airplaneCompany/triganaAir/trigana-air-service-logo.png",
  "Wings Air": "/airplaneCompany/wingsAir/wings-air-logo.png",
};

function getAirlineLogo(airlineName: string): string {
  return airlineLogo[airlineName] || "/traveloka_logo.png";
}

export default async function CardResultSearchFlight({
  data,
  key,
  query,
}: Props) {
  let airlineLogo = getAirlineLogo(data.airline);

  function getBaggage(cabinClass: string) {
    let maxBaggage = Infinity;

    data.cabinClasses.forEach((cabin) => {
      if (cabin.class === cabinClass) {
        maxBaggage = cabin.baggage?.checked || cabin.baggage?.cabin || 0;
      }
    });

    return maxBaggage;
  }

  function getFacilities(cabinClass: string) {
    let facilities: string[] = [];
    data.cabinClasses.forEach((cabin) => {
      if (cabin.class === cabinClass && cabin.facilities) {
        facilities = [...facilities, ...cabin.facilities];
      }
    });
    return facilities.length > 0 ? facilities.join(", ") : "No facilities";
  }

  function price(cabinClass: string) {
    let price = 0;
    data.cabinClasses.forEach((cabin) => {
      if (cabin.class === cabinClass) {
        price = cabin.price;
      }
    });
    return price;
  }

  let priceInRupiah = formatRupiah(price(query.cabinClass));

  let departureHour = new Date(data.departure.time)
    .getUTCHours()
    .toString()
    .padStart(2, "0");
  let departureMinute = new Date(data.departure.time)
    .getUTCMinutes()
    .toString()
    .padStart(2, "0");

  let arrivalHour = new Date(data.arrival.time)
    .getUTCHours()
    .toString()
    .padStart(2, "0");
  let arrivalMinute = new Date(data.arrival.time)
    .getUTCHours()
    .toString()
    .padStart(2, "0");

  let duration = formatDuration(data.duration);

  let transit = data.stops && data.stops.length > 0 ? "Transit" : "Direct";
  let howManyStops = data.stops ? data.stops.length : 0;

  const dataForPayment = {
    orderId: `Traveloka-Flight - ${data.flightNumber} - ${Date.now()} - ${Math.floor(
      1000 + Math.random() * 9000
    )}`,
    grossAmount: price(query.cabinClass),
  };

  return (
    <div className="bg-black/70 text-white rounded-md flex flex-col gap-5 justify-between items-start py-3 px-4 w-full h-fit">
      {/* Awal Logo, Jadwal, & Harga */}
      <div className="flex justify-between items-center w-full">
        {/* Awal Logo */}
        <div className=" w-1/3 h-full flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Image
              src={airlineLogo}
              height={25}
              width={25}
              alt={data.airline}
            />
            <div className="font-semibold text-xl">{data.airline}</div>
          </div>
          <div className="flex items-center gap-2">
            <div className="border border-white rounded-lg text-sm p-1 flex items-center gap-1">
              <LuLuggage className="text-lg" />
              <div>{getBaggage(query.cabinClass)}</div>
            </div>
            {/* <div>{getFacilities(query.cabinClass)}</div> */}
          </div>
        </div>
        {/* Akhir Logo */}

        {/* Awal Jadwal */}
        <div className=" w-1/3 h-full flex justify-center items-center gap-2">
          <div className=" w-1/3 h-full flex flex-col items-end justify-center">
            <div className="flex items-center gap-1 font-semibold">
              <div>{departureHour}</div>
              <div>:</div>
              <div>{departureMinute}</div>
            </div>
            <div className="text-slate-300">{data.departure.airportCode}</div>
          </div>
          <div className=" w-1/3 h-full flex flex-col  justify-center items-center text-xs text-slate-300">
            <div>{duration}</div>
            {howManyStops > 0 ? (
              <div>
                {howManyStops} {transit}
              </div>
            ) : (
              <div>{transit}</div>
            )}
          </div>
          <div className=" w-1/3 h-full flex flex-col  items-start justify-center">
            <div className="flex items-center gap-1 font-semibold">
              <div>{arrivalHour}</div>
              <div>:</div>
              <div>{arrivalMinute}</div>
            </div>
            <div className="text-slate-300">{data.arrival.airportCode}</div>
          </div>
        </div>
        {/* Akhir Jadwal */}

        {/* Awal Harga */}
        <div className="w-1/3 h-full flex items-center justify-center">
          <div className="font-bold text-lg">{priceInRupiah}</div>
          <div className="text-xs text-slate-400">/pax</div>
        </div>
        {/* Akhir Harga */}
      </div>
      {/* Akhir Logo, Jadwal, & Harga */}

      {/* Awal Flight Menu */}
      <div className=" flex justify-between items-end w-full">
        <div className=" flex items-center gap-4 text-sm text-slate-400">
          <div>Flight Details</div>
          <div>Additional Benefit</div>
          <div>Refund</div>
          <div>Reschedule</div>
        </div>
        <PaymentButton data={dataForPayment} />
      </div>
      {/* Akhir Flight Menu */}
    </div>
  );
}

// data {
//   _id: '689449ff68fa399516b20693',
//   flightNumber: 'SJ182',
//   airline: 'Sriwijaya Air',
//   aircraft: 'Boeing 737-500',
//   totalSeats: 112,
//   departure: {
//     airportCode: 'CGK',
//     airportName: 'Soekarno-Hatta International Airport',
//     city: 'Jakarta',
//     country: 'Indonesia',
//     terminal: '1B',
//     gate: 'D5',
//     time: '2025-09-15T19:40:00.000Z',
//     timezone: 'Asia/Jakarta'
//   },
//   arrival: {
//     airportCode: 'PNK',
//     airportName: 'Supadio Airport',
//     city: 'Pontianak',
//     country: 'Indonesia',
//     terminal: 'Domestic',
//     gate: '2',
//     time: '2025-09-15T21:25:00.000Z',
//     timezone: 'Asia/Jakarta'
//   },
//   duration: 105,
//   cabinClasses: [
//     {
//       class: 'Economy',
//       price: 980000,
//       seatsAvailable: 112,
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
