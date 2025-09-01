// MILBoardGameResponsive.tsx
import React, { useState, useEffect, useRef } from "react";

const AVATARS = ["🐶", "🦊", "🦁", "🐼", "🦄", "👾", "🧠", "🕵️‍♀️"];
const BOARD_SIZE = 10;
const FINAL_CELL = BOARD_SIZE * BOARD_SIZE;
const SNAKES: Record<number, number> = { 98: 78, 95: 56, 88: 24, 62: 19, 48: 26, 36: 6, 16: 8 };
const LADDERS: Record<number, number> = { 2: 38, 7: 14, 8: 31, 15: 26, 21: 42, 28: 84, 36: 44, 51: 67, 71: 91, 78: 98, 87: 94 };
const TIPS: Record<number, string> = {
  3: "Check the source before believing a headline.",
  11: "Verify images with reverse image search.",
  17: "Sensational words often signal clickbait.",
  23: "Check the date — old events can be recycled.",
  35: "Look for named experts & citations.",
  49: "Don't trust articles with many errors.",
  57: "Check multiple outlets — real news is widely reported.",
  76: "Be skeptical of everything 'too good to be true'.",
  82: "Beware of social media posts with no source links.",
  90: "Use fact-checkers when in doubt (e.g. Snopes).",
};
const BOOSTS: Record<number, number> = { 5: 2, 12: 3, 18: -2, 26: 2, 33: -3, 41: 2, 54: -2, 68: 3, 79: -3, 85: 2 };

export default function MILBoardGameResponsive() {
  const [avatarIndex, setAvatarIndex] = useState(0);
  const [position, setPosition] = useState(0);
  const [dice, setDice] = useState(1);
  const [rolling, setRolling] = useState(false);
  const [message, setMessage] = useState("Pick an avatar and roll the dice!");
  const [moves, setMoves] = useState(0);
  const [history, setHistory] = useState<number[]>([]);
  const [showTip, setShowTip] = useState<string | null>(null);
  const [confetti, setConfetti] = useState(false);
  const [bestMoves, setBestMoves] = useState(0);

  const rollingRef = useRef(false);
  const stepTimeouts = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = parseInt(localStorage.getItem("mil_best_moves") || "0", 10);
      if (stored) setBestMoves(stored);
    }
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space") { e.preventDefault(); rollDice(); }
      if (e.code === "ArrowLeft") setAvatarIndex((i) => (i - 1 + AVATARS.length) % AVATARS.length);
      if (e.code === "ArrowRight") setAvatarIndex((i) => (i + 1) % AVATARS.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const buildBoard = () => {
    const rows = [];
    const total = FINAL_CELL;
    for (let r = 0; r < BOARD_SIZE; r++) {
      const row = [];
      const rowStart = total - r * BOARD_SIZE;
      for (let c = 0; c < BOARD_SIZE; c++) {
        const num = r % 2 === 0 ? rowStart - c : rowStart - (BOARD_SIZE - 1 - c);
        row.push(num);
      }
      rows.push(row);
    }
    return rows;
  };
  const boardRows = buildBoard();

  const rollDice = async () => {
    if (rollingRef.current || position >= FINAL_CELL) return;
    rollingRef.current = true;
    setRolling(true);
    setMessage("Rolling dice...");
    for (let i = 0; i < 10; i++) {
      await new Promise((res) => setTimeout(res, 70));
      setDice(1 + Math.floor(Math.random() * 6));
    }
    const result = 1 + Math.floor(Math.random() * 6);
    setDice(result);
    setMessage(`You rolled ${result}! Moving...`);
    setMoves((m) => m + 1);
    setHistory((h) => [...h, result]);

    stepTimeouts.current.forEach((t) => clearTimeout(t));
    stepTimeouts.current = [];
    for (let i = 1; i <= result; i++) {
      const t = setTimeout(() => setPosition((p) => Math.min(p + 1, FINAL_CELL)), i * 300);
      stepTimeouts.current.push(t);
    }

    const finalTimeout = setTimeout(() => {
      setPosition((p) => {
        let landed = p;
        if (LADDERS[landed]) { setMessage(`Verified info boost! Climb to ${LADDERS[landed]} 🚀`); setTimeout(() => setPosition(LADDERS[landed]), 300); }
        else if (SNAKES[landed]) { setMessage(`Fake news trap! Slide to ${SNAKES[landed]} 🐍`); setTimeout(() => setPosition(SNAKES[landed]), 300); }
        else if (BOOSTS[landed]) { const move = BOOSTS[landed]; setMessage(move > 0 ? `Media literacy boost! Move forward ${move} ✅` : `Misinformation trap! Move back ${-move} ❌`); setTimeout(() => setPosition(Math.min(Math.max(landed + move, 0), FINAL_CELL)), 300); }
        else if (TIPS[landed]) { setShowTip(TIPS[landed]); setMessage("Learn this tip to spot fake news!"); }
        else { setMessage("Nice move! Roll again (or press Space)."); }
        return p;
      });
      setTimeout(() => { setRolling(false); rollingRef.current = false; if (position >= FINAL_CELL) onWin(); }, 400);
    }, (result + 1) * 300);
    stepTimeouts.current.push(finalTimeout);
  };

  const onWin = () => {
    setMessage("🎉 You reached the finish! Excellent fact-checking!");
    setConfetti(true);
    setTimeout(() => setConfetti(false), 4000);
    if (typeof window !== "undefined") {
      const prev = parseInt(localStorage.getItem("mil_best_moves") || "0", 10);
      if (!prev || moves < prev) { localStorage.setItem("mil_best_moves", String(moves)); setBestMoves(moves); setMessage("New best! You're a media literacy champion 🏆"); }
      else setBestMoves(prev);
    }
  };

  const resetGame = (keepAvatar = true) => {
    stepTimeouts.current.forEach((t) => clearTimeout(t));
    stepTimeouts.current = [];
    setPosition(0);
    setDice(1);
    setMoves(0);
    setHistory([]);
    setShowTip(null);
    setRolling(false);
    rollingRef.current = false;
    setMessage(keepAvatar ? "Restarted! Roll to begin." : "Pick avatar and start!");
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 bg-gradient-to-b from-white to-blue-50 flex flex-col items-center">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-4 text-blue-900 text-center">🎲 Media Literacy Ludo</h1>
      <p className="mb-2 sm:mb-4 text-sm sm:text-base md:text-lg font-semibold text-blue-700 text-center">Learn to spot fake news while having fun!</p>

      {/* Avatar Picker */}
      <div className="flex gap-2 sm:gap-3 mb-2 sm:mb-4 flex-wrap justify-center">
        {AVATARS.map((a, i) => (
          <button key={i} className={`w-10 h-10 sm:w-14 sm:h-14 text-xl sm:text-3xl rounded-xl ${i === avatarIndex ? "ring-4 ring-blue-500" : ""}`} onClick={() => setAvatarIndex(i)}>
            {a}
          </button>
        ))}
      </div>

      {/* Dice & Controls */}
      <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 mb-2 sm:mb-4">
        <div className={`w-16 h-16 sm:w-20 sm:h-20 text-2xl sm:text-4xl flex items-center justify-center rounded-lg bg-white shadow-md ${rolling ? "animate-bounce" : ""}`}>{dice}</div>
        <button onClick={rollDice} className="px-3 sm:px-4 py-2 sm:py-2.5 bg-blue-600 text-white rounded-lg shadow-md text-sm sm:text-base">{position>=FINAL_CELL ? "Finished" : rolling ? "Rolling..." : "Roll Dice"}</button>
        <button onClick={() => resetGame(true)} className="px-3 sm:px-4 py-2 sm:py-2.5 bg-green-600 text-white rounded-lg shadow-md text-sm sm:text-base">Restart</button>
      </div>

      <div className="mb-2 sm:mb-4 font-semibold text-blue-800 text-center">{message}</div>

      {/* Board */}
      <div className="grid grid-cols-10 gap-1 sm:gap-2">
        {boardRows.flat().map((num) => {
          const isPlayer = num === position;
          const isSnake = !!SNAKES[num];
          const isLadder = !!LADDERS[num];
          const boost = BOOSTS[num];
          const tip = TIPS[num];
          return (
            <div key={num} className={`w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20 border rounded-md flex items-center justify-center relative text-xs sm:text-base md:text-lg ${isPlayer ? "bg-yellow-300" : "bg-white"} ${isSnake ? "bg-red-200" : ""} ${isLadder ? "bg-green-200" : ""} ${boost ? "bg-purple-200" : ""}`}>
              {num}
              {isPlayer && <div className="absolute text-lg sm:text-2xl md:text-3xl animate-bounce">{AVATARS[avatarIndex]}</div>}
              {isSnake && <span className="absolute top-0 right-0 text-xs sm:text-sm md:text-base">🐍</span>}
              {isLadder && <span className="absolute bottom-0 left-0 text-xs sm:text-sm md:text-base">🪜</span>}
              {boost && <span className="absolute bottom-0 right-0 text-xs sm:text-sm md:text-base">⚡</span>}
              {tip && <span className="absolute top-0 left-0 text-xs sm:text-sm md:text-base">💡</span>}
            </div>
          );
        })}
      </div>

      {/* Tip Modal */}
      {showTip && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2" onClick={() => setShowTip(null)}>
          <div className="bg-white p-4 sm:p-6 rounded-lg w-full max-w-xs sm:max-w-sm text-center">
            <h2 className="font-bold text-base sm:text-lg mb-2">Media Tip 🧠</h2>
            <p className="mb-4 text-sm sm:text-base">{showTip}</p>
            <button onClick={() => setShowTip(null)} className="px-3 sm:px-4 py-2 sm:py-2.5 bg-blue-600 text-white rounded-lg text-sm sm:text-base">Close</button>
          </div>
        </div>
      )}

      {/* Confetti */}
      {confetti && Array.from({ length: 100 }).map((_, i) => (
        <div key={i} className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500" style={{
          top: Math.random() * 100 + "%",
          left: Math.random() * 100 + "%",
          animation: `fall ${Math.random() * 2 + 2}s linear infinite`,
        }} />
      ))}

      <style>{`
        @keyframes fall {0%{transform:translateY(0)}100%{transform:translateY(120vh)}}
      `}</style>
    </div>
  );
}
