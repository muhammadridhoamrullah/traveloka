"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PiUserCircleLight } from "react-icons/pi";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { CiCreditCard1 } from "react-icons/ci";
import { RiFileList3Line } from "react-icons/ri";
import { GoChecklist } from "react-icons/go";
import { RiRefund2Line } from "react-icons/ri";
import { FaRegBell } from "react-icons/fa";
import { MdPeopleOutline } from "react-icons/md";
import { IoMailOutline } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import Image from "next/image";

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
      ? "bg-white shadow-lg text-black"
      : "bg-transparent text-white";
  }

  function styleListDropdown() {
    return "px-4 py-3 hover:bg-black/40 flex items-center gap-4";
  }

  function styleListMenuNavbarBawah() {
    return "p-2 rounded-md hover:bg-black/80";
  }

  return (
    <div
      className={`fixed top-0 left-0 w-full ${whenScrolled()} h-28 gap-2 py-4 px-20  z-50 shadow-lg flex flex-col justify-between transition-all duration-1000`}
    >
      {/* Awal Navbar Atas */}
      <div className="h-1/2 flex justify-between items-center text-sm ">
        {isScrolled ? (
          <Image
            src={"/traveloka_hitam.png"}
            width={150}
            height={150}
            alt="Traveloka Logo"
          />
        ) : (
          <Image
            src={"/traveloka_putih.png"}
            width={150}
            height={200}
            alt="Traveloka Logo"
          />
        )}
        <div className="flex gap-4 items-center ">
          <Link className="p-2 rounded-md hover:bg-black/40" href={"/idr-id"}>
            IDR | ID
          </Link>
          <Link
            className="p-2 rounded-md hover:bg-black/40"
            href={"/promotion"}
          >
            Deals
          </Link>
          <Link className="p-2 rounded-md hover:bg-black/40" href={"/support"}>
            Support
          </Link>
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
                  <Link href={"/profile"} className={styleListDropdown()}>
                    <FaRegUser className="text-lg" />
                    <div>Edit Profile</div>
                  </Link>
                  <Link href={"/my-cards"} className={styleListDropdown()}>
                    <CiCreditCard1 className="text-lg" />
                    <div>My Cards</div>{" "}
                  </Link>
                  <Link href={"/purchase-list"} className={styleListDropdown()}>
                    <RiFileList3Line className="text-lg" />
                    <div>Purchase List</div>
                  </Link>
                  <Link href={"/my-booking"} className={styleListDropdown()}>
                    <GoChecklist className="text-lg" />
                    <div>My Booking</div>
                  </Link>
                  <Link href={"refunds"} className={styleListDropdown()}>
                    <RiRefund2Line className="text-lg" />
                    <div>Refunds</div>
                  </Link>
                  <Link
                    href={"flight-price-alerts"}
                    className={styleListDropdown()}
                  >
                    <FaRegBell className="text-lg" />
                    <div>Flight Price Alerts</div>
                  </Link>
                  <Link
                    href={"saved-passenger-details"}
                    className={styleListDropdown()}
                  >
                    <MdPeopleOutline className="text-lg" />
                    <div>Saved Passenger Details</div>
                  </Link>
                  <Link href={"promo-info"} className={styleListDropdown()}>
                    <IoMailOutline className="text-lg" />
                    <div>Promo Info</div>
                  </Link>
                  <Link href={"logout"} className={styleListDropdown()}>
                    <BiLogOut className="text-lg" />
                    <div>Log Out</div>
                  </Link>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Akhir Navbar Atas */}

      {/* Awal Navbar Bawah */}
      <div className=" h-1/2 flex justify-between items-end text-sm ">
        <div
          className={`flex justify-start items-center gap-5 font-semibold ${
            isScrolled ? "text-slate-400" : "text-white"
          } `}
        >
          <Link className={styleListMenuNavbarBawah()} href={"/hotels"}>
            Hotels
          </Link>
          <Link className={styleListMenuNavbarBawah()} href={"/flights"}>
            Flights
          </Link>
          <Link
            className={styleListMenuNavbarBawah()}
            href={"/airport-transfer"}
          >
            Airport Transfer
          </Link>
          <Link className={styleListMenuNavbarBawah()} href={"/car-rental"}>
            Car Rental
          </Link>
          <Link className={styleListMenuNavbarBawah()} href={"/thing-to-do"}>
            Things To Do
          </Link>
          <Link className={styleListMenuNavbarBawah()} href={"/travel-guides"}>
            Travel Guides
          </Link>
        </div>
      </div>
      {/* Akhir Navbar Bawah */}
    </div>
  );
}
