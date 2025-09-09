import { VscLoading } from "react-icons/vsc";

export default function Loading() {
  return (
    <div className="flex flex-col text-white gap-4 justify-center items-center w-full min-h-screen bg-[#0B98F0]">
      <VscLoading className="animate-spin  text-6xl" />
      <div className="font-bold text-2xl animate-pulse">
        Loading Expired Payment ...
      </div>
    </div>
  );
}
