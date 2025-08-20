"use client";

import { FaRegCreditCard } from "react-icons/fa6";
import { CiBank } from "react-icons/ci";
import { MdContentCopy } from "react-icons/md";
import { LuPlane } from "react-icons/lu";
import { GoPeople } from "react-icons/go";
import { TiDocumentText } from "react-icons/ti";
import { MdPhoneIphone } from "react-icons/md";
import { MdOutlinePayment } from "react-icons/md";
import { RiCustomerService2Line } from "react-icons/ri";
import { AiOutlineInfoCircle } from "react-icons/ai";

import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";

export default function PendingPayment() {
  let vaNumber = "8001234567890123";

  function handleCopy() {
    navigator.clipboard.writeText(vaNumber);
    toast.success("Virtual Account Number copied!");
  }
  return (
    <div className="bg-blue-950 w-full min-h-screen pt-36 px-20 pb-5 flex flex-col justify-start items-center text-white gap-6">
      <Toaster position="top-center" reverseOrder={false} />
      {/* Awal Payment Pending */}
      <div className="flex flex-col items-center gap-2">
        <Image
          src={"/payment/iconPendingPayment.png"}
          height={100}
          width={100}
          alt="Logo Pending"
        />
        <div className="font-bold text-3xl">Waiting For Payment</div>
        <div className="text-sm text-slate-400">
          Your booking has been created. Please complete the payment before the
          deadline.
        </div>
      </div>
      {/* Akhir Payment Pending */}

      {/* Awal Remaining Payment Time */}
      <div className="bg-red-900 w-3/4">Remaining</div>
      {/* Akhir Remaining Payment Time */}

      {/* Awal Sisi Kiri dan Kanan */}
      <div className="flex justify-between items-start w-3/4 gap-6">
        {/* Awal Kiri */}
        <div className=" w-2/3 flex flex-col gap-4">
          {/* Awal Payment Instructions */}
          <div className="bg-black/70 w-full h-fit p-4 flex flex-col gap-2 rounded-xl justify-center items-start">
            {/* Awal Judul Payment Instructions */}
            <div className="flex items-center gap-2 mb-5">
              <FaRegCreditCard className="text-2xl" />
              <div className="text-xl font-semibold">Payment Instructions</div>
            </div>
            {/* Akhir Judul Payment Instructions */}

            {/* Awal Bank */}
            <div className="bg-gray-200 w-full p-4 h-fit text-blue-700 rounded-xl flex flex-col gap-2 justify-center items-start">
              {/* Awal Nama Bank */}
              <div className="flex justify-start items-center gap-2 ">
                <CiBank className="text-3xl" />
                <div className="flex flex-col gap-1 justify-center items-start text-sm">
                  <div className="font-bold">BANK BCA</div>
                  <div className="text-xs">Virtual Account</div>
                </div>
              </div>
              {/* Akhir Nama Bank */}

              {/* Awal Nomor Virtual Account */}
              <div className="bg-white w-full h-fit p-2 rounded-md flex justify-between items-end">
                {/* Awal Nomor */}
                <div className="  h-full flex flex-col gap-2 justify-center items-start">
                  <div className="text-sm text-blue-500">
                    Virtual Account Number
                  </div>
                  <div className="text-xl font-semibold text-black">
                    8001234567890123
                  </div>
                </div>
                {/* Akhir Nomor */}
                {/* Awal Salin */}
                <div
                  onClick={handleCopy}
                  className="  flex justify-end items-center gap-1 text-black border border-slate-800 p-1 rounded-md cursor-pointer hover:bg-gray-200 font-semibold"
                >
                  <MdContentCopy className="text-sm" />
                  <div className="text-xs">Copy</div>
                </div>
                {/* Akhir Salin */}
              </div>
              {/* Akhir Nomor Virtual Account */}
            </div>
            {/* Akhir Bank */}
            {/* Awal How To Pay */}
            <div className="flex flex-col gap-2 justify-center items-start">
              <div className="font-semibold">How to Pay</div>
              <div className="flex justify-start items-center gap-4 text-sm">
                <div className="bg-slate-500 w-6 h-6 rounded-full flex justify-center items-center">
                  1
                </div>
                <div className="text-slate-300">
                  Open BCA mobile banking app or internet banking.
                </div>
              </div>
              <div className="flex justify-start items-center gap-4 text-sm">
                <div className="bg-slate-500 w-6 h-6 rounded-full flex justify-center items-center">
                  2
                </div>
                <div className="text-slate-300">
                  Select Transfer or Payment menu.
                </div>
              </div>
              <div className="flex justify-start items-center gap-4 text-sm">
                <div className="bg-slate-500 w-6 h-6 rounded-full flex justify-center items-center">
                  3
                </div>
                <div className="text-slate-300">
                  Enter Virtual Account number: 8001234567890123
                </div>
              </div>
              <div className="flex justify-start items-center gap-4 text-sm">
                <div className="bg-slate-500 w-6 h-6 rounded-full flex justify-center items-center">
                  4
                </div>
                <div className="text-slate-300">
                  Enter payment amount: Rp 2,850,000
                </div>
              </div>
              <div className="flex justify-start items-center gap-4 text-sm">
                <div className="bg-slate-500 w-6 h-6 rounded-full flex justify-center items-center">
                  5
                </div>
                <div className="text-slate-300">
                  Confirm and complete the payment.
                </div>
              </div>
            </div>
            {/* Akhir How To Pay */}
          </div>
          {/* Akhir Payment instructions */}

          {/* Awal Flight Detail */}
          <div className="bg-red-700">Flight Detail</div>
          {/* Akhir Flight Detail */}
          {/* Awal Passengers Detail */}
          <div className="bg-pink-800">Passengers Detail</div>
          {/* Akhir Passenger Detail */}
        </div>
        {/* Akhir Kiri */}

        {/* Awal Kanan */}
        <div className="bg-purple-950 w-1/3 flex flex-col gap-4">
          {/* Awal Booking Information */}
          <div>Bookign Information</div>
          {/* Akhir Booking Information */}
          {/* Awal 2 Buttons */}
          <div>2 Buttons</div>
          {/* Akhir 2 Buttons */}
          {/* Awal Need Help? */}
          <div>Need Help?</div>
          {/* Akhir Need Help? */}
          {/* Awal Important Information */}
          <div>Important Information</div>
          {/* Akhir Important Information */}
        </div>
        {/* Akhir Kanan */}
      </div>
      {/* Akhir Sisi Kiri dan Kanan */}
    </div>
  );
}
