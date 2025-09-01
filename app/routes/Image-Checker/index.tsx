import { useState } from "react";
import { NavLink } from "react-router";
import { FaRegArrowAltCircleLeft, FaUpload } from "react-icons/fa";

export default function CheckImage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setMessage("");
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const checkImage = async () => {
    if (!file) {
      alert("Please upload an image first!");
      return;
    }

    setLoading(true);
    setMessage("");

    // Simulate AI processing
    setTimeout(() => {
      setLoading(false);
      setMessage(
        "⚡ Feature Coming Soon! The AI check will be available once hosted."
      );
    }, 1200);
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-500 to-indigo-700 py-10 px-4">
      {/* Back Button */}
      <div className="w-full max-w-3xl flex justify-start mb-4">
        <NavLink
          to="/claim"
          className="flex items-center gap-2 px-3 py-2 bg-white/20 hover:bg-white hover:text-blue-700 rounded-xl font-semibold transition"
        >
          <FaRegArrowAltCircleLeft /> Back
        </NavLink>
      </div>

      {/* Title */}
      <div className="text-center mb-6">
        <h1 className="text-4xl font-extrabold text-white mb-2">
          Check AI-generated Images
        </h1>
        <p className="text-white/80 text-lg">
          Upload an image to verify if it’s AI-generated or real.
        </p>
      </div>

      {/* Upload Card */}
      <div className="w-full max-w-md bg-white/20 backdrop-blur-md rounded-3xl p-6 flex flex-col items-center shadow-lg border border-white/30 transition hover:scale-105 hover:shadow-2xl">
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-full h-64 object-cover rounded-2xl mb-4 border-2 border-white/40 shadow-md"
          />
        )}

        <label className="flex flex-col items-center justify-center cursor-pointer bg-white/30 hover:bg-white/50 text-white font-semibold px-6 py-3 rounded-2xl transition mb-4 w-full text-center">
          <FaUpload className="text-2xl mb-1" />
          {file ? "Change Image" : "Upload Image"}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>

        <button
          onClick={checkImage}
          disabled={loading}
          className="w-full bg-white text-blue-700 font-bold py-3 rounded-2xl shadow-md hover:bg-blue-600 hover:text-white transition text-lg"
        >
          {loading ? "Checking..." : "Check Image"}
        </button>
      </div>

      {/* Result */}
      {message && (
        <div className="mt-6 w-full max-w-md bg-white/20 backdrop-blur-md p-4 rounded-2xl shadow-lg text-white font-semibold text-center animate-pulse">
          {message}
        </div>
      )}
    </div>
  );
}
