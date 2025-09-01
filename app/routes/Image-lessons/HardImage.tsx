import React, { useState } from 'react';
import { NavLink } from 'react-router';
import { FaRegArrowAltCircleLeft } from 'react-icons/fa';
import Button from '../News-Exam/Button';

const lessons = [
  {
    title: 'Lesson 1: Stuffed Toy Illusion – (Fake / AI)',
    image: './image/21.jpg',
    description:
      'This baby animal looks cute, but the fur melts into the fingers holding it. It feels more like a toy than a living animal. Clue: Check the boundary between fur and hands—AI often blends them poorly.',
  },
  {
    title: 'Lesson 2: Cuddly Fantasy – (Fake / AI)',
    image: './image/22.jpg',
    description:
      'A puppy and kitten posed perfectly together. Both look overly smooth, and the blanket pattern repeats unnaturally. Clue: Real animals rarely sit in picture-perfect harmony.',
  },
  {
    title: 'Lesson 3: Shiny Puppy Trick – (Fake / AI)',
    image: './image/23.jpg',
    description:
      'A dog portrait with glowing fur and shiny highlights that look painted. Real dog fur scatters light differently. Clue: Glossy cartoon-like fur is AI-made.',
  },
  {
    title: 'Lesson 4: Fantasy Fox Painting – (Fake / AI)',
    image: './image/24.jpg',
    description:
      'A fox with glowing fur and painterly strokes. The background is full of colorful particles, which don’t exist in wildlife photos. Clue: If it looks like art, it’s AI art.',
  },
  {
    title: 'Lesson 5: Wild Jungle Illusion – (Fake / AI)',
    image: './image/25.jpg',
    description:
      'This leopard looks close to real, but its fur pattern repeats unnaturally, and the eyes are too glossy. Clue: AI often makes repetitive textures on animals.',
  },
  {
    title: 'Lesson 6: Perfect Pizza Night – (Fake / AI)',
    image: './image/26.jpg',
    description:
      'A family eating pizza with everyone smiling perfectly. The food, hands, and faces are too clean and symmetrical. Clue: Real dinners are messy—cheese stretches, uneven slices, random crumbs.',
  },
  {
    title: 'Lesson 7: Cartoon Octopus – (Fake / AI)',
    image: './image/27.jpg',
    description:
      'A neon-colored octopus with huge cartoon eyes. The style is obviously artificial. Clue: Unnatural colors or shapes = AI illustration.',
  },
  {
    title: 'Lesson 8: Fantasy Forest – (Fake / AI)',
    image: './image/28.jpg',
    description:
      'A glowing moon in a mystical forest. The tree patterns repeat, and the light doesn’t match natural moonlight. Clue: AI repeats shapes in nature scenes.',
  },
  {
    title: 'Lesson 9: Painted Portrait Glow – (Fake / AI)',
    image: './image/29.jpg',
    description:
      'A woman surrounded by rainbow colors. The face edges blur into the background. Clue: Blurry outlines + painted effects = AI-generated.',
  },
  {
    title: 'Lesson 10: Studio-Style Illusion – (Fake / AI)',
    image: './image/30.jpg',
    description:
      'A realistic-looking portrait, but the skin is too smooth and the eye reflections look fabricated. Clue: If a photo looks almost too perfect—like a magazine model—it’s often AI.',
  },
];

export default function DeepFack_images() {
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
              You Have Successfully Completed the Hard Deepfake Lessons!
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
        <h2 className="font-bold text-3xl py-4 px-8 rounded-2xl bg-pink-700 text-white shadow-lg">
          Know Deepfake Images
        </h2>
        <div className="flex justify-between w-full max-w-5xl items-center">
          <NavLink
            to="/lessons"
            className="flex items-center gap-1 border-2 border-pink-700 rounded-2xl px-4 py-2 font-bold hover:bg-pink-700 hover:text-white transition"
          >
            <FaRegArrowAltCircleLeft /> Back
          </NavLink>
          <div className="flex gap-2 items-center">
            <span className="font-bold">Level:</span>
            <NavLink
              to="/EasyImage"
              className="px-3 py-1 rounded-2xl border-2 border-blue-500 hover:bg-blue-500 hover:text-white font-bold"
            >
              Easy
            </NavLink>
            <NavLink
              to="/MidImage"
              className="px-3 py-1 rounded-2xl border-2 border-yellow-500 hover:bg-yellow-500 hover:text-white font-bold"
            >
              Mid
            </NavLink>
            <NavLink
              to="/HardImage"
              className="px-3 py-1 rounded-2xl border-2 bg-red-500 border-red-500 hover:bg-red-500 hover:text-white font-bold"
            >
              Hard
            </NavLink>
          </div>
        </div>
      </div>

      {/* Lesson Card */}
      <div className="bg-white shadow-lg rounded-3xl p-6 max-w-5xl mx-auto transition transform hover:scale-105 border-2">
        <h3 className="text-2xl font-bold text-pink-600 mb-3">
          {lessons[currentLesson].title}
        </h3>
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <img
            src={lessons[currentLesson].image}
            alt="lesson"
            className="w-[90%] md:w-[300px] h-auto rounded-2xl shadow-2xl shadow-black"
          />
          <p className="text-lg text-gray-700">
            {lessons[currentLesson].description}
          </p>
        </div>
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
