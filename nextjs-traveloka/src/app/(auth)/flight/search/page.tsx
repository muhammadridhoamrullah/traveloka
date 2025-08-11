import CardResultSearchFlight from "@/app/components/flight/CardResultSearchFlight";
import { formatDate } from "@/db/utils/helperFunctions";
import { generateMetaData } from "@/db/utils/metadata";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { useSearchParams } from "next/navigation";
import { FaArrowRight } from "react-icons/fa";

interface Props {
  searchParams: {
    departureAirport: string;
    arrivalAirport: string;
    departureTime: string;
    cabinClass: string;
    passengerCount: number;
  };
}

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const params = await searchParams;

  return {
    title: `Flight Search: ${params.departureAirport} to ${params.arrivalAirport} - Traveloka`,
    description: `Find flights from ${params.departureAirport} to ${params.arrivalAirport} on ${params.departureTime}. Compare prices and book with Traveloka.`,
    icons: {
      icon: "/traveloka_logo.png",
    },
    openGraph: {
      title: `Flight Search: ${params.departureAirport} to ${params.arrivalAirport}`,
      description: `Find flights from ${params.departureAirport} to ${params.arrivalAirport} on ${params.departureTime}`,
      url: `/flight/search?departureAirport=${params.departureAirport}&arrivalAirport=${params.arrivalAirport}&departureTime=${params.departureTime}`,
      images: ["/traveloka_logo.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: `Flight Search: ${params.departureAirport} to ${params.arrivalAirport}`,
      description: `Find flights from ${params.departureAirport} to ${params.arrivalAirport} on ${params.departureTime}`,
    },
  };
}

async function fetchResultSearchFlight(params: Props["searchParams"]) {
  const cookiesStore = await cookies();

  const queryParams = new URLSearchParams({
    departureAirport: params.departureAirport,
    arrivalAirport: params.arrivalAirport,
    departureTime: params.departureTime,
    cabinClass: params.cabinClass,
    passengerCount: params.passengerCount.toString(),
  });

  const apiUrl = process.env.NEXT_PUBLIC_CLIENT_URL;

  const response = await fetch(
    `${apiUrl}/api/flights/search?${queryParams.toString()}`,
    {
      method: "GET",
      headers: {
        Cookie: cookiesStore.toString(),
      },
    }
  );

  const result = await response.json();
  console.log("Result from API search flight", result);

  if (!response.ok) {
    throw new Error(result.message || "Failed to fetch flight data");
  }

  return result;
}

export default async function SearchFlightsPage({ searchParams }: Props) {
  const params = await searchParams;

  const data = await fetchResultSearchFlight(params);
  console.log("data di page search flight", data);

  // Ambil params

  return (
    <div className="bg-blue-950 w-full min-h-screen pt-36 px-20 pb-5 text-black flex justify-between items-start gap-2">
      {/* Awal Filter */}
      <div className="bg-amber-300 w-1/3 h-full">Filter</div>
      {/* Akhir Filter */}

      {/* Awal Search Result & All Flights */}
      <div className=" w-2/3 h-full flex flex-col gap-2">
        {/* Awal Search Result */}
        <div className="flex flex-col">
          {/* Awal Search Result */}
          <div className="bg-black/70 py-2 px-3 rounded-t-xl flex flex-col gap-2 text-white">
            <div className="font-semibold text-xl  flex items-center justify-between">
              <div className="text-2xl">{params.departureAirport}</div>
              <FaArrowRight className="text-2xl" />
              <div className="text-2xl">{params.arrivalAirport}</div>
            </div>
            <div className="border border-slate-500"></div>
            <div className=" flex items-center gap-2 ">
              <div>{formatDate(params.departureTime)}</div>
              <div>|</div>
              <div>{params.passengerCount} passenger(s)</div>
              <div>|</div>
              <div>{params.cabinClass}</div>
            </div>
          </div>
          {/* Akhir Search Result */}

          {/* Awal Lowest Price dll */}
          <div className="bg-white py-2 px-3 h-24 flex justify-between items-center rounded-b-xl shadow-lg font-semibold">
            <div className="flex flex-col gap-1  h-full justify-between items-start">
              <div className="text-[#0194F3]">Lower</div>
              <div className="flex flex-col">
                <div className="text-[#707577]">USD</div>
                <div className="text-xs text-[#707577]">Long Flight</div>
              </div>
            </div>
            <div className="flex flex-col gap-1  h-full justify-between items-start">
              <div className="text-[#0194F3]">Shortest</div>
              <div className="flex flex-col">
                <div className="text-[#707577]">USD</div>
                <div className="text-xs text-[#707577]">Long Flight</div>
              </div>
            </div>
            <div className="flex flex-col gap-1  h-full justify-between items-start">
              <div className="text-[#0194F3]">Total Flight</div>
              <div className="text-[#707577]">12 Flights</div>
            </div>
          </div>
          {/* Akhir Lowest Price dll */}
        </div>
        {/* Akhir Search Result */}

        {/* Awal All Flights */}
        <div className="bg-white">{CardResultSearchFlight()}</div>
        {/* Akhir All Flights */}
      </div>
      {/* Akhir Search Result & All Flights */}
    </div>
  );
}
