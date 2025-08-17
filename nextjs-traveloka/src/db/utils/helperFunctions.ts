import React, { ReactElement } from "react";

export function formatDate(dateString: string) {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  };

  return date.toLocaleDateString("en-US", options);
}

export function getUTCDayRange(dateObj: Date) {
  const startOfDay = new Date(
    Date.UTC(
      dateObj.getUTCFullYear(),
      dateObj.getUTCMonth(),
      dateObj.getUTCDate(),
      0,
      0,
      0,
      0
    )
  );

  const endOfDay = new Date(
    Date.UTC(
      dateObj.getUTCFullYear(),
      dateObj.getUTCMonth(),
      dateObj.getUTCDate(),
      23,
      59,
      59,
      999
    )
  );

  return { startOfDay, endOfDay };
}

export function formatRupiah(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
}

export function formatDuration(duration: number) {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;

  if (hours > 0 && minutes > 0) return `${hours}h ${minutes}m`;
  if (hours > 0) return `${hours}h`;

  return `${minutes}m`;
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

export function getAirlineLogoFromUtils(airlineName: string): string {
  return airlineLogo[airlineName] || "/traveloka_logo.png";
}

let facilitiesLogo: { [key: string]: string } = {
  Meal: "ImSpoonKnife",
  Entertainment: "BiMoviePlay",
  WiFi: "IoWifiSharp",
  "Premium Meal": "GiHotMeal",
  "Extra Legroom": "MdAirlineSeatReclineExtra",
  "Gourmet Meal": "MdSetMeal",
  "Flat Bed": "TbBedFlat",
  "Lounge Access": "GrLounge",
  "Chef Meal": "PiChefHatBold",
  "Private Suite": "MdOutlineAirlineSeatIndividualSuite",
  Chauffeur: "FaCar",
  Snack: "GiChipsBag",
  "Snack Purchase": "IoFastFoodOutline",
  Drink: "RiDrinks2Line",
  "In-flight Entertainment": "RiMovieAiLine",
  "Extra Space": "FaBed",
  default: "IoMdHelpCircleOutline",
};

export function getFacilityIconName(facilityName: string): string {
  return facilitiesLogo[facilityName] || facilitiesLogo["default"];
}

export function getTimeAndDate(time: Date) {
  const date = new Date(time);
  // Ambil jam dan menit dari waktu
  const hours = date.getUTCHours().toString().padStart(2, "0");
  const minutes = date.getUTCHours().toString().padStart(2, "0");

  // Ambil tanggal, bulan, dan tahun
  const day = date.getUTCDate().toString().padStart(2, "0");
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0"); // Bulan dimulai dari 0
  const year = date.getUTCFullYear();

  return {
    time: `${hours}:${minutes}`,
    date: `${day} - ${month} - ${year}`,
  };
}
