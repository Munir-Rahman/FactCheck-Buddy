import React, { useState } from "react";

export default function FeedbackForm() {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");

  const color = "gold";
  const feedbackLabels = ["Terrible", "Poor", "Fair", "Good", "Excellent"];

  const OpenModal = () => setOpen(true);
  const CloseModal = () => setOpen(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0 || feedbackText.trim() === "") {
      alert("Please provide a rating and feedback!");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/send-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rating,
          feedbackText,
          email: "munirrahman1717@gmail.com", // or dynamically get from user
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        setRating(0);
        setFeedbackText("");
        alert("Feedback sent successfully!");
        CloseModal();
      } else {
        alert("Failed to send feedback: " + data.error);
      }
    } catch (err) {
      console.error("Error sending feedback:", err);
      alert("Failed to send feedback. Please try again later.");
    }
  };

  return (
    <div className="z-50">
      {/* Feedback Button */}
      <div
        className="fixed right-0 top-[40%] flex flex-col justify-center items-center border-2 h-60 w-12 bg-blue-600 cursor-pointer hover:bg-white hover:text-blue-800 transition-all duration-300 rounded-l-lg"
        onClick={OpenModal}
      >
        <h2 className="rotate-90 font-bold text-[1.2rem]">Feedback</h2>
      </div>

      {/* Feedback Modal */}
      {open && (
        <div className="fixed inset-0 flex justify-center items-center bg-[rgba(0,0,0,0.85)] z-50 p-4">
          <form
            onSubmit={handleSubmit}
            className="bg-gradient-to-br from-blue-500 to-blue-700 p-6 rounded-3xl w-full max-w-md shadow-2xl shadow-black flex flex-col"
          >
            <span
              className="text-red-600 text-3xl font-bold cursor-pointer self-end"
              onClick={CloseModal}
            >
              ⨉
            </span>

            <h2 className="text-3xl font-bold text-white text-center my-4">
              Rate Our Service
            </h2>

            {/* Star Rating */}
            <div className="flex justify-center gap-3 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className="text-4xl cursor-pointer transition-transform duration-200 hover:scale-125"
                  style={{ color: star <= (hover || rating) ? color : "#ccc" }}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                >
                  ★
                </span>
              ))}
            </div>

            {rating > 0 && (
              <h3 className="text-center font-semibold text-lg text-white mb-4">
                {feedbackLabels[rating - 1]}
              </h3>
            )}

            {/* Feedback Text */}
            <div className="flex flex-col mb-4">
              <label htmlFor="Feedback" className="font-semibold text-white mb-1">
                Feedback
              </label>
              <textarea
                id="Feedback"
                name="Feedback"
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                className="rounded-lg p-3 text-black outline-none resize-none min-h-[100px] max-h-60"
                placeholder="Enter your feedback here..."
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-white text-blue-700 font-bold py-2 px-6 rounded-2xl hover:bg-blue-600 hover:text-white transition-all duration-300"
            >
              Send Feedback
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
