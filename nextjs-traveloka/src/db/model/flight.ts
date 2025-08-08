import { ObjectId } from "mongodb";
import { GetDb } from "../config";
import { Flight } from "../type/flight";

type InputCreateFlight = Omit<
  Flight,
  "_id" | "createdAt" | "updatedAt" | "deletedAt"
>;

type InputSearchFlight = {
  departureAirport: string;
  arrivalAirport: string;
  departureTime: Date;
  cabinClass: string;
  passengerCount: number;
};

const COLLECTION_NAME = "flights";

export async function CreateFlight(input: InputCreateFlight, UserId: string) {
  const db = await GetDb();

  // Check flight number uniqueness
  const checkFlightNumber = await db.collection(COLLECTION_NAME).findOne({
    flightNumber: input.flightNumber,
  });

  //   if flight number already exists, throw an error
  if (checkFlightNumber) {
    throw new Error("Flight number already exists");
  }

  //   Check if departure and arrival times are valid
  if (input.departure.time >= input.arrival.time) {
    throw new Error("Departure time must be before arrival time");
  }

  const duration2 = Math.floor(
    (new Date(input.arrival.time).getTime() -
      new Date(input.departure.time).getTime()) /
      (1000 * 60)
  );

  // Create flight
  const flight = {
    ...input,
    createdBy: new ObjectId(UserId),
    duration: duration2,
    cabinClasses: input.cabinClasses.map((el) => ({
      ...el,
      seatsAvailable: el.seatsAvailable ?? el.totalSeats,
    })),
    departure: {
      ...input.departure,
      time: new Date(input.departure.time),
    },
    arrival: {
      ...input.arrival,
      time: new Date(input.arrival.time),
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  // Insert flight into the database
  const result = await db.collection(COLLECTION_NAME).insertOne(flight);

  if (!result.acknowledged) {
    throw new Error("Failed to create flight");
  }

  return {
    message: "Flight created successfully",
    flightId: result.insertedId,
  };
}

export async function GetAllFlights(input: InputSearchFlight) {
  const db = await GetDb();
  console.log("input", input.passengerCount);

  // Awal hari
  const inputDate = new Date(input.departureTime);
  const startOfDay = new Date(inputDate);
  startOfDay.setHours(0, 0, 0, 0);
  console.log("startOfDay MODEL", startOfDay);

  // Akhir hari
  const endOfDay = new Date(inputDate);
  endOfDay.setHours(23, 59, 59, 999);

  console.log("endOfDay MODEL", endOfDay);

  const currentDate = new Date();
  const today = new Date(currentDate);
  today.setHours(0, 0, 0, 0);

  // Cek tanggal keberangkatan tidak boleh di masa lalu
  if (startOfDay < today) {
    throw new Error("Departure time cannot be in the past");
  }

  // Build query
  const query: any = {
    "departure.airport": input.departureAirport,
    "departure.time": {
      $gt: startOfDay,
      $lt: endOfDay, // within the same day
    },
    "arrival.airport": input.arrivalAirport,
    cabinClasses: {
      $elemMatch: {
        class: input.cabinClass,
        seatsAvailable: { $gte: input.passengerCount },
      },
    },
  };

  const agg = [
    {
      $match: query,
    },
    {
      $lookup: {
        from: "users",
        localField: "createdBy",
        foreignField: "_id",
        as: "UserCreated",
      },
    },
    {
      $unwind: {
        path: "$UserCreated",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        "UserCreated.password": 0,
      },
    },
    {
      $sort: {
        "departure.time": 1,
      },
    },
  ];

  // Find flights in the database
  const findFlights = await db
    .collection(COLLECTION_NAME)
    .aggregate(agg)
    .toArray();

  return findFlights;
}

export async function GetAllFlightsUnfiltered() {
  const db = await GetDb();

  const agg = [
    {
      $lookup: {
        from: "users",
        localField: "UserId",
        foreignField: "_id",
        as: "UserCreated",
      },
    },
    {
      $unwind: {
        path: "$UserCreated",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        "UserCreated.password": 0,
      },
    },
    {
      $sort: {
        "departure.time": 1,
      },
    },
  ];

  const findAllFlights = await db
    .collection(COLLECTION_NAME)
    .aggregate(agg)
    .toArray();

  return findAllFlights;
}

// type InputCreateFlight = {
//     flightNumber: string;
//     airline: string;
//     aircraft: string;
//     departure: {
//         airport: string;
//         city: string;
//         time: Date;
//         timezone?: string;
//     };
//     arrival: {
//         airport: string;
//         city: string;
//         time: Date;
//         timezone?: string;
//     };
//     duration: number;
//     cabinClasses: FlightClassType[];
//     stops?: FlightStop[] | undefined;
// }

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

// export interface FlightClassType {
//   class: FlightClass;
//   price: number;
//   seatsAvailable: number;
//   totalSeats: number;
// }
