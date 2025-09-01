import React, { useState } from 'react';
import { NavLink } from 'react-router';
import { FaRegArrowAltCircleLeft } from 'react-icons/fa';
import Button from '../News-Exam/Button';

const lessons = [
  {
    title: 'Lesson 1: Check References',
    points: [
      'Real news articles provide references like official reports or expert statements.',
      'Fake news often skips references or uses vague sources like “scientists say.”',
      'Always check if the article points to real data or trusted experts.',
    ],
  },
  {
    title: 'Lesson 2: Reverse Image Search',
    points: [
      'Fake news often reuses old or unrelated images.',
      'Use reverse image tools to check where the photo appeared first.',
      'If the image was used for another event years ago, the story is suspicious.',
    ],
  },
  {
    title: 'Lesson 3: Look for Expert Quotes',
    points: [
      'Reliable journalism includes quotes from experts like doctors, professors, or officials.',
      'Fake news often uses vague phrases like “sources claim” or “a friend said.”',
      'Experts add credibility, fake articles rely on mystery and rumors.',
    ],
  },
  {
    title: 'Lesson 4: Check the “About Us” Page',
    points: [
      'Real sites explain who runs them, their goals, and provide contact details.',
      'Fake news sites often skip the “About Us” page or keep it vague.',
      'If there’s no clear background, it’s suspicious.',
    ],
  },
  {
    title: 'Lesson 5: Emotional Triggers',
    points: [
      'Fake news tries to make you shocked, scared, or angry to spread quickly.',
      'Real news is usually calmer and professional.',
      'If it triggers strong emotions instantly, be cautious.',
    ],
  },
  {
    title: 'Lesson 6: Use Fact-Checking Sites',
    points: [
      'When in doubt, check fact-checking websites.',
      'Fake stories spread fast, but fact-checkers debunk them quickly.',
      'They provide evidence and explain why a claim is true or false.',
    ],
  },
  {
    title: 'Lesson 7: Social Media Verification',
    points: [
      'Fake accounts spread false info with little history or credibility.',
      'Check for verified checkmarks and reliable posting history.',
      'Be cautious with shocking or one-sided content.',
    ],
  },
  {
    title: 'Lesson 8: Too Many Ads',
    points: [
      'Websites with overwhelming ads may prioritize profit over truth.',
      'Serious news sites have ads, but not in excessive amounts.',
      'If a site bombards you with pop-ups, be careful.',
    ],
  },
  {
    title: 'Lesson 9: Writing Style',
    points: [
      'Good journalism is clear, formal, and balanced.',
      'Fake articles use dramatic words, exclamations, or “shocking truth revealed!”',
      'Paying attention to writing style helps spot fakes.',
    ],
  },
  {
    title: 'Lesson 10: Who Benefits?',
    points: [
      'Ask: who gains if this story is believed?',
      'Fake news is often for politics, profit, or reputation damage.',
      'Real news informs, fake news manipulates.',
    ],
  },
];

export default function NewsMidLessons() {
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
    <div className="px-4 py-6 bg-[#F9FAFB]">
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
              🎉 Great Work! 🎉
            </h2>
            <p className="my-2 text-lg">
              You have completed the Mid-Level Fake News Lessons!
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
        <h2 className="font-bold text-3xl md:text-4xl py-4 px-8 rounded-2xl bg-yellow-500 text-white shadow-lg">
          Mid-Level Fake News Lessons
        </h2>
        <div className="flex justify-between w-full max-w-5xl items-center">
          <NavLink
            to="/lessons"
            className="flex items-center gap-1 border-2 border-yellow-500 rounded-2xl px-4 py-2 font-bold hover:bg-yellow-500 hover:text-white transition"
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
              className="px-3 py-1 rounded-2xl border-2 border-yellow-500 bg-yellow-500 text-white font-bold"
            >
              Mid
            </NavLink>
            <NavLink
              to="/NewsHardlesson"
              className="px-3 py-1 rounded-2xl border-2 border-yellow-500 hover:bg-red-500 hover:text-white font-bold"
            >
              Hard
            </NavLink>
          </div>
        </div>
      </div>

      {/* Lesson Card */}
      <div className="bg-white shadow-lg rounded-3xl p-6 max-w-5xl mx-auto transition transform hover:scale-105">
        <h3 className="text-2xl font-bold text-yellow-600 mb-3">
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
