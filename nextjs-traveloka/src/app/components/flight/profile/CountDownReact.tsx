"use client";

import { useState } from "react";
import Countdown from "react-countdown";
import { TiWarningOutline } from "react-icons/ti";

interface Props {
  expiryTime: string;
  onExpire: () => void;
}

export default function CoundtDownReact({ expiryTime, onExpire }: Props) {
  const targetTime = new Date(expiryTime).getTime();

  function rendererCountDown({
    hours,
    minutes,
    seconds,
    completed,
  }: {
    hours: number;
    minutes: number;
    seconds: number;
    completed: boolean;
  }) {
    if (completed) {
      return (
        <div className=" text-lg bg-red-700 w-3/4 text-white p-4 rounded-xl h-fit flex justify-center items-center">
          This Payment Is Expired
        </div>
      );
    } else {
      return (
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
                <div className="text-3xl font-bold">
                  {hours.toString().padStart(2, "0")}
                </div>
                <div className="text-sm">Hour</div>
              </div>
              {/* Akhir Hour */}
              <div>:</div>
              {/* Awal Minutes */}
              <div className="flex flex-col justify-center items-center rounded-lg border border-gray-500 p-2">
                <div className="text-3xl font-bold">
                  {minutes.toString().padStart(2, "0")}
                </div>
                <div className="text-sm">Minutes</div>
              </div>
              {/* Akhir Minutes */}
              <div>:</div>
              {/* Awal Seconds */}
              <div className="flex flex-col justify-center items-center rounded-lg border border-gray-500 p-2">
                <div className="text-3xl font-bold">
                  {seconds.toString().padStart(2, "0")}
                </div>
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
      );
    }
  }
  return (
    <Countdown
      date={targetTime}
      renderer={rendererCountDown}
      precision={1000}
      autoStart={true}
      controlled={false}
      onComplete={onExpire}
    />
  );
}
