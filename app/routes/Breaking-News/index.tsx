import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";

interface News {
  title: string;
  publishedAt: string;
  description: string;
  image: string | null;
  source: string;
  url: string;
}

export default function BreakingNews() {
  const [newsData, setNewsData] = useState<News[]>([]);

  useEffect(() => {
  fetch("http://localhost:5000/news/home") // 👈 must match backend route
    .then((res) => res.json())
    .then((data) => setNewsData(data))
    .catch((err) => console.error("Error fetching news:", err));
}, []);



  return (
    <div className="bg-[#F9FAF8] p-8 min-h-screen text-gray-900">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold text-blue-600 mb-3">
          📰 Breaking Verified News
        </h2>
        <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
          Stay updated with real-time verified news from trusted sources.
          FactCheck Buddy ensures you see only accurate and credible news.
        </p>
      </div>

      {/* News Cards Grid */}
      <div className="grid gap-8 md:grid-cols-3">
        {newsData.length > 0 ? (
          newsData.map((news, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl shadow-lg overflow-hidden transform hover:scale-105 hover:shadow-2xl transition duration-500 cursor-pointer flex flex-col"
            >
              {/* Image */}
              <div className="w-full h-56 overflow-hidden rounded-t-3xl">
                <img
                  src={news.image || "./logo.png"}
                  alt={news.title}
                  className="w-full h-full object-cover hover:scale-110 transition duration-500"
                />
              </div>

              {/* Card Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl md:text-3xl font-bold text-blue-600">
                  {news.title}
                </h3>
                <span className="text-green-500 font-semibold mt-1">
                  {new Date(news.publishedAt).toLocaleString()}
                </span>
                <p className="text-gray-700 mt-4 flex-grow">{news.description}</p>

                {/* Footer */}
                <footer className="flex justify-between items-center mt-6">
                  <a
                    href={news.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-500 font-bold hover:text-blue-600 hover:underline transition"
                  >
                    Read More <FaCheckCircle className="text-green-500" />
                  </a>
                  <span className="text-green-500 font-semibold flex items-center gap-1">
                    <FaCheckCircle /> {news.source}
                  </span>
                </footer>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-3 text-gray-600">
            Loading verified news...
          </p>
        )}
      </div>
    </div>
  );
}
