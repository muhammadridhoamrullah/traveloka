export type FlightClass = "Economy" | "Business" | "First Class";
export interface FlightClassType {
  class: FlightClass;
  price: number;
  seatsAvailable: number;
  totalSeats: number;
  facilities?: string[];
  baggage?: {
    checked: number;
    cabin: number;
  };
}

export interface FlightStop {
  airportCode: string;
  airportName: string;
  city: string;
  country?: string;
  terminal?: string;
  gate?: string;
  arrivalTime: Date;
  departureTime: Date;
  layoverTime: number;
}

export interface Flight {
  _id: string;
  flightNumber: string;
  airline: string;
  aircraft: string;
  totalSeats: number;
  departure: {
    airportCode: string;
    airportName: string;
    city: string;
    time: Date;
    country?: string;
    terminal?: string;
    gate?: string;
    timezone?: string;
  };
  arrival: {
    airportCode: string;
    airportName: string;
    city: string;
    country?: string;
    terminal?: string;
    gate?: string;
    time: Date;
    timezone?: string;
  };
  duration: number;
  cabinClasses: FlightClassType[];
  stops?: FlightStop[];
  createdAt: Date;
  UserId: string;
  updatedAt: Date;
  deletedAt?: Date;
}
