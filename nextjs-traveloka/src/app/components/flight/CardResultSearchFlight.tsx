"use client";
import { Flight } from "@/db/type/flight";
import { LuLuggage } from "react-icons/lu";

import Image from "next/image";

import Link from "next/link";
import PaymentButton from "../PaymentButton";
import {
  formatDuration,
  formatRupiah,
  getAirlineLogoFromUtils,
} from "@/db/utils/helperFunctions";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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

export default function CardResultSearchFlight({ data, key, query }: Props) {
  let airlineLogo = getAirlineLogoFromUtils(data.airline);
  const navigate = useRouter();

  function getBaggage(cabinClass: string) {
    let maxBaggage = Infinity;

    data.cabinClasses.forEach((cabin) => {
      if (cabin.class === cabinClass) {
        maxBaggage = cabin.baggage?.checked || cabin.baggage?.cabin || 0;
      }
    });

    return maxBaggage;
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

  const [isNavigating, setIsNavigating] = useState(false);

  function handleChooseFlight() {
    setIsNavigating(true);
    sessionStorage.setItem("flightData", JSON.stringify(data));
    sessionStorage.setItem("queryData", JSON.stringify(query));
  }

  // Prefetch data
  const [isHovered, setIsHovered] = useState(false);

  function handleMouseEnter() {
    setIsHovered(true);
    console.log(`Prefetching /flight/detail/${data._id}`);

    navigate.prefetch(`/flight/detail/${data._id}`);
  }

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
        {/* <PaymentButton data={dataForPayment} /> */}
        <Link
          href={`/flight/detail/${data._id}`}
          onClick={handleChooseFlight}
          onMouseEnter={handleMouseEnter}
          className="bg-blue-950 px-4 py-2 rounded-md text-sm font-semibold hover:bg-blue-700 cursor-pointer"
        >
          {isNavigating ? (
            <div className="animate-spin h-5 w-5 border-4 border-t-transparent border-white rounded-full"></div>
          ) : (
            <div>Choose</div>
          )}
        </Link>
      </div>
      {/* Akhir Flight Menu */}
    </div>
  );
}
