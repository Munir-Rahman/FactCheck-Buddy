import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SplashScreen() {
  const [show, setShow] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");

    if (!hasVisited) {
      setShow(true);
      localStorage.setItem("hasVisited", "true");

      // After 2 seconds, start fade-out
      const fadeTimer = setTimeout(() => setFadeOut(true), 2000);

      // After 2.5 seconds, navigate to Home
      const navigateTimer = setTimeout(() => {
        setShow(false);
        navigate("/");
      }, 1800);

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(navigateTimer);
      };
    } else {
      navigate("/"); // If already visited, go straight to home
    }
  }, [navigate]);

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 flex flex-col justify-center items-center z-50 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 transition-opacity duration-500 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <img
        src="/logo.png"
        alt="FactCheck-Buddy Logo"
        className="w-32 h-32 mb-4 animate-bounce"
      />
      <h1 className="text-3xl md:text-5xl font-extrabold text-green-400 text-center animate-pulse">
        Thanks for choosing FactCheck-Buddy!
      </h1>
    </div>
  );
}
