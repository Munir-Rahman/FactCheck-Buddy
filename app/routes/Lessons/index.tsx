import React from "react";
import { NavLink } from "react-router";

export default function LessonsMenu() {
  const lessons = [
    {
      title: "Learning Fake News",
      description:
        "Understand how fake news spreads on social media and learn to identify misleading headlines, sources, and manipulated content.",
      img: "./learnfakenews.jpg",
      link: "/Facknewslessons",
      border: "border-green-600",
      hoverText: "group-hover:text-green-700",
    },
    {
      title: "DeepFake Images",
      description:
        "Explore AI-generated deepfake images, learn to spot manipulated visuals, and understand the tools used to verify their authenticity.",
      img: "./learnfakeimage.png",
      link: "/DeepFackImageslessons",
      border: "border-yellow-500",
      hoverText: "group-hover:text-yellow-600",
    },
  ];

  return (
    <div className="w-full min-h-screen flex flex-col gap-10 py-16 px-6 items-center bg-[#F9FAF8]">
      {/* Header */}
      <h2 className="font-bold text-4xl text-[#1f2937] px-8 py-4 rounded-2xl border-4 border-blue-600 shadow-lg hover:bg-blue-50 transition">
        🧾 Learn to Identify Fake News & DeepFake Content
      </h2>

      {/* Lessons Cards Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
        {lessons.map((lesson, index) => (
          <NavLink key={index} to={lesson.link} className="group">
            <div
              className={`flex flex-col items-center border-2 ${lesson.border} rounded-2xl p-6 shadow-md bg-white hover:shadow-2xl hover:scale-105 transition cursor-pointer`}
            >
              <img
                src={lesson.img}
                alt={lesson.title}
                className={`h-40 w-40 object-cover rounded-full border-4 ${lesson.border.split(" ")[1]} group-hover:rotate-6 transition`}
              />
              <h2 className={`mt-6 text-2xl font-bold text-[#1f2937] ${lesson.hoverText}`}>
                {lesson.title}
              </h2>
              <p className="mt-2 text-gray-600 text-center">{lesson.description}</p>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
}
