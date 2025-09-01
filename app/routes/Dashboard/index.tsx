import React, { useEffect, useState } from "react";
import ProgressCircle from "./CircleCard";

export default function Dashboard() {
    const Name = "Munir Rahman";

    // State to store marks
    const [marks, setMarks] = useState({
        EasyNewsExam: 0,
        MidNewsExam: 0,
        HardNewsExam: 0,
        EasyImageExam: 0,
        MidImageExam: 0,
        HardImageExam: 0
    });

    // Total marks and max possible marks
    const maxMarks = {
        Easy: 30,
        Mid: 30,
        Hard: 40
    };
    const totalMaxMarks = 2400;

    useEffect(() => {
        // Fetch marks from localStorage
        const newMarks = {
            EasyNewsExam: JSON.parse(localStorage.getItem('EasyNewsExamMarks') || '0').score || 0,
            MidNewsExam: JSON.parse(localStorage.getItem('MidNewsExamMarks') || '0').score || 0,
            HardNewsExam: JSON.parse(localStorage.getItem('HardNewsExamMarks') || '0').score || 0,
            EasyImageExam: JSON.parse(localStorage.getItem('EasyImageExamMarks') || '0').score || 0,
            MidImageExam: JSON.parse(localStorage.getItem('MidImageExamMarks') || '0').score || 0,
            HardImageExam: JSON.parse(localStorage.getItem('HardImageExamMarks') || '0').score || 0
        };
        setMarks(newMarks);
    }, []);

    // Calculate total obtained marks
    const total = Object.values(marks).reduce((acc, val) => acc + val, 0);

    // Calculate Level based on percentage
    const percentage = (total / totalMaxMarks) * 100;
    let Level = 1;
    if (percentage >= 80) Level = 5;
    else if (percentage >= 60) Level = 4;
    else if (percentage >= 40) Level = 3;
    else if (percentage >= 20) Level = 2;
    else Level = 1;

    // Result text
    const Result = () => {
        if (percentage >= 90) return <p>🏆 Top Rated</p>;
        else if (percentage >= 80) return <p>🥇 Level A</p>;
        else if (percentage >= 70) return <p>🥈 Level B</p>;
        else if (percentage >= 60) return <p>🥉 Level C</p>;
        else if (percentage >= 50) return <p>⭐ Level D</p>;
        else if (percentage >= 40) return <p>✨ Level E</p>;
        else if (percentage >= 30) return <p>💡 Level F</p>;
        else return <p>🔎 Low Level</p>;
    };

    // Badge unlock system
    const isBronzeUnlocked = Level >= 2;
    const isSilverUnlocked = Level >= 4;
    const isGoldUnlocked = Level >= 5;

    // Helper to calculate percentage for progress circle
    const getPercentage = (score: number, max: number) => (score / max) * 100;

    return (
        <div className="flex flex-col w-full min-h-screen bg-gradient-to-r from-green-50 to-blue-50 text-gray-900">
            {/* Header */}
            <div className="text-center py-6 bg-gradient-to-r from-blue-600 to-green-600 text-white shadow-lg">
                <h1 className="font-bold text-3xl">📊 Dashboard</h1>
                <h2 className="text-lg mt-2">
                    Dear <span className="font-bold text-yellow-300">User</span>, You are in{" "}
                    <span className="text-white font-bold">Level {Level}</span>
                </h2>
                <div className="mt-2">{Result()}</div>

                {/* ✅ Level Progress Bar */}
                <div className="mt-4 flex justify-center items-center gap-2 px-4">
                    <span className="font-bold text-sm text-yellow-200">Level 1</span>
                    <div className="w-64 h-4 border-2 rounded-full overflow-hidden bg-white">
                        <div
                            className="bg-green-400 h-full transition-all duration-500"
                            style={{
                                width: `${((percentage / 100) * 100).toFixed(2)}%`
                            }}
                        ></div>
                    </div>
                    <span className="font-bold text-sm text-yellow-200">Level 5</span>
                </div>
            </div>


            {/* Badges */}
            <div className="px-6 mt-10">
                <h2 className="text-xl font-bold mb-4">🏅 Badges</h2>
                <div className="flex flex-wrap justify-center md:justify-between gap-6">
                    {/* Bronze */}
                    <div className="flex flex-col items-center">
                        <img
                            src="./image/bronze.jpg"
                            alt="Bronze Badge"
                            className={`w-40 h-40 object-contain rounded-full shadow-md ${isBronzeUnlocked ? "" : "opacity-50 grayscale"
                                }`}
                        />
                        <p className="mt-2 font-semibold text-green-700">
                            {isBronzeUnlocked ? "Unlocked" : "Locked"}
                        </p>
                    </div>

                    {/* Silver */}
                    <div className="flex flex-col items-center">
                        <img
                            src="./image/silver.jpeg"
                            alt="Silver Badge"
                            className={`w-40 h-40 object-contain rounded-full shadow-md ${isSilverUnlocked ? "" : "opacity-50 grayscale"
                                }`}
                        />
                        <p className="mt-2 font-semibold text-green-700">
                            {isSilverUnlocked ? "Unlocked" : "Locked"}
                        </p>
                    </div>

                    {/* Gold */}
                    <div className="flex flex-col items-center">
                        <img
                            src="./image/golden.jpg"
                            alt="Golden Badge"
                            className={`w-40 h-40 object-contain rounded-full shadow-md ${isGoldUnlocked ? "" : "opacity-50 grayscale"
                                }`}
                        />
                        <p className="mt-2 font-semibold text-green-700">
                            {isGoldUnlocked ? "Unlocked" : "Locked"}
                        </p>
                    </div>
                </div>
            </div>

            {/* Overall Progress */}
            <div className="px-6 mt-12">
                <h2 className="text-xl font-bold mb-4">📈 Overall Progress</h2>
                <div className="bg-white rounded-2xl shadow-md p-6 space-y-2">
                    <p className="font-semibold">Total Score: {total} / {totalMaxMarks}</p>
                    <p className="font-semibold">Percentage: {percentage.toFixed(2)}%</p>
                </div>
            </div>

            {/* Exam Progress Sections */}
            <div className="px-6 mt-12 space-y-10">
                {/* Fake News Test */}
                <div>
                    <h2 className="text-xl font-bold mb-4">📰 Fake News Test Progress</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="flex flex-col items-center">
                            <h3 className="font-semibold text-blue-500 mb-2">Easy Test</h3>
                            <ProgressCircle percentage={getPercentage(marks.EasyNewsExam, maxMarks.Easy)} />
                        </div>
                        <div className="flex flex-col items-center">
                            <h3 className="font-semibold text-yellow-500 mb-2">Medium Test</h3>
                            <ProgressCircle percentage={getPercentage(marks.MidNewsExam, maxMarks.Mid)} />
                        </div>
                        <div className="flex flex-col items-center">
                            <h3 className="font-semibold text-red-500 mb-2">Hard Test</h3>
                            <ProgressCircle percentage={getPercentage(marks.HardNewsExam, maxMarks.Hard)} />
                        </div>
                    </div>
                </div>

                {/* Deepfake Image Test */}
                <div>
                    <h2 className="text-xl font-bold mb-4">🖼️ Deepfake Image Test Progress</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="flex flex-col items-center">
                            <h3 className="font-semibold text-blue-500 mb-2">Easy Test</h3>
                            <ProgressCircle percentage={getPercentage(marks.EasyImageExam, maxMarks.Easy)} />
                        </div>
                        <div className="flex flex-col items-center">
                            <h3 className="font-semibold text-yellow-500 mb-2">Medium Test</h3>
                            <ProgressCircle percentage={getPercentage(marks.MidImageExam, maxMarks.Mid)} />
                        </div>
                        <div className="flex flex-col items-center">
                            <h3 className="font-semibold text-red-500 mb-2">Hard Test</h3>
                            <ProgressCircle percentage={getPercentage(marks.HardImageExam, maxMarks.Hard)} />
                        </div>
                    </div>
                </div>
            </div>

            <footer className="mt-12 text-center text-sm text-gray-500 py-4">
                Developed for <span className="font-semibold">UNESCO Youth Hackathon</span> © 2025
            </footer>
        </div>
    );
}
