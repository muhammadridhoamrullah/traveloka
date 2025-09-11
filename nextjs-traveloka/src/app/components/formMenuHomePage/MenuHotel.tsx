"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaHotel } from "react-icons/fa";
import { MdApartment } from "react-icons/md";
import { MdVilla } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { BsCalendar2DateFill } from "react-icons/bs";
import { FaChildDress } from "react-icons/fa6";
import { IoMdPerson } from "react-icons/io";
import { FaDoorClosed } from "react-icons/fa";
import { GoSearch } from "react-icons/go";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function MenuHotel() {
  const navigate = useRouter();
  const [loading, setLoading] = useState(false);
  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];
  // state untuk form menu
  const [formMenu, setFormMenu] = useState({
    typeAccomodation: "hotel",
    destination: "Bali",
    checkIn: today,
    checkOut: tomorrow,
    adult: 1,
    child: 0,
    room: 1,
  });
  console.log(formMenu, "<<< Form menu");

  // Variabel for easier access
  const typeAcc = formMenu.typeAccomodation;

  // Function for change type accomodation
  function changeTypeAcc(type: string) {
    setFormMenu({
      ...formMenu,
      typeAccomodation: type,
    });
  }

  // Change handler for other inputs
  function changeHandler(
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) {
    const { name, value } = e.target;
    setFormMenu({
      ...formMenu,
      [name]: value,
    });
  }

  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setLoading(true);
      const searchParams = new URLSearchParams({
        typeAccomodation: formMenu.typeAccomodation,
        destination: formMenu.destination,
        checkIn: formMenu.checkIn,
        checkOut: formMenu.checkOut,
        adult: formMenu.adult.toString(),
        child: formMenu.child.toString(),
        room: formMenu.room.toString(),
      });
      console.log(searchParams.toString(), "<<< search params");

      navigate.push(`/hotel/search?${searchParams.toString()}`);
    } catch (error) {
      setLoading(false);
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
          text: "An unexpected error occurred",
        });
      }
    }
  }

  // Data sementara dummy
  const destinations = [
    {
      name: "Bali",
      country: "Indonesia",
      location: "Provinsi Bali",
    },
    {
      name: "Yogyakarta",
      country: "Indonesia",
      location: "Daerah Istimewa Yogyakarta",
    },
    {
      name: "Bandung",
      country: "Indonesia",
      location: "Jawa Barat",
    },
    {
      name: "Lombok",
      country: "Indonesia",
      location: "Nusa Tenggara Barat",
    },
    {
      name: "Jakarta",
      country: "Indonesia",
      location: "DKI Jakarta",
    },
    {
      name: "Surabaya",
      country: "Indonesia",
      location: "Jawa Timur",
    },
    {
      name: "Medan",
      country: "Indonesia",
      location: "Sumatera Utara",
    },
    {
      name: "Makassar",
      country: "Indonesia",
      location: "Sulawesi Selatan",
    },
    {
      name: "Labuan Bajo",
      country: "Indonesia",
      location: "Nusa Tenggara Timur",
    },
    {
      name: "Jayapura",
      country: "Indonesia",
      location: "Papua",
    },
    {
      name: "Singapore",
      country: "Singapore",
      location: "Pulau Singapura",
    },
    {
      name: "Kuala Lumpur",
      country: "Malaysia",
      location: "Selangor",
    },
  ];

  // For Support By
  const airlineCompanies = [
    "/forTrustedBy/airasia-logo.png",
    "/forTrustedBy/batik-air-logo.png",
    "/forTrustedBy/citilink-logo.png",
    "/forTrustedBy/garuda-indonesia-logo.png",
    "/forTrustedBy/lion-air-logo.png",
    "/forTrustedBy/nam-air-logo.png",
    "/forTrustedBy/pelita-air-logo.png",
    "/forTrustedBy/sriwijaya-air-logo.png",
    "/forTrustedBy/super-air-jet-logo.png",
    "/forTrustedBy/transnusa-logo.png",
    "/forTrustedBy/trigana-air-service-logo.png",
    "/forTrustedBy/wings-air-logo.png",
  ];

  const GROUP_SIZE = 5;

  // state current index for the airline companies
  const [currentIndex, setCurrentIndex] = useState(0);

  // hitung jumlah grup yang bisa ditampilkan
  const totalGroups = Math.ceil(airlineCompanies.length / GROUP_SIZE);

  // dapatkan logo dari grup yang sedang aktif
  const currentGroup = airlineCompanies.slice(
    currentIndex * GROUP_SIZE,
    currentIndex * GROUP_SIZE + GROUP_SIZE
  );

  // set interval untuk mengubah tiap 2 detik
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalGroups);
    }, 3000);

    return () => clearInterval(interval);
  }, [totalGroups]);

  return (
    <form
      onSubmit={submitHandler}
      className=" w-full h-full flex flex-col justify-between items-start"
    >
      {/* Awal Option Tempat */}
      <div className=" w-full h-full flex justify-start items-center  gap-3 text-sm">
        {/* Awal Hotel */}
        <div
          className={`${
            typeAcc === "hotel" ? "bg-[#0194F3]" : "bg-black/80"
          } py-1 px-4 rounded-full cursor-pointer flex justify-start items-center gap-2`}
          onClick={() => changeTypeAcc("hotel")}
        >
          <FaHotel />
          <div className="">Hotel</div>
        </div>
        {/* Akhir Hotel */}
        {/* Awal Apartment */}
        <div
          className={`${
            typeAcc === "apartment" ? "bg-[#0194F3]" : "bg-black/80"
          } py-1 px-4 rounded-full cursor-pointer flex justify-start items-center gap-2`}
          onClick={() => changeTypeAcc("apartment")}
        >
          <MdApartment className="text-lg" />
          <div>Apartment</div>
        </div>
        {/* Akhir Apartment */}
        {/* Awal Villa */}
        <div
          className={`${
            typeAcc === "villa" ? "bg-[#0194F3]" : "bg-black/80"
          } py-1 px-4 rounded-full cursor-pointer flex justify-start items-center gap-2`}
          onClick={() => changeTypeAcc("villa")}
        >
          <MdVilla className="text-lg" />
          <div>Villa</div>
        </div>
        {/* Akhir Villa */}
      </div>
      {/* Akhir Option Tempat */}

      {/* Awal Form Menu */}
      <div className=" w-full h-32 flex justify-between items-center bg-green-950">
        {/* Awal City Destination */}
        <div className=" w-4/14 h-full flex flex-col gap-2 justify-center items-start">
          <div className="text-sm font-semibold">
            City, Destination, or Hotel name
          </div>
          <div className="w-full flex items-center justify-start h-16 px-3 bg-white rounded-l-2xl gap-2 border-2 border-r-0  border-[#0194F3]">
            <FaLocationDot className="text-2xl text-[#0194F3]" />
            <select
              className="w-full outline-none text-black/80 cursor-pointer font-semibold"
              name="destination"
              id="destionation"
              value={formMenu.destination}
              onChange={changeHandler}
            >
              {destinations.map((el, index) => (
                <option
                  className="bg-white text-black/80 font-semibold text-sm "
                  value={el.name}
                  key={index}
                >
                  {el.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* Akhir City Destination */}
        {/* Awal Check In */}
        <div className=" w-2/14 h-full flex flex-col gap-2 justify-center items-start">
          <div className="text-sm font-semibold">Check In Date</div>
          <div className="w-full flex items-center justify-start h-16 px-3 bg-white gap-2 border-2 border-r-0  border-[#0194F3]">
            <BsCalendar2DateFill className="text-2xl text-[#0194F3]" />
            <input
              type="date"
              name="checkIn"
              id="checkIn"
              className="w-full outline-none text-black font-semibold cursor-pointer text-sm"
              onChange={changeHandler}
              value={formMenu.checkIn}
            />
          </div>
        </div>
        {/* Akhir Check In */}
        {/* Awal Check Out */}
        <div className=" w-2/14 h-full flex flex-col gap-2 justify-center items-start">
          <div className="text-sm font-semibold">Check Out Date</div>
          <div className="w-full flex items-center justify-start h-16 px-3 bg-white gap-2 border-2 border-r-0 border-[#0194F3]">
            <BsCalendar2DateFill className="text-2xl text-[#0194F3]" />
            <input
              type="date"
              name="checkOut"
              id="checkOut"
              className="w-full outline-none text-black font-semibold cursor-pointer text-sm"
              onChange={changeHandler}
              value={formMenu.checkOut}
            />
          </div>
        </div>
        {/* Akhir Check Out */}
        {/* Awal Guest Room */}
        <div className=" w-5/14 h-full flex flex-col gap-2 justify-center items-start">
          <div className="text-sm font-semibold">Guests & Rooms</div>
          <div className="w-full flex items-center justify-start h-16 px-3 bg-white gap-2 border-2 border-r-0  border-[#0194F3] text-black text-sm font-semibold">
            {/* Awal Adult */}
            <div className=" w-1/3 flex items-center justify-start gap-2">
              <IoMdPerson className="text-2xl text-[#0194F3]" />
              <div>Adult</div>
              <input
                type="number"
                name="adult"
                id="adult"
                className="w-10 h-8 text-center outline-none bg-black/10 rounded-md"
                min={1}
                onChange={changeHandler}
                value={formMenu.adult}
              />
            </div>
            {/* Akhir Adult */}

            {/* Awal Child */}
            <div className="w-1/3  flex items-center justify-start gap-2">
              <FaChildDress className="text-2xl text-[#0194F3]" />
              <div>Child</div>
              <input
                type="number"
                name="child"
                id="child"
                className="w-10 h-8 text-center outline-none bg-black/10 rounded-md"
                onChange={changeHandler}
                value={formMenu.child}
              />
            </div>
            {/* Akhir Child */}
            {/* Awal Room */}
            <div className="w-1/3  flex items-center justify-start gap-2">
              <FaDoorClosed className="text-2xl text-[#0194F3]" />
              <div>Room</div>
              <input
                type="number"
                name="room"
                id="room"
                className="w-10 h-8 text-center outline-none bg-black/10 rounded-md"
                min={1}
                onChange={changeHandler}
                value={formMenu.room}
              />
            </div>
            {/* Akhir Room */}
          </div>
        </div>
        {/* Akhir Guest Room */}
        {/* Awal Search */}
        <div className="bg-pink-500 w-1/14 h-full flex flex-col gap-2 justify-center items-start">
          <div className="text-sm font-semibolds invisible">Search</div>
          <button
            type="submit"
            disabled={loading}
            className={`${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-800 cursor-pointer"
            } w-full h-16 flex justify-center items-center rounded-r-2xl transition-colors duration-300`}
          >
            {loading ? (
              <div className="animate-spin h-5 w-5 border-4 border-t-transparent border-white rounded-full"></div>
            ) : (
              <GoSearch className="text-3xl" />
            )}
          </button>
        </div>
        {/* Akhir Search */}
      </div>
      {/* Akhir Form Menu */}

      {/* Awal Trusted By */}
      <div className="w-full h-fit flex justify-center items-center">
        <div className="flex justify-center items-center flex-col gap-2 ">
          <div className="text-sm">Trusted By</div>
          <div className="flex justify-center items-center gap-6 flex-wrap transition-opacity duration-1000 p-2 border border-slate-700   rounded-md">
            {currentGroup.map((logo, index) => (
              <Image
                key={index}
                src={logo}
                alt={`Airline logo ${index}`}
                width={30}
                height={22}
                className="object-contain transition-opacity duration-1000 opacity-100 hover:scale-110"
              />
            ))}
          </div>
        </div>
      </div>
      {/* Akhir Trusted By */}
    </form>
  );
}

// {
//   _id: "",

//   // Basic Hotel Info
//   name: "",
//   description: "",
//   starRating: 0,
//   category: "",

//   // Location
//   location: {
//     address: "",
//     city: "",
//     province: "",
//     country: "",
//     postalCode: "",
//     coordinates: {
//       latitude: 0,
//       longitude: 0
//     }
//   },

//   // Contact Info
//   contact: {
//     phone: "",
//     email: "",
//     website: ""
//   },

//   // Hotel Policies
//   policies: {
//     checkInTime: "",
//     checkOutTime: "",
//     cancellationPolicy: "",
//     petPolicy: "",
//     smokingPolicy: "",
//     ageRestriction: ""
//   },

//   // Hotel Images
//   images: [
//     {
//       id: "",
//       url: "",
//       altText: "",
//       type: "",
//       isPrimary: false,
//       order: 0
//     }
//   ],

//   // Hotel Facilities
//   facilities: [
//     {
//       id: "",
//       name: "",
//       type: "",
//       category: "",
//       isFree: false,
//       description: "",
//       icon: "",
//       openingHours: ""
//     }
//   ],

//   // Rooms
//   rooms: [
//     {
//       id: "",
//       roomType: "",
//       roomName: "",
//       description: "",
//       maxOccupancy: 0,
//       bedType: "",
//       roomSize: 0,
//       basePrice: 0,
//       totalRooms: 0,

//       // Room Amenities
//       amenities: [
//         {
//           name: "",
//           icon: "",
//           category: ""
//         }
//       ],

//       // Room Images
//       images: [
//         {
//           id: "",
//           url: "",
//           altText: "",
//           isPrimary: false,
//           order: 0
//         }
//       ],

//       // Room Availability
//       availability: [
//         {
//           date: "",
//           availableRooms: 0,
//           price: 0,
//           isBlocked: false
//         }
//       ]
//     }
//   ],

//   // Metadata
//   status: "",
//   createdAt: "",
//   updatedAt: "",

//   // SEO & Search
//   tags: [],
//   searchKeywords: []
// }
