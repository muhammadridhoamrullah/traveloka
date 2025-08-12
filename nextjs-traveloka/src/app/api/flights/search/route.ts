import { GetAllFlights } from "@/db/model/flight";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Ambil query parameters dari URL
    const searchParams = request.nextUrl.searchParams;

    const departureAirport = searchParams.get("departureAirport");
    const departureTime = searchParams.get("departureTime");
    const arrivalAirport = searchParams.get("arrivalAirport");
    const cabinClass = searchParams.get("cabinClass");
    const passengerCount = searchParams.get("passengerCount");
    const airline = searchParams.get("airline");

    // Validasi query parameters
    if (
      !departureAirport ||
      !departureTime ||
      !arrivalAirport ||
      !cabinClass ||
      !passengerCount
    ) {
      throw new Error(
        "Missing required query parameters: departureAirport, departureTime, arrivalAirport, cabinClass"
      );
    }

    const currentDate = new Date();
    const today = new Date(currentDate);
    today.setHours(0, 0, 0, 0);

    const inputDate = new Date(departureTime);
    inputDate.setHours(0, 0, 0, 0);

    // Cek apakah tanggal keberangkatan tidak boleh di masa lalu
    if (inputDate < today) {
      throw new Error("Departure time cannot be in the past");
    }

    const searchParamsFlight = {
      airline: airline || undefined,
      departureAirport,
      arrivalAirport,
      departureTime: new Date(departureTime),
      cabinClass,
      passengerCount: Number(passengerCount),
    };

    const result = await GetAllFlights(searchParamsFlight);

    return NextResponse.json(
      {
        flights: result,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 400,
        }
      );
    } else {
      return NextResponse.json(
        {
          message: "Internal Server Error",
        },
        {
          status: 500,
        }
      );
    }
  }
}

// type InputSearchFlight = {
//   airline?: string;
//   departureAirport: string;
//   arrivalAirport: string;
//   departureTime: Date;
//   cabinClass: string;
//   passengerCount: number;
// };
