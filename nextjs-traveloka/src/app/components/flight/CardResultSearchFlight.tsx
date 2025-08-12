import { Flight } from "@/db/type/flight";

interface Props {
  data: Flight;
  key: number;
}

export default async function CardResultSearchFlight({ data, key }: Props) {
  return (
    <div className="bg-green-900">
      <h1>Later this will be card</h1>
    </div>
  );
}
