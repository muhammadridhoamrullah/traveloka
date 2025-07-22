import Image from "next/image";
import Link from "next/link";

export default function Home() {
  function classButtonLoginHome() {
    return "py-2 px-6 border border-white rounded-md hover:bg-white hover:text-[#0194F3] transition-colors duration-300";
  }

  return (
    <div
      className={`flex flex-col gap-4 justify-center items-center min-h-screen bg-[#0194F3] text-white`}
    >
      <div className="flex gap-4  justify-center  items-center">
        <Image
          alt="Traveloka Logo"
          src={"/traveloka_logo_putih.png"}
          width={50}
          height={50}
        />
        <div className="font-bold text-5xl">traveloka</div>
      </div>
      <div className="flex gap-4">
        <Link className={classButtonLoginHome()} href={"/login"}>
          Log In
        </Link>
        <Link className={classButtonLoginHome()} href={"/home"}>
          Home
        </Link>
      </div>
    </div>
  );
}
