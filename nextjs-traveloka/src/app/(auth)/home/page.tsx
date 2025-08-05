"use client";

import { generateMetaData } from "@/db/utils/metadata";

export default function Homepage() {
  // Generate metadata

  generateMetaData({
    title: "Home - Traveloka",
    description:
      "Traveloka, a Southeast Asian online travel company, utilizes various types of metadata to enhance user experience and manage its platform. This includes descriptive metadata like titles, creators, keywords, and descriptions, as well as data about user interactions such as geographic location, IP address, browser type, and pages visited. Traveloka uses this information to personalize offers, suggest relevant activities, and maintain platform security.",
    canonical: "https://traveloka.com/home",
    icons: {
      icon: "/traveloka_logo.png",
    },
    ogTitle: "Home - Traveloka",
    ogDescription:
      "Traveloka, a Southeast Asian online travel company, utilizes various types of metadata to enhance user experience and manage its platform. This includes descriptive metadata like titles, creators, keywords, and descriptions, as well as data about user interactions such as geographic location, IP address, browser type, and pages visited. Traveloka uses this information to personalize offers, suggest relevant activities, and maintain platform security. ",
    ogUrl: "https://traveloka.com/home",
    ogImage: "/traveloka_logo.png",
  });

  return (
    <div className="pt-36 h-[800px] bg-[url('/bg_home.jpg')] bg-cover bg-center text-white">
      <h1>Your homepage</h1>
    </div>
  );
}

// interface MetaOptions {
//   title?: string;
//   description?: string;
//   canonical?: string;
//   icons: {
//     icon?: string;
//   };
//   ogTitle?: string;
//   ogDescription?: string;
//   ogUrl?: string;
//   ogImage?: string;
// }
