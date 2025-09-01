import React from "react";
import { motion } from "framer-motion";

export default function Use() {
  const steps = [
    {
      title: "Visit the FactCheck-Buddy Website",
      description: "Open your browser and navigate to our official website:",
      link: "http://FactCheck-Buddy.vercel.app",
    },
    {
      title: "Enter News or Claim",
      description:
        "Type or paste the news headline, social media post, or claim you want to verify into the input field.",
    },
    {
      title: "Run AI Verification",
      description:
        "Click the 'Check' button to let our AI-powered engine analyze the content and provide a credibility score and detailed explanation.",
    },
    {
      title: "Review Detailed Results",
      description:
        "View the detailed report, including sources, fact-check references, and detection of possible deepfakes or misinformation.",
    },
    {
      title: "Submit Feedback",
      description:
        "Provide your feedback on the verification result to help us improve the AI system.",
    },
    {
      title: "Stay Informed",
      description:
        "Use FactCheck-Buddy regularly to stay aware of fake news trends and make informed decisions online.",
    },
  ];

  return (
    <div className="p-10 w-full bg-gradient-to-r from-blue-100 via-white to-blue-200">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold text-blue-800">
          How to Use FactCheck-Buddy
        </h2>
        <p className="text-lg md:text-xl text-gray-700 mt-3">
          Follow these simple steps to verify news and claims quickly and accurately.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-8">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="w-full sm:w-[22rem] md:w-[25rem] p-6 bg-gradient-to-r from-blue-600 to-green-500 rounded-3xl shadow-lg hover:shadow-2xl transition-all cursor-pointer flex flex-col items-start gap-4 text-white"
            whileHover={{ scale: 1.05, y: -5 }}
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <div className="text-3xl md:text-4xl">📌</div>
            <h3 className="text-xl md:text-2xl font-bold text-yellow-400">
              Step {index + 1}:
            </h3>
            <h4 className="text-lg md:text-xl font-semibold">{step.title}</h4>
            <p className="text-md md:text-lg text-gray-100">
              {step.description}{" "}
              {step.link && (
                <a
                  href={step.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FFD700] hover:text-white underline"
                >
                  {step.link}
                </a>
              )}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
