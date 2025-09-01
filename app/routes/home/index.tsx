import type { Route } from "./+types/index";
import React from "react";
import Use from "../Howtouse/index";
import Contact from "../Contact/index";
import Feedback from "../FeedBack/index";
import Footer from "~/component/Footer";
import Chatbot from "../Chatbot/index";
import { NavLink } from "react-router";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import SplashScreen from "~/component/SplashScreen";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "FactCheck-Buddy | Welcome" },
    { name: "description", content: "FactCheck-Buddy helps you detect fake news, misinformation, and deepfake images using AI-powered tools." },
  ];
}

export default function Home() {
  return (
    <>
      <SplashScreen/>
      {/* Hero Section */}
      <div className="relative min-h-[100vh] bg-gradient-to-r from-blue-100 via-white to-blue-200 overflow-hidden">
        {/* Decorative background circles */}
        <div className="absolute top-10 left-10 w-40 h-40 bg-blue-300 rounded-full opacity-20 blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-52 h-52 bg-green-300 rounded-full opacity-20 blur-3xl animate-pulse"></div>

        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6 md:px-12 pt-20 md:pt-32 relative z-10">
          
          {/* Left Side */}
          <motion.div 
            className="flex flex-col justify-center w-full md:w-1/2 space-y-6"
            initial={{ opacity: 0, x: -50 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-extrabold text-blue-800 leading-snug">
              FactCheck-Buddy  
              <span className="block text-green-600">Your AI-Powered News Guardian</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              🌐 Stay informed with confidence. FactCheck-Buddy helps you spot <span className="font-semibold text-blue-700">fake news</span>, <span className="font-semibold text-green-700">deepfake images</span>, and <span className="font-semibold text-purple-700">misinformation</span>.  
            </p>

            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              🚀 Join thousands who trust FactCheck-Buddy to improve media literacy and protect their digital space.
            </p>

            <div className="flex flex-wrap gap-4 mt-6">
              <NavLink
                to="/exam"
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all"
              >
                Start FactCheck Exam
              </NavLink>
              <NavLink
                to="/howtouse"
                className="px-6 py-3 border-2 border-blue-600 text-blue-600 font-bold rounded-xl hover:bg-blue-600 hover:text-white transition-all"
              >
                Learn How to Use
              </NavLink>
            </div>
          </motion.div>

          {/* Right Side (Logo with animation) */}
          <motion.div 
            className="w-full md:w-1/2 flex justify-center items-center p-6"
            initial={{ opacity: 0, scale: 0.8 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 1 }}
          >
            <img
              src="/logo.png"
              alt="FactCheck-Buddy Logo"
              className="w-full max-w-md h-auto rounded-3xl shadow-2xl border-4 border-blue-300 hover:scale-105 transition-transform"
            />
          </motion.div>
        </div>
      </div>

      {/* Extra Sections */}
      <Use />
      <Chatbot />
      <Feedback />
      <Contact />
      <Footer />
    </>
  );
}
