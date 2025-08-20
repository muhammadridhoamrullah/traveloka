"use client";

import { FaRegCreditCard } from "react-icons/fa6";
import { CiBank } from "react-icons/ci";
import { MdContentCopy, MdMailOutline } from "react-icons/md";
import { LuPlane } from "react-icons/lu";
import { GoPeople } from "react-icons/go";
import { TiDocumentText } from "react-icons/ti";
import { MdPhoneIphone } from "react-icons/md";
import { MdOutlinePayment } from "react-icons/md";
import { RiCustomerService2Line } from "react-icons/ri";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { TiWarningOutline } from "react-icons/ti";

import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import { FaRegCalendarPlus, FaRegClock } from "react-icons/fa";

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
      <div className="bg-red-700 w-3/4 flex flex-col gap-3 justify-center items-start p-4 rounded-xl h-fit">
        {/* Awal Judul Remaining Payment Time */}
        <div className="w-full h-fit flex items-center justify-start gap-2">
          <TiWarningOutline className="text-2xl" />
          <div className="text-xl font-semibold">Remaining Payment Time</div>
        </div>
        {/* Akhir Judul Remaining Payment Time */}
        {/* Awal Sisa Waktu */}
        <div className="w-full h-fit flex flex-col gap-2 justify-center items-start">
          {/* Awal Timer Sisa Waktu */}
          <div className="flex justify-start items-center gap-3">
            {/* Awal Hour */}
            <div className="flex flex-col  justify-center items-center rounded-lg border border-gray-500 p-2">
              <div className="text-3xl font-bold">01</div>
              <div className="text-sm">Hour</div>
            </div>
            {/* Akhir Hour */}
            <div>:</div>
            {/* Awal Minutes */}
            <div className="flex flex-col justify-center items-center rounded-lg border border-gray-500 p-2">
              <div className="text-3xl font-bold">10</div>
              <div className="text-sm">Minutes</div>
            </div>
            {/* Akhir Minutes */}
            <div>:</div>
            {/* Awal Seconds */}
            <div className="flex flex-col justify-center items-center rounded-lg border border-gray-500 p-2">
              <div className="text-3xl font-bold">56</div>
              <div className="text-sm">Seconds</div>
            </div>
            {/* Akhir Seconds */}
          </div>
          {/* Akhir Timer Sisa Waktu */}
          {/* Awal Your Booking */}
          <div className="text-sm">
            Your booking will be automatically canceled if the payment is not
            completed before the deadline.
          </div>
          {/* Akhir Your Booking */}
        </div>
        {/* Akhir Sisa Waktu */}
      </div>
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
          <div className="bg-black/70 w-full h-fit p-4 rounded-xl flex flex-col gap-2 items-start justify-center">
            {/* Awal Flight Detail */}
            <div className="flex items-center gap-2 mb-5">
              <LuPlane className="text-2xl" />
              <div className="text-xl font-semibold">Flight Detail</div>
            </div>
            {/* Akhir Flight Detail */}
            {/* Awal Airline and Cabin */}
            <div className="flex justify-between items-center w-full">
              <div className="flex flex-col  justify-center items-start">
                <div className="font-semibold text-xl">Garuda Indonesia</div>
                <div className="text-sm text-slate-400">
                  GA 512 - Boeing 737-900 ER
                </div>
              </div>
              <div className="py-1 px-2 border border-white rounded-md text-sm">
                Economy
              </div>
            </div>
            {/* Akhir Airline and Cabin */}
            {/* Awal Line */}
            <div className="border-[0.5px] border-slate-800 w-full"></div>
            {/* Akhir Line */}
            {/* Awal Info Keberangkatan dan Kedatangan */}
            <div className=" w-full flex justify-between items-start gap-2">
              <div className=" w-full flex flex-col gap-2 justify-center items-start">
                <div className="text-sm text-slate-400">Departure</div>
                <div className="font-semibold text-xl">Jam</div>
                <div className="text-sm text-slate-400">
                  Tanggal, Bulan, Tahun
                </div>
                <div className="text-xs text-slate-400">
                  Soekarno-Hatta International Airport
                </div>
              </div>
              <div className=" w-full flex flex-col gap-2 justify-center items-start">
                <div className="text-sm text-slate-400">Arrival</div>
                <div className="font-semibold text-xl">Jam</div>
                <div className="text-sm text-slate-400">
                  Tanggal, Bulan, Tahun
                </div>
                <div className="text-xs text-slate-400">
                  Ngurah Rai International Airport
                </div>
              </div>
            </div>
            {/* Akhir Info Keberangkatan dan Kedatangan */}
            {/* Awal Durasi */}
            <div className="flex justify-center items-center gap-2 w-full p-1 mt-3">
              <FaRegClock className="text-xl " />
              <div className=" text-sm">Durasi</div>
            </div>
            {/* Akhir Durasi */}
          </div>
          {/* Akhir Flight Detail */}
          {/* Awal Passengers Detail */}
          <div className="bg-pink-800">Passengers Detail</div>
          {/* Akhir Passenger Detail */}
        </div>
        {/* Akhir Kiri */}

        {/* Awal Kanan */}
        <div className="bg-purple-950 w-1/3 flex flex-col gap-4">
          {/* Awal Booking Information */}
          <div className="bg-black/70 w-full h-fit p-4 rounded-xl flex flex-col gap-2 items-start justify-center">
            <div className="flex items-center gap-2 mb-5">
              <TiDocumentText className="text-2xl" />
              <div className="text-xl font-semibold">Booking Information</div>
            </div>
            <div className="flex w-full flex-col gap-2 items-start justify-center text-sm">
              <div className="flex flex-col justify-center items-start gap-1">
                <div className="text-slate-400">Booking ID</div>
                <div className="text-lg">TVLKFLT20250810293293</div>
              </div>
              <div className="flex flex-col justify-center items-start gap-1">
                <div className="text-slate-400">Transaction ID</div>
                <div className="text-lg">TVLKFLT20250810293293</div>
              </div>
              <div className="border-[0.5px] border-slate-800 w-full"></div>
              <div className="flex flex-col justify-center items-start gap-1">
                <div className="text-slate-400">Payment Method</div>
                <div className="text-lg">QRIS</div>
              </div>
              <div className="flex flex-col justify-center items-start gap-1">
                <div className="text-slate-400">Total Payment</div>
                <div className="text-green-400 text-lg">Rp. 25.000.000</div>
              </div>
            </div>
          </div>
          {/* Akhir Booking Information */}
          {/* Awal 3 Button */}
          <div className="flex flex-col gap-2 w-full justify-center items-start">
            <div className="bg-black w-full p-3 flex justify-center items-center gap-2 rounded-xl hover:bg-green-800 cursor-pointer">
              <MdPhoneIphone className="text-xl" />
              <div className="text-sm">Check Payment Status</div>
            </div>
            <div className="border border-slate-600 w-full flex justify-center items-center p-3 gap-2 rounded-xl hover:bg-green-800 hover:border-transparent cursor-pointer">
              <MdMailOutline className="text-xl" />
              <div className="text-sm">Change Payment Method</div>
            </div>
          </div>
          {/* Akhir 3 Button */}
          {/* Awal Support */}
          <div className="bg-black/50 w-full p-4 rounded-xl flex flex-col gap-5 justify-center items-start">
            <div className="flex items-center gap-2">
              <RiCustomerService2Line className="text-2xl" />
              <div className="text-xl font-semibold">Need Help?</div>
            </div>
            <div className="flex flex-col gap-3 justify-center items-start text-xs">
              <div>
                Our customer service team is available 24/7 to assist you.
              </div>
              <div className="bg-blue-800 p-2 rounded-md w-full flex justify-center items-center hover:bg-blue-700 cursor-pointer">
                Contact Customer Service
              </div>
            </div>
          </div>
          {/* Akhir Support */}
          {/* Awal Important Information */}
          <div className="w-full p-4 rounded-xl bg-black/50 flex flex-col gap-5 justify-center items-start text-blue-600 border border-blue-600">
            <div className="flex items-center gap-2 bg">
              <AiOutlineInfoCircle className="text-2xl" />
              <div className="text-xl font-semibold">Important Notes</div>
            </div>
            <div className="flex flex-col gap-3 justify-center items-start text-xs ">
              <div>• Payment will be verified automatically</div>
              <div>• E-ticket will be sent after the payment is successful</div>
              <div>
                • Booking will be canceled if the payment deadline is exceeded
              </div>
              <div>• Keep your booking ID for reference</div>
            </div>
          </div>
          {/* Akhir Important Information */}
        </div>
        {/* Akhir Kanan */}
      </div>
      {/* Akhir Sisi Kiri dan Kanan */}
    </div>
  );
}
