import React, { useState, useRef, useEffect } from "react";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa"; // ✅ Import icons

function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([
    { sender: "bot", text: "Hello! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const messageEndRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => setOpen(!open);

  // === Send Message ===
  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Call Puter.js AI
    puter.ai
      .chat(input)
      .then((response: any) => {
        let botText = "";

        // ✅ Extract proper text from response
        if (response?.message?.content) {
          botText = response.message.content;
        } else if (response?.result?.message?.content) {
          botText = response.result.message.content;
        } else if (response?.content) {
          botText = response.content;
        } else if (typeof response === "string") {
          botText = response;
        } else {
          botText = JSON.stringify(response);
        }

        setMessages((prev) => [...prev, { sender: "bot", text: botText }]);
      })
      .catch((err: any) => {
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "❌ Error getting response." },
        ]);
        console.error(err);
      });
  };

  // === Voice Input ===
  const startListening = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("❌ Speech Recognition not supported in this browser.");
      return;
    }

    if (!recognitionRef.current) {
      const SpeechRecognition =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = "en-US";

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        setListening(false);
      };

      recognitionRef.current.onend = () => {
        setListening(false);
      };
    }

    setListening(true);
    recognitionRef.current.start();
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage();
  };

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div>
      {/* Floating Chat Button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 z-50 bg-blue-600 text-white font-bold px-4 py-2 rounded-full shadow-lg hover:bg-blue-500 transition"
      >
        Chat
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-20 right-6 z-50 w-[350px] md:w-[400px] h-[500px] bg-gray-800 rounded-2xl shadow-xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
            <h2 className="font-bold text-lg">FactCheck Bot</h2>
            <button
              onClick={toggleChat}
              className="font-bold text-red-500 hover:text-red-700 transition"
            >
              ❌
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-700 space-y-3">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`p-3 rounded-2xl max-w-[70%] break-words ${
                    msg.sender === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-600 text-white"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messageEndRef} />
          </div>

          {/* Input Area */}
          <div className="flex border-t border-gray-600">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="flex-1 p-3 bg-gray-700 text-white outline-none rounded-bl-2xl"
            />

            {/* 🎤 Microphone Icon */}
            <button
              onClick={startListening}
              className="px-4 text-white hover:opacity-80 transition"
            >
              {listening ? (
                <FaMicrophoneSlash size={20} className="text-red-500" />
              ) : (
                <FaMicrophone size={20} className="text-green-400" />
              )}
            </button>

            {/* Send Button */}
            <button
              onClick={sendMessage}
              className="bg-blue-600 px-4 font-bold text-white hover:bg-blue-500 transition rounded-br-2xl"
            >
              ⩓
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chatbot;
