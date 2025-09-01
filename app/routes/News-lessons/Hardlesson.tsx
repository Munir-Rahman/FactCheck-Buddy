import React, { useState } from 'react';
import { NavLink } from 'react-router';
import { FaRegArrowAltCircleLeft } from 'react-icons/fa';
import Button from '../News-Exam/Button';

const lessons = [
  {
    title: 'Lesson 1: Metadata Check',
    points: [
      'Metadata is hidden info in photos/videos (like date, camera, editing software).',
      'Fake images often have metadata showing Photoshop use.',
      'You can check metadata with tools like ExifTool.',
      'If the date in metadata doesn’t match the story, it’s fake.',
      'Example: A “new war photo” with metadata from 2015 = fake.',
    ],
  },
  {
    title: 'Lesson 2: Deepfake Detection',
    points: [
      'Deepfakes are AI-generated fake videos.',
      'Look for unnatural blinking, mismatched lips and sound.',
      'Sometimes faces look “too smooth” or glitchy.',
      'Use AI-detection tools (like Deepware Scanner).',
      'If the video is only on TikTok/YouTube but not in news outlets → suspicious.',
    ],
  },
  {
    title: 'Lesson 3: Check Original Source',
    points: [
      'Always find where the story first appeared.',
      'If it started on a Facebook post or WhatsApp forward, not reliable.',
      'Real news usually starts from news agencies (Reuters, AP).',
      'If you can’t find the first source → be careful.',
    ],
  },
  {
    title: 'Lesson 4: Cross-Language Search',
    points: [
      'Fake news spreads only locally, not globally.',
      'Search the story in English, Arabic, or Pashto.',
      'If international media ignores it, it’s likely fake.',
      'Example: “NASA confirms the moon is falling” — no English site reported it, Fake.',
    ],
  },
  {
    title: 'Lesson 5: Consistency Test',
    points: [
      'Compare details: weather, time zones, background.',
      'Example: A “snowfall in Kandahar” photo in July → impossible.',
      'Check shadows: if the sun is wrong direction → edited.',
      'If facts don’t match reality, it’s fake.',
    ],
  },
  {
    title: 'Lesson 6: Expert Analysis',
    points: [
      'Some stories (health, science) require experts.',
      'Example: “Garlic cures cancer.”',
      'Only doctors/scientists can confirm.',
      'Always search what experts say, not just social media.',
    ],
  },
  {
    title: 'Lesson 7: Bot Activity',
    points: [
      'Fake news spreads fast with fake accounts (bots).',
      'If 100 accounts post the same message at the same second → bots.',
      'Tools like Botometer help detect.',
      'Real people post differently, not exactly the same text.',
    ],
  },
  {
    title: 'Lesson 8: Financial Motives',
    points: [
      'Many fake sites earn money from ads.',
      'Shocking fake headlines = more clicks = more money.',
      'Always think: “Is this news made just for profit?”',
      'Example: “Celebrity died” → fake → you click → they earn ad money.',
    ],
  },
  {
    title: 'Lesson 9: Compare Small Details',
    points: [
      'Look closely at photos: hands, ears, eyes, shadows.',
      'AI-generated fake pictures often have extra fingers or melted objects.',
      'Compare the background: does it match the story?',
      'If details are strange, the story is fake.',
    ],
  },
  {
    title: 'Lesson 10: Blockchain & Verification',
    points: [
      'Some real news now uses blockchain to prove authenticity.',
      'Example: Reuters & AP use verified digital certificates.',
      'If a photo/article has no verification, double-check.',
      'Future news will rely more on blockchain stamps to fight fakes.',
    ],
  },
];

export default function NewsHardLessons() {
  const [currentLesson, setCurrentLesson] = useState(0);
  const [completed, setCompleted] = useState(false);

  const nextLesson = () => {
    if (currentLesson < lessons.length - 1) {
      setCurrentLesson(currentLesson + 1);
    } else {
      setCompleted(true);
    }
  };

  const prevLesson = () => {
    if (currentLesson > 0) setCurrentLesson(currentLesson - 1);
  };

  const resetLessons = () => {
    setCurrentLesson(0);
    setCompleted(false);
  };

  return (
    <div className="px-4 py-6 bg-[#F9FAFB] min-h-screen">
      {/* Completion Modal */}
      {completed && (
        <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.8)] z-50">
          <div className="bg-white p-6 rounded-3xl w-[450px] text-center shadow-2xl relative">
            <span
              className="text-red-600 text-3xl font-bold cursor-pointer absolute top-4 right-6"
              onClick={resetLessons}
            >
              ⨉
            </span>
            <h2 className="text-3xl font-bold my-4 text-green-600">
              🎉 Excellent! 🎉
            </h2>
            <p className="my-2 text-lg">
              You have completed the Hard-Level Fake News Lessons!
            </p>
            <div className="mt-4 flex justify-between items-center w-full">
              <Button onClickFun={resetLessons} name="Review Again" />
              <NavLink to="/exam">
                <Button onClickFun={() => {}} name="Go to Exam" />
              </NavLink>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col gap-4 mb-6 items-center text-center">
        <h2 className="font-bold text-3xl md:text-4xl py-4 px-8 rounded-2xl bg-red-600 text-white shadow-lg">
          Hard-Level Fake News Lessons
        </h2>
        <div className="flex justify-between w-full max-w-5xl items-center">
          <NavLink
            to="/lessons"
            className="flex items-center gap-1 border-2 border-red-600 rounded-2xl px-4 py-2 font-bold hover:bg-red-600 hover:text-white transition"
          >
            <FaRegArrowAltCircleLeft /> Back
          </NavLink>
          <div className="flex gap-2 items-center">
            <span className="font-bold">Level:</span>
            <NavLink
              to="/NewsEasylesson"
              className="px-3 py-1 rounded-2xl border-2 border-yellow-500 hover:bg-blue-500 hover:text-white font-bold"
            >
              Easy
            </NavLink>
            <NavLink
              to="/NewsMidlesson"
              className="px-3 py-1 rounded-2xl border-2 border-yellow-500 hover:bg-yellow-500 hover:text-white font-bold"
            >
              Mid
            </NavLink>
            <NavLink
              to="/NewsHardlesson"
              className="px-3 py-1 rounded-2xl border-2 border-red-600 bg-red-600 text-white font-bold"
            >
              Hard
            </NavLink>
          </div>
        </div>
      </div>

      {/* Lesson Card */}
      <div className="bg-white shadow-lg rounded-3xl p-6 max-w-5xl mx-auto transition transform hover:scale-105">
        <h3 className="text-2xl font-bold text-red-600 mb-3">
          {lessons[currentLesson].title}
        </h3>
        <ul className="list-disc pl-5 text-gray-700 space-y-2 text-lg">
          {lessons[currentLesson].points.map((line, idx) => (
            <li key={idx}>{line}</li>
          ))}
        </ul>
      </div>

      {/* Navigation */}
      <div className="flex justify-between w-full max-w-5xl mx-auto mt-6">
        <div>
            <Button
            onClickFun={prevLesson}
            name="Previous"
            disabled={currentLesson === 0}
            />
        </div>
        <div>
            <Button
            onClickFun={nextLesson}
            name={currentLesson === lessons.length - 1 ? 'Finish' : 'Next'}
            />
        </div>
      </div>
    </div>
  );
}
