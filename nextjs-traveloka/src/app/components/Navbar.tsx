"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PiUserCircleLight } from "react-icons/pi";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  function toggleDropdown() {
    setIsDropdownOpen(!isDropdownOpen);
  }

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 50);
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function whenScrolled() {
    return isScrolled
      ? "bg-white shadow-lg text-[#0194F3]"
      : "bg-transparent text-white";
  }

  return (
    <div
      className={`fixed top-0 left-0 w-full ${whenScrolled()} h-28 py-4 px-20  z-50 shadow-lg flex flex-col justify-between transition-all duration-1000`}
    >
      <div className="h-1/2 flex justify-between items-center text-sm">
        <div>Logo Traveloka</div>
        <div className="flex gap-4 items-center ">
          <div>IDR | ID</div>
          <Link
            className="p-2 rounded-md hover:bg-black/40"
            href={"/promotion"}
          >
            Deals
          </Link>
          <div>Support</div>
          <Link
            className="p-2 rounded-md hover:bg-black/40"
            href={"/partnetship"}
          >
            Partnership
          </Link>
          <Link className="p-2 rounded-md hover:bg-black/40" href={"/bookings"}>
            Bookings
          </Link>

          <div
            onClick={toggleDropdown}
            className="flex gap-1 items-center cursor-pointer hover:bg-black/40 p-2 rounded-md "
          >
            <PiUserCircleLight className="text-2xl" />
            <div>Nama</div>
            {isDropdownOpen ? (
              <IoIosArrowUp className="text-lg" />
            ) : (
              <IoIosArrowDown className="text-lg" />
            )}

            {isDropdownOpen && (
              <div className="absolute top-16 right-20 w-64 bg-blue-950 py-4 rounded-md shadow-lg  text-white">
                <ul className="flex flex-col text-xs font-semibold">
                  <li className="font-bold text-xl px-4 mb-2">Nama Gweh</li>
                  <li className=" px-4 py-3 hover:bg-black/40">Edit Profile</li>
                  <li className=" px-4 py-3 hover:bg-black/40 ">My Cards</li>
                  <li className=" px-4 py-3 hover:bg-black/40 ">
                    Purchase List
                  </li>
                  <li className=" px-4 py-3 hover:bg-black/40 ">My Booking</li>
                  <li className=" px-4 py-3 hover:bg-black/40 ">Refunds</li>
                  <li className=" px-4 py-3 hover:bg-black/40 ">
                    Flight Price Alerts
                  </li>
                  <li className=" px-4 py-3 hover:bg-black/40 ">
                    Saved Passenger Details
                  </li>
                  <li className=" px-4 py-3 hover:bg-black/40 ">Promo Info</li>
                  <li className=" px-4 py-3 hover:bg-black/40 ">Log Out</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className=" h-1/2 flex justify-between items-center">Menu-menu</div>
    </div>
  );
}
