import { useSearchParams } from "next/navigation";

interface Props {
  searchParams: {
    departureAirport: string;
    arrivalAirport: string;
    departureTime: string;
    cabinClass: string;
    passengerCount: number;
  };
}

export default async function SearchFlightsPage({ searchParams }: Props) {
  const params = await searchParams;

  // Ambil params
  return (
    <div>
      <h1>Search Flight {params.arrivalAirport}</h1>
    </div>
  );
}
