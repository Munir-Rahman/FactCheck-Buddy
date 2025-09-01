import { NavLink } from "react-router-dom";

export default function Exam() {
  return (
    <div className="w-full min-h-screen flex flex-col gap-10 py-16 px-6 items-center bg-[#F9FAF8]">
      
      {/* Header */}
      <h2 className="font-bold text-4xl text-[#1f2937] px-8 py-4 rounded-2xl border-4 border-green-600 shadow-lg hover:bg-green-50 transition">
        🧠 Take Exam & Boost Your MIL Skills
      </h2>

      {/* Exam Cards Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
        
        {/* News Exam Card */}
        <NavLink to="/news-exam" className="group">
          <div className="flex flex-col items-center border-2 border-green-600 rounded-2xl p-6 shadow-md bg-white hover:shadow-2xl hover:scale-105 transition cursor-pointer">
            <img
              src="./fakenews.jpg"
              alt="Fake News Exam"
              className="h-40 w-40 object-cover rounded-full border-4 border-green-500 group-hover:rotate-6 transition"
            />
            <h2 className="mt-6 text-2xl font-bold text-[#1f2937] group-hover:text-green-700">
              Deep Fake News Exam
            </h2>
            <p className="mt-2 text-gray-600 text-center">
              Test your ability to detect misinformation in online articles & posts.
            </p>
          </div>
        </NavLink>

        {/* Image Exam Card */}
        <NavLink to="/image-exam" className="group">
          <div className="flex flex-col items-center border-2 border-yellow-500 rounded-2xl p-6 shadow-md bg-white hover:shadow-2xl hover:scale-105 transition cursor-pointer">
            <img
              src="./fakeimage.webp"
              alt="Fake Image Exam"
              className="h-40 w-40 object-cover rounded-full border-4 border-yellow-400 group-hover:-rotate-6 transition"
            />
            <h2 className="mt-6 text-2xl font-bold text-[#1f2937] group-hover:text-yellow-600">
              Deep Fake Image Exam
            </h2>
            <p className="mt-2 text-gray-600 text-center">
              Challenge your skills in spotting AI-generated & manipulated images.
            </p>
          </div>
        </NavLink>

      </div>
    </div>
  );
}
