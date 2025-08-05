export type FlightClass = "Economy" | "Business" | "First Class";
export interface FlightClassType {
  class: FlightClass;
  price: number;
  seatsAvailable: number;
  totalSeats: number;
}

export interface FlightStop {
  airport: string;
  city: string;
  layoverTime: number;
}

export interface Flight {
  _id: string;
  flightNumber: string;
  airline: string;
  aircraft: string;
  departure: {
    airport: string;
    city: string;
    time: Date;
    timezone?: string;
  };
  arrival: {
    airport: string;
    city: string;
    time: Date;
    timezone?: string;
  };
  duration: number;
  cabinClasses: FlightClassType[];
  stops?: FlightStop[];
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  deletedAt?: Date;
}
