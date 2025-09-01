import React from "react";
import { NavLink } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

export default function ClaimPage() {
  const claimMethods = [
    {
      title: "Check Real News by Text or Link",
      description:
        "Paste a news article link or text snippet to verify its authenticity instantly with FactCheck Buddy AI.",
      img: "./text.webp",
      link: "/Textclaim",
      border: "border-blue-600",
      hoverText: "group-hover:text-blue-600",
    },
    {
      title: "Check Real Images by Uploading",
      description:
        "Upload an image to detect AI-generated or manipulated content and ensure its credibility.",
      img: "./uploadimage.png",
      link: "/image-checker",
      border: "border-green-600",
      hoverText: "group-hover:text-green-600",
    },
  ];

  return (
    <div className="w-full min-h-screen flex flex-col gap-10 py-10 px-4 items-center text-center bg-gray-100">
      
      {/* Page Header */}
      <h2 className="font-bold text-3xl md:text-4xl border-2 border-blue-600 px-6 md:px-20 py-4 rounded-2xl hover:bg-blue-600 hover:text-white transition flex items-center gap-3">
        <FaCheckCircle className="text-green-400" />
        Check Real & Verified News
      </h2>

      {/* Claim Methods Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
        {claimMethods.map((method, index) => (
          <NavLink key={index} to={method.link} className="group">
            <div
              className={`flex flex-col items-center border-2 ${method.border} rounded-2xl p-6 shadow-md bg-white hover:shadow-2xl hover:scale-105 transition cursor-pointer`}
            >
              <img
                src={method.img}
                alt={method.title}
                className={`h-40 w-40 md:h-36 md:w-36 object-cover rounded-2xl border-4 ${method.border.split(" ")[1]} group-hover:rotate-6 transition`}
              />
              <h3 className={`mt-6 text-2xl font-bold text-gray-800 ${method.hoverText} transition`}>
                {method.title}
              </h3>
              <p className="mt-2 text-gray-600 text-center">{method.description}</p>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
}
