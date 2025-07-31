import { CreateFlight, GetAllFlightsUnfiltered } from "@/db/model/flight";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const schemaCreateFlight = z
  .object({
    flightNumber: z.string().min(1, { message: "Flight number is required" }),
    airline: z.string().min(1, { message: "Airline is required" }),
    aircraft: z.string().min(1, { message: "Aircraft is required" }),
    departure: z.object({
      airport: z.string().min(1, { message: "Departure airport is required" }),
      city: z.string().min(1, { message: "Departure city is required" }),
      time: z.string().refine((date) => !isNaN(new Date(date).getTime()), {
        message: "Departure time must be a valid date",
      }),
    }),
    arrival: z.object({
      airport: z.string().min(1, { message: "Arrival airport is required" }),
      city: z.string().min(1, { message: "Arrival city is required" }),
      time: z.string().refine((date) => !isNaN(new Date(date).getTime()), {
        message: "Arrival time must be a valid date",
      }),
    }),
    cabinClasses: z.array(
      z.object({
        class: z.enum(["Economy", "Business", "First Class"]),
        price: z.number().positive({ message: "Price must be positive" }),
        totalSeats: z
          .number()
          .int()
          .positive({ message: "Total seats must be positive" }),
      })
    ),
  })
  .refine(
    (data) => new Date(data.departure.time) < new Date(data.arrival.time),
    {
      message: "Departure time must be before arrival time",
      path: ["departure.time"],
    }
  );

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const validatedData = schemaCreateFlight.safeParse(data);

    if (!validatedData.success) {
      throw validatedData.error;
    }

    const creatingFlight = await CreateFlight(data);

    return NextResponse.json(
      {
        message: creatingFlight.message,
        flightId: creatingFlight.flightId,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      const path = error.issues[0].path[0];
      const message = error.issues[0].message;

      return NextResponse.json(
        {
          message: `Validation error on path ${String(path)}: ${message}`,
        },
        {
          status: 400,
        }
      );
    } else if (error instanceof Error) {
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

export async function GET(request: NextRequest) {
  try {
    const findAllFlights = await GetAllFlightsUnfiltered();

    return NextResponse.json(
      {
        flights: findAllFlights,
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

// {
//   "flightNumber": "GA-123",
//   "airline": "Garuda Indonesia",
//   "aircraft": "Boeing 737-800",
//   "departure": {
//     "airport": "CGK",
//     "city": "Jakarta",
//     "time": "2025-08-01T08:00:00Z"
//   },
//   "arrival": {
//     "airport": "DPS",
//     "city": "Bali",
//     "time": "2025-08-01T10:00:00Z"
//   },
//   "cabinClasses": [
//     {
//       "class": "Economy",
//       "price": 1200000,
//       "totalSeats": 100
//     },
//     {
//       "class": "Business",
//       "price": 3500000,
//       "totalSeats": 20
//     }
//   ]
// }
