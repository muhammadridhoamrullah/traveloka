"use client";
import { FaLongArrowAltLeft } from "react-icons/fa";

import { useRouter } from "next/navigation";

export default function ButtonBack() {
  return (
    <div
      onClick={() => window.history.back()}
      className="flex justify-center items-center w-20 border border-white p-1 gap-2 h-10 rounded-md text-white cursor-pointer hover:bg-blue-700 transition-all duration-300 hover:border-transparent"
    >
      <FaLongArrowAltLeft className="text-xl" />
      <div>Back</div>
    </div>
  );
}
