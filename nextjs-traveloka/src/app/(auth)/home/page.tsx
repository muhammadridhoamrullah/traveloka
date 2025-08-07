"use client";

import { generateMetaData } from "@/db/utils/metadata";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Homepage() {
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
  console.log("Total Groups:", totalGroups);

  // dapatkan logo dari grup yang sedang aktif
  const currentGroup = airlineCompanies.slice(
    currentIndex * GROUP_SIZE,
    currentIndex * GROUP_SIZE + GROUP_SIZE
  );
  console.log("Current Group:", currentGroup);

  // set interval untuk mengubah tiap 2 detik
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalGroups);
    }, 3000);

    return () => clearInterval(interval);
  }, [totalGroups]);

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

  return (
    <div className="w-full min-h-screen">
      <div className="pt-36 pb-5 w-full min-h-screen bg-[url('/bg_home.jpg')] bg-cover bg-center text-white flex flex-col justify-between items-center">
        <div className="font-bold text-3xl">
          Plan, Book & Travel: Flights, Hotels & Activities Worldwide
        </div>
        <div>FORM PEMESANAN</div>
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
      <div>Section 2</div>
      <div>Section 3</div>
      <div>Section 4</div>
      <div>Section 5</div>
    </div>
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
