"use client";
import { useState } from "react";
import { MdPeopleOutline } from "react-icons/md";

export default function MenuFlight() {
  // Initital state untuk form menu flight
  const [formDataFlight, setFormDataFlight] = useState({
    departureAirport: "",
    arrivalAirport: "",
    departureTime: "",
    cabinClass: "Economy",
    passengerCount: 1,
  });

  // State hanya untuk dnf
  const [oneWay, setOneWay] = useState(true);

  function toggleOneWay(value: boolean) {
    setOneWay(value);
  }

  return (
    <form className="flex flex-col justify-between items-start gap-4 w-full h-full">
      {/* Awal Oneway dan Jumlah Penumpang */}

      <div className="flex justify-between items-center w-full">
        {/* Awal Oneway */}
        <div className="flex items-center gap-2 font-semibold text-white">
          <div
            className={`py-1 px-4 rounded-full cursor-pointer   ${
              oneWay ? "bg-[#0194F3]" : "bg-black/80"
            }`}
            onClick={() => toggleOneWay(true)}
          >
            One Way
          </div>
          <div
            className={`py-1 px-4 rounded-full cursor-pointer   ${
              oneWay ? "bg-black/80" : "bg-[#0194F3]"
            }`}
            onClick={() => toggleOneWay(false)}
          >
            Multi-city
          </div>
        </div>
        {/* Akhir Oneway */}

        <div className="flex items-center gap-4  font-semibold text-white">
          <div className="flex items-center gap-2 bg-black/80 p-2 rounded-md">
            <MdPeopleOutline className="text-2xl" />
            <input
              type="number"
              name="passengerCount"
              id="passengerCount"
              placeholder="1"
              className="w-12 text-center rounded-md bg-white/20 cursor-pointer outline-none"
            />
          </div>

          <select
            name="cabinClass"
            id="cabinClass"
            className="w-52 p-[7px] bg-black/80 rounded-md gap-2 cursor-pointer outline-none"
          >
            <option className="bg-black text-white text-sm" value="Economy">
              Economy
            </option>
            <option
              className="bg-black text-white text-sm"
              value="Premium Economy"
            >
              Premium Economy
            </option>
            <option className="bg-black text-white text-sm" value="Business">
              Business
            </option>
            <option className="bg-black text-white text-sm" value="First Class">
              First Class
            </option>
          </select>
        </div>
      </div>
      {/* Awal Oneway dan Jumlah Penumpang */}

      <div>From, To, Departure Date and Button Search</div>
    </form>
  );
}

//  const departureAirport = searchParams.get("departureAirport");
//   const departureTime = searchParams.get("departureTime");
//   const arrivalAirport = searchParams.get("arrivalAirport");
//   const cabinClass = searchParams.get("cabinClass");
//   const passengerCount = searchParams.get("passengerCount");
//   const airline = searchParams.get("airline");
