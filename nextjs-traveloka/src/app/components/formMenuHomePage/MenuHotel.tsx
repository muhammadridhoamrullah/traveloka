"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FaHotel } from "react-icons/fa";
import { MdApartment } from "react-icons/md";
import { MdVilla } from "react-icons/md";

export default function MenuHotel() {
  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];
  // state untuk form menu
  const [formMenu, setFormMenu] = useState({
    typeAccomodation: "hotel",
    destination: "",
    checkIn: today,
    checkOut: tomorrow,
    guest: 1,
    room: 1,
  });
  console.log(formMenu, "<<< From menu");

  // Variabel for easier access
  const typeAcc = formMenu.typeAccomodation;

  // Function for change type accomodation
  function changeTypeAcc(type: string) {
    setFormMenu({
      ...formMenu,
      typeAccomodation: type,
    });
  }

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

  console.log(currentGroup, "<<< current group");

  // set interval untuk mengubah tiap 2 detik
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalGroups);
    }, 3000);

    return () => clearInterval(interval);
  }, [totalGroups]);
  return (
    <form className=" w-full h-full flex flex-col justify-between items-start">
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
      <div>Form Menu</div>
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
