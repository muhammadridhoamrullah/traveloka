"use client";

import { generateMetaData } from "@/db/utils/metadata";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaHotel } from "react-icons/fa";
import { FaPlaneUp } from "react-icons/fa6";
import { MdCarRental } from "react-icons/md";
import { FaShuttleVan } from "react-icons/fa";
import { FaMapMarkedAlt } from "react-icons/fa";
import MenuFlight from "@/app/components/formMenuHomePage/MenuFlight";
import MenuCarRental from "@/app/components/formMenuHomePage/MenuCarRental";
import MenuAirportTransfer from "@/app/components/formMenuHomePage/MenuAirportTransfer";
import MenuThingsToDo from "@/app/components/formMenuHomePage/MenuThingsToDo";
import MenuHotel from "@/app/components/formMenuHomePage/MenuHotel";
import SkeletonPayment from "@/app/components/skeleton/profile/SkeletonPayment";
import SkeletonHomePage from "@/app/components/skeleton/home/SkeletonHomePage";

export default function Homepage() {
  const [loading, setLoading] = useState(true);
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

  // Untuk menu
  const [activeMenu, setActiveMenu] = useState("flights");

  // untuk loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);

    return () => clearTimeout(timer);
  }, []);

  // Generate metadata

  generateMetaData({
    title: "Home - Traveloka",
    description:
      "Traveloka, a Southeast Asian online travel company, utilizes various types of metadata to enhance user experience and manage its platform. This includes descriptive metadata like titles, creators, keywords, and descriptions, as well as data about user interactions such as geographic location, IP address, browser type, and pages visited. Traveloka uses this information to personalize offers, suggest relevant activities, and maintain platform security.",
    canonical: "https://traveloka.com/home",
    icons: {
      icon: "/traveloka_logo.png",
    },
    ogTitle: "Home - Traveloka",
    ogDescription:
      "Traveloka, a Southeast Asian online travel company, utilizes various types of metadata to enhance user experience and manage its platform. This includes descriptive metadata like titles, creators, keywords, and descriptions, as well as data about user interactions such as geographic location, IP address, browser type, and pages visited. Traveloka uses this information to personalize offers, suggest relevant activities, and maintain platform security. ",
    ogUrl: "https://traveloka.com/home",
    ogImage: "/traveloka_logo.png",
  });

  // style list menu
  function styleListMenuForm(menu: string) {
    return `flex gap-2 justify-center items-center py-2 px-4 rounded-full border border-transparent  hover:border-white  cursor-pointer ${
      activeMenu === menu ? "bg-white  text-[#0194F3]" : "hover:text-white"
    }`;
  }

  // render form menu berdasarkan activeMenu
  function renderFormMenu() {
    switch (activeMenu) {
      case "hotels":
        return <MenuHotel />;
      case "car-rental":
        return <MenuCarRental />;
      case "airport-transfer":
        return <MenuAirportTransfer />;
      case "things-to-do":
        return <MenuThingsToDo />;
      default:
        return <MenuFlight />;
    }
  }

  return (
    <>
      {loading ? (
        <SkeletonHomePage />
      ) : (
        <div className="w-full min-h-screen">
          {/* Awal Semua Section */}
          {/* Awal Section 1 */}
          <div className="pt-36 px-20 pb-5 w-full min-h-screen bg-[url('/bg_home.jpg')] bg-cover bg-center text-white flex flex-col justify-between items-center">
            {/* Awal Opening Letter */}
            <div className="font-bold text-3xl">
              Plan, Book & Travel: Flights, Hotels & Activities Worldwide
            </div>
            {/* Akhir Opening Letter */}

            {/* Awal Form Menu */}
            <div className="text-slate-300 font-semibold h-fit w-full flex justify-start items-center gap-2 border-b border-b-white pb-4">
              <div
                className={styleListMenuForm("hotels")}
                onClick={() => setActiveMenu("hotels")}
              >
                <FaHotel className="text-2xl" />
                <div>Hotels</div>
              </div>
              <div
                className={styleListMenuForm("flights")}
                onClick={() => setActiveMenu("flights")}
              >
                <FaPlaneUp className="text-2xl" />
                <div>Flights</div>
              </div>
              <div
                className={styleListMenuForm("car-rental")}
                onClick={() => setActiveMenu("car-rental")}
              >
                <MdCarRental className="text-2xl" />
                <div>Car Rental</div>
              </div>
              <div
                className={styleListMenuForm("airport-transfer")}
                onClick={() => setActiveMenu("airport-transfer")}
              >
                <FaShuttleVan className="text-2xl" />
                <div>Airport Transfer</div>
              </div>
              <div
                className={styleListMenuForm("things-to-do")}
                onClick={() => setActiveMenu("things-to-do")}
              >
                <FaMapMarkedAlt className="text-2xl" />
                <div>Things To Do</div>
              </div>
            </div>
            {/* Akhir Form Menu */}

            {/* Awal Form Pemesanan */}
            <div className="w-full h-full ">{renderFormMenu()}</div>
            {/* Akhir Form Pemesanan */}

            {/* Awal Trusted By */}
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
            {/* Akhir Trusted By */}
          </div>
          {/* Akhir Section 1 */}
          <div>Section 2</div>
          <div>Section 3</div>
          <div>Section 4</div>
          <div>Section 5</div>
          {/* Akhir Semua Section */}
        </div>
      )}
    </>
  );
}

// interface MetaOptions {
//   title?: string;
//   description?: string;
//   canonical?: string;
//   icons: {
//     icon?: string;
//   };
//   ogTitle?: string;
//   ogDescription?: string;
//   ogUrl?: string;
//   ogImage?: string;
// }
