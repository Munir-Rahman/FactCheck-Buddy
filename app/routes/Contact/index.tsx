import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<{ type: "success" | "error" | ""; message: string }>({
    type: "",
    message: "",
  });
  const [showNotification, setShowNotification] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });

    try {
      const res = await fetch("http://localhost:5000/send-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        setStatus({ type: "success", message: "✅ Your message has been sent successfully!" });
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus({ type: "error", message: "❌ Failed to send message. Try again." });
      }
    } catch (err) {
      setStatus({ type: "error", message: "⚠️ Server error. Please try again later." });
    }

    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 5000); // hide after 5 seconds
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-blue-100 via-white to-blue-200 flex justify-center items-start px-4 py-20">
      
      {/* Notification */}
      <AnimatePresence>
        {showNotification && status.message && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 20, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className={`fixed top-5 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-xl text-white shadow-lg z-50 ${
              status.type === "success" ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {status.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact Form */}
      <motion.div
        className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-extrabold text-blue-700 mb-6 text-center">📩 Contact Us</h2>
        <p className="text-gray-700 mb-6 text-center">
          Have questions or feedback? Fill out the form below.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 rounded-xl font-bold hover:scale-105 hover:shadow-lg transition-transform"
          >
            Send Message
          </button>
        </form>
      </motion.div>
    </div>
  );
}
