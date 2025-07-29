import { GetDb } from "../config";
import { Flight } from "../type/flight";

type InputCreateFlight = Omit<
  Flight,
  "_id" | "createdAt" | "updatedAt" | "deletedAt"
>;

const COLLECTION_NAME = "flights";

export async function CreateFlight(input: InputCreateFlight) {
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
  console.log("Duration in minutes:", duration2);

  // Create flight
  const flight = {
    ...input,
    duration: Math.floor(
      (new Date(input.arrival.time).getTime() -
        new Date(input.departure.time).getTime()) /
        (1000 * 60)
    ),
    cabinClasses: input.cabinClasses.map((el) => ({
      ...el,
      seatsAvailable: el.seatsAvailable ?? el.totalSeats,
    })),
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
