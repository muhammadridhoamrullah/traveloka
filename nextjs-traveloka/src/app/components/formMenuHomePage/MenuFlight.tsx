"use client";
import React, { useState } from "react";
import { MdPeopleOutline } from "react-icons/md";
import { LiaPlaneDepartureSolid } from "react-icons/lia";
import { LiaPlaneArrivalSolid } from "react-icons/lia";
import { HiOutlineCalendarDateRange } from "react-icons/hi2";
import { GoSearch } from "react-icons/go";
import { MdOutlineAirplaneTicket } from "react-icons/md";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function MenuFlight() {
  const navigate = useRouter();
  // Initital state untuk form menu flight
  const [formDataFlight, setFormDataFlight] = useState({
    departureAirport: "CGK",
    arrivalAirport: "PKU",
    departureTime: new Date().toISOString().split("T")[0],
    cabinClass: "Economy",
    passengerCount: 1,
  });

  // Change Handlers untuk form menu flight
  function changeHandler(
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) {
    const { name, value } = e.target;

    setFormDataFlight({
      ...formDataFlight,
      [name]: value,
    });
  }

  // Submit handler untuk form menu flight
  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      if (
        !formDataFlight.departureAirport ||
        !formDataFlight.arrivalAirport ||
        !formDataFlight.departureTime ||
        !formDataFlight.passengerCount ||
        !formDataFlight.cabinClass
      ) {
        throw new Error("Please fill in all fields.");
      }

      if (formDataFlight.passengerCount <= 0) {
        throw new Error("Passenger count must be a positive number.");
      }

      if (formDataFlight.departureAirport === formDataFlight.arrivalAirport) {
        throw new Error("Departure and arrival airports cannot be the same.");
      }

      if (new Date(formDataFlight.departureTime) < new Date()) {
        throw new Error("Departure date cannot be in the past.");
      }

      const searchParams = new URLSearchParams({
        departureAirport: formDataFlight.departureAirport,
        arrivalAirport: formDataFlight.arrivalAirport,
        departureTime: formDataFlight.departureTime,
        cabinClass: formDataFlight.cabinClass,
        passengerCount: formDataFlight.passengerCount.toString(),
      });

      // Redirect ke halaman serach flight dengan query params
      navigate.push(`/flight/search?${searchParams.toString()}`);
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
          text: "An unexpected error occurred.",
        });
      }
    }
  }

  // State hanya untuk dnf
  const [oneWay, setOneWay] = useState(true);

  function toggleOneWay(value: boolean) {
    setOneWay(value);
  }

  // Data Bandara
  const data = [
    {
      name: "Soekarno–Hatta International Airport",
      iata: "CGK",
      icao: "WIII",
      location: "Jakarta, Banten",
    },
    {
      name: "Ngurah Rai International Airport (I Gusti Ngurah Rai)",
      iata: "DPS",
      icao: "WADD",
      location: "Denpasar, Bali",
    },
    {
      name: "Juanda International Airport",
      iata: "SUB",
      icao: "WARR",
      location: "Surabaya, Jawa Timur",
    },
    {
      name: "Kualanamu International Airport",
      iata: "KNO",
      icao: "WIMM",
      location: "Medan, Sumatera Utara",
    },
    {
      name: "Sultan Hasanuddin International Airport",
      iata: "UPG",
      icao: "WAAA",
      location: "Makassar, Sulawesi Selatan",
    },
    {
      name: "Sultan Syarif Kasim II International Airport",
      iata: "PKU",
      icao: "WIBB",
      location: "Pekanbaru, Riau",
    },
    {
      name: "Husein Sastranegara International Airport",
      iata: "BDO",
      icao: "WICC",
      location: "Bandung, Jawa Barat",
    },
    {
      name: "Kertajati International Airport",
      iata: "KJT",
      icao: "WICA",
      location: "Majalengka, Jawa Barat",
    },
    {
      name: "Banyuwangi International Airport",
      iata: "BWX",
      icao: "WADY",
      location: "Banyuwangi, Jawa Timur",
    },
    {
      name: "Dortheys Hiyo Eluay International Airport (Sentani)",
      iata: "DJJ",
      icao: "WAJJ",
      location: "Jayapura, Papua",
    },
    {
      name: "Singapore Changi International Airport",
      iata: "SIN",
      icao: "WSSS",
      location: "Singapore",
    },
    {
      name: "Kuala Lumpur International Airport",
      iata: "KUL",
      icao: "WMKK",
      location: "Sepang, Selangor, Malaysia",
    },
    {
      name: "Supadio Airport",
      iata: "PNK",
      icao: "WIOO",
      location: "Pontianak, Kalimantan Barat, Indonesia",
    },
    {
      name: "Abdul Rachman Saleh Airport",
      iata: "MLG",
      icao: "WARA",
      location: "Malang, Jawa Timur",
    },
  ];

  return (
    <form
      onSubmit={submitHandler}
      className="flex flex-col justify-between items-start gap-4 w-full h-full"
    >
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

        {/* Awal Jumlah Penumpang dan Cabin Class */}
        <div className="flex items-center gap-4  font-semibold text-white">
          <div className="flex items-center gap-2 bg-black/80 p-2 rounded-md">
            <MdPeopleOutline className="text-2xl" />
            <input
              type="number"
              name="passengerCount"
              id="passengerCount"
              className="w-12 text-center rounded-md bg-white/20 cursor-pointer outline-none"
              onChange={changeHandler}
              value={formDataFlight.passengerCount}
              min="1"
            />
          </div>

          <select
            name="cabinClass"
            id="cabinClass"
            className="w-52 p-[7px] bg-black/80 rounded-md gap-2 cursor-pointer outline-none"
            onChange={changeHandler}
            value={formDataFlight.cabinClass}
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
        {/* Akhir Jumlah Penumpang dan Cabin Class */}
      </div>
      {/* Awal Oneway dan Jumlah Penumpang */}

      {/* Awal From & To - Departure Date & Button Search */}
      <div className=" w-full h-full flex items-center justify-between">
        {/* Awal From & To */}
        <div className="w-2/3 h-full flex justify-center items-center">
          {/* Awal From */}
          <div className="w-full  flex flex-col gap-2">
            <div className="text-sm font-semibold">From</div>
            <div className="flex items-center gap-2 border-2 border-[#0194F3] rounded-l-2xl py-2 px-3 bg-white">
              <LiaPlaneDepartureSolid className="text-3xl text-[#0194F3]" />
              <select
                name="departureAirport"
                id="departureAirport"
                className="w-full outline-none text-black cursor-pointer font-semibold text-sm"
                onChange={changeHandler}
                value={formDataFlight.departureAirport}
              >
                {data.map((airport, index) => (
                  <option
                    value={airport.iata}
                    className="bg-white text-black  font-semibold text-sm"
                    key={index}
                  >
                    {airport.name} - {airport.location}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* Akhir Form */}

          {/* Awal To */}
          <div className="w-full  flex flex-col gap-2">
            <div className="text-sm font-semibold">To</div>
            <div className="flex items-center gap-2 border-2 border-[#0194F3] rounded-r-2xl py-2 px-3 bg-white">
              <LiaPlaneArrivalSolid className="text-3xl text-[#0194F3]" />
              <select
                name="arrivalAirport"
                id="arrivalAirport"
                className="w-full outline-none text-black cursor-pointer font-semibold text-sm"
                onChange={changeHandler}
                value={formDataFlight.arrivalAirport}
              >
                {data.map((airport, index) => (
                  <option
                    value={airport.iata}
                    key={index}
                    className="bg-white text-black font-semibold text-sm"
                  >
                    {airport.name} - {airport.location}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* Akhir To */}
        </div>
        {/* Akhir From & To */}

        {/* Awal Departure Date & Button Search */}
        <div className="w-1/3 h-full flex justify-center items-end gap-4">
          <div className="w-2/3  flex flex-col gap-2">
            <div className="text-sm font-semibold">Departure Date</div>
            <div className="flex items-center gap-2 border-2 border-[#0194F3] rounded-2xl py-2 px-3 bg-white">
              <HiOutlineCalendarDateRange className="text-3xl text-[#0194F3]" />
              <input
                type="date"
                name="departureTime"
                id="departureTime"
                className="w-full outline-none text-black cursor-pointer font-semibold text-sm"
                onChange={changeHandler}
                value={formDataFlight.departureTime}
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-green-600 p-[13px] rounded-2xl border-2 border-[#0194F3] cursor-pointer hover:bg-green-800 transition-colors duration-300"
          >
            <GoSearch className="text-white text-xl" />
          </button>
        </div>
        {/* AKhir Departure Date & Button Search */}
      </div>
      {/* Akhir From & To - Departure Date & Button Search */}

      {/* Awal Letter Promotions */}
      <div className="flex justify-start gap-2 text-slate-300">
        <MdOutlineAirplaneTicket className="text-3xl" />
        <div className=" flex items-end">
          Your next adventure is just a ticket away — book now and make
          memories!
        </div>
      </div>
      {/* Akhir Letter Promotions */}
    </form>
  );
}

//  const departureAirport = searchParams.get("departureAirport");
//   const arrivalAirport = searchParams.get("arrivalAirport");
//   const departureTime = searchParams.get("departureTime");

//   const cabinClass = searchParams.get("cabinClass");
//   const passengerCount = searchParams.get("passengerCount");
