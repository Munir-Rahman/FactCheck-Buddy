import React, { useState } from 'react';
import { NavLink } from 'react-router';
import { FaRegArrowAltCircleLeft } from 'react-icons/fa';
import Button from '../News-Exam/Button';

const lessons = [
  {
    title: 'Lesson 1: Check the Source',
    points: [
      'Reliable news comes from trusted outlets (BBC, Al Jazeera, Reuters).',
      'Fake news often comes from unknown websites or blogs.',
      'Look for the website name carefully (is it real or misspelled?).',
      "If you've never heard of the source, be cautious.",
    ],
  },
  {
    title: 'Lesson 2: Look at the URL',
    points: [
      'Fake sites copy big names but change letters.',
      'Example: “cnn-news.com.co” vs “cnn.com”.',
      'Always check spelling in the link.',
      'Secure sites usually start with https://',
    ],
  },
  {
    title: 'Lesson 3: Sensational Headlines',
    points: [
      'If it sounds “too shocking,” it may be fake.',
      'Words like “shocking, unbelievable, secret” are warning signs.',
      'Real news usually uses neutral, professional headlines.',
      'Don’t trust just the headline — read the article.',
    ],
  },
  {
    title: 'Lesson 4: Grammar & Spelling Mistakes',
    points: [
      'Fake news writers don’t check grammar.',
      'Real newspapers are edited by professionals.',
      'Many spelling errors = suspicious.',
      'Example: “Preisdent Joee Biden meet Chian leader.”',
    ],
  },
  {
    title: 'Lesson 5: Date & Time',
    points: [
      'Some fake news recycles old events as new.',
      'Check if the date matches current events.',
      'Example: “Earthquake kills 1,000” — but it happened years ago.',
      'Always confirm time relevance.',
    ],
  },
  {
    title: 'Lesson 6: All Caps Writing',
    points: [
      '“BREAKING NEWS!!!” often = clickbait.',
      'Professional news rarely uses all caps.',
      'Excessive exclamation marks are suspicious.',
      'It’s a trick to grab your attention.',
    ],
  },
  {
    title: 'Lesson 7: Strange Images',
    points: [
      'Fake stories use photoshopped or stolen images.',
      'If the photo looks odd or unrelated, it’s suspicious.',
      'Sometimes a real photo is used with a fake story.',
      'Always check if the picture matches the text.',
    ],
  },
  {
    title: 'Lesson 8: No Author or Unknown Author',
    points: [
      'Trustworthy articles show the journalist’s name.',
      'Fake news often hides who wrote it.',
      'Sometimes fake authors with strange names are used.',
      'Check if the author writes for other trusted sites.',
    ],
  },
  {
    title: 'Lesson 9: Too Good/Bad to Be True',
    points: [
      '“Free iPhone for everyone!” = fake.',
      'Extreme positive or negative news is suspicious.',
      'If it feels unbelievable, it probably is.',
      'Always question such stories.',
    ],
  },
  {
    title: 'Lesson 10: Cross-Check Headlines',
    points: [
      'Search the same headline on Google.',
      'If only one website says it, be careful.',
      'Real news is usually reported by many sources.',
      'If big outlets ignore it, it might be fake.',
    ],
  },
];

export default function NewsEasyLessons() {
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
          <div className="bg-white p-6 rounded-3xl w-[450px] text-center shadow-2xl shadow-black relative">
            <span
              className="text-red-600 text-3xl font-bold cursor-pointer absolute top-4 right-6"
              onClick={resetLessons}
            >
              ⨉
            </span>
            <h2 className="text-3xl font-bold my-4 text-green-600">
              🎉 Congratulations 🎉
            </h2>
            <p className="my-2 text-lg">
              You Have Successfully Completed the Easy Lessons!
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
        <h2 className="font-bold text-3xl md:text-3xl py-4 px-8 rounded-2xl bg-blue-500 text-white shadow-lg">
          Learn About Fake News
        </h2>
        <div className="flex justify-between w-full max-w-5xl items-center">
          <NavLink
            to="/lessons"
            className="flex items-center gap-1 border-2 border-blue-500 rounded-2xl px-4 py-2 font-bold hover:bg-blue-500 hover:text-white transition"
          >
            <FaRegArrowAltCircleLeft /> Back
          </NavLink>
          <div className="flex gap-2 items-center">
            <span className="font-bold">Level:</span>
            <NavLink
              to="/NewsEasylesson"
              className="px-3 py-1 rounded-2xl border-2 border-blue-500 bg-blue-500 text-white font-bold"
            >
              Easy
            </NavLink>
            <NavLink
              to="/NewsMidlesson"
              className="px-3 py-1 rounded-2xl border-2 border-blue-500 hover:bg-yellow-500 hover:text-white font-bold"
            >
              Mid
            </NavLink>
            <NavLink
              to="/NewsHardlesson"
              className="px-3 py-1 rounded-2xl border-2 border-blue-500 hover:bg-red-500 hover:text-white font-bold"
            >
              Hard
            </NavLink>
          </div>
        </div>
      </div>

      {/* Lesson Card */}
      <div className="bg-white shadow-lg rounded-3xl p-6 max-w-5xl mx-auto transition transform hover:scale-105 border-2">
        <h3 className="text-2xl font-bold text-blue-600 mb-3">
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
