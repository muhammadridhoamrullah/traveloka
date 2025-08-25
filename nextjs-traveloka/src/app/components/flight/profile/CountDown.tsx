"use client";

import { getCountDown } from "@/db/utils/helperFunctions";
import React, { useEffect, useState } from "react";

interface Props {
  expiryTime: string | undefined;
}

export const CountdownDisplay = React.memo(({ expiryTime }: Props) => {
  const [countDown, setCountDown] = useState({
    hour: "00",
    minute: "00",
    second: "00",
  });

  useEffect(() => {
    if (!expiryTime) return;

    const timer = setInterval(() => {
      const result = getCountDown(expiryTime);
      setCountDown(result);
    }, 1000);

    return () => clearInterval(timer);
  }, [expiryTime]);

  return (
    <div className="flex justify-start items-center gap-3">
      <div className="flex flex-col justify-center items-center rounded-lg border border-gray-500 p-2">
        <div className="text-3xl font-bold">{countDown.hour}</div>
        <div className="text-sm">Hour</div>
      </div>
      <div>:</div>
      <div className="flex flex-col justify-center items-center rounded-lg border border-gray-500 p-2">
        <div className="text-3xl font-bold">{countDown.minute}</div>
        <div className="text-sm">Minutes</div>
      </div>
      <div>:</div>
      <div className="flex flex-col justify-center items-center rounded-lg border border-gray-500 p-2">
        <div className="text-3xl font-bold">{countDown.second}</div>
        <div className="text-sm">Seconds</div>
      </div>
    </div>
  );
});
