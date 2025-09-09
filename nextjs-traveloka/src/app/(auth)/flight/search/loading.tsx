import { VscLoading } from "react-icons/vsc";

export default function Loading() {
  return (
    <div className="bg-blue-950 w-full min-h-screen flex justify-between items-start gap-2 pt-36 px-20 pb-5   ">
      <div className="bg-gray-400 w-1/3 h-96 rounded-2xl animate-pulse"></div>
      {/* Awal Kanan */}
      <div className="w-2/3 h-fit flex flex-col gap-2">
        <div className="bg-gray-400 w-full h-40 rounded-2xl animate-pulse "></div>
        <div className="bg-gray-400 w-20 h-8 rounded-2xl animate-pulse"></div>
        <div className="bg-gray-400 w-full h-32 rounded-2xl animate-pulse"></div>
      </div>
      {/* Akhir Kanan */}
    </div>
  );
}
