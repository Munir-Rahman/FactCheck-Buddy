import React, { useState, useRef } from "react";
import { FaMicrophone, FaStop } from "react-icons/fa";

declare global {
  interface Window {
    puter: any;
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

export default function ClaimText() {
  const [claim, setClaim] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [listening, setListening] = useState(false);

  const recognitionRef = useRef<any>(null);

  const initSpeechRecognition = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setError("⚠️ Your browser does not support voice input.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setListening(true);
      setError(null);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setClaim(transcript);
    };

    recognition.onerror = (event: any) => {
      setError("⚠️ Voice input error: " + event.error);
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognitionRef.current = recognition;
  };

  const handleVoiceInput = () => {
    if (!recognitionRef.current) initSpeechRecognition();

    if (recognitionRef.current) {
      if (listening) recognitionRef.current.stop();
      else recognitionRef.current.start();
    }
  };

  const handleCheck = async () => {
    if (!claim.trim()) return;

    setLoading(true);
    setAnswer(null);
    setError(null);

    try {
      if (!window.puter) {
        setError("⚠️ Puter.js not loaded.");
        return;
      }

      const puterResponse = await window.puter.ai.chat(
        `Check this news claim: "${claim}". Is it true, false, or unverified?`
      );

      console.log("RAW Puter response:", puterResponse);

      let verdict: string | null = null;

      if (puterResponse?.result?.message?.content) verdict = puterResponse.result.message.content;
      else if (puterResponse?.value?.result?.message?.content) verdict = puterResponse.value.result.message.content;
      else if (puterResponse?.message?.content) verdict = puterResponse.message.content;
      else if (typeof puterResponse === "string") verdict = puterResponse;
      else verdict = JSON.stringify(puterResponse, null, 2);

      setAnswer(verdict);
    } catch (err: any) {
      console.error(err);
      setError("⚠️ AI service unavailable.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex justify-center items-start min-h-screen bg-gradient-to-r from-blue-50 to-green-50 px-4 py-10">
      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center z-50">
          <div className="loader border-8 border-t-8 border-blue-500 rounded-full w-24 h-24 animate-spin"></div>
          <p className="text-white text-xl font-bold mt-4">Checking Claim...</p>
        </div>
      )}

      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-8 z-10">
        <h2 className="text-3xl font-extrabold text-green-700 mb-6 text-center">
          📰 FactCheck Buddy
        </h2>

        {/* Claim Input */}
        <textarea
          value={claim}
          onChange={(e) => setClaim(e.target.value)}
          placeholder='Type or speak a claim, e.g., "Donald Trump has died."'
          rows={3}
          className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none mb-4"
        />

        {/* Voice Input */}
        <button
          onClick={handleVoiceInput}
          className={`w-full py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2 mb-4 ${
            listening ? "bg-red-500 text-white animate-pulse" : "bg-purple-600 text-white hover:bg-purple-700"
          }`}
        >
          {listening ? <FaStop size={20} /> : <FaMicrophone size={20} />}
          {listening ? "Stop Listening" : "Speak Claim"}
        </button>

        {/* Check Button */}
        <button
          onClick={handleCheck}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
        >
          Check Claim
        </button>

        {/* Answer Section */}
        {answer && (
          <div className="mt-6 p-5 rounded-xl border bg-green-50 shadow-sm">
            <p className="text-lg font-bold text-green-800">Answer:</p>
            <p className="text-gray-900 mt-2 leading-relaxed">{answer}</p>
          </div>
        )}

        {/* Error Section */}
        {error && (
          <div className="mt-6 p-4 rounded-xl border bg-red-50 text-red-600">
            {error}
          </div>
        )}

        {/* Back Button */}
        <div className="mt-6">
          <button
            onClick={() => (window.location.href = "/claim")}
            className="w-full bg-gray-200 text-gray-800 py-2 rounded-xl font-semibold hover:bg-gray-300 transition"
          >
            ⬅ Back
          </button>
        </div>
      </div>

      {/* Loader Styles */}
      <style>
        {`
          .loader {
            border-top-color: #10B981;
            border-right-color: #3B82F6;
          }
        `}
      </style>
    </div>
  );
}
