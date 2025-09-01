import React, { useState } from 'react';
import { NavLink } from 'react-router';
import { FaRegArrowAltCircleLeft } from 'react-icons/fa';
import Button from '../News-Exam/Button';

const lessons = [
  {
    title: 'Lesson 1: Genuine Human Expression – (Real)',
    image: './image/1.jpg',
    description:
      'This is a real human photo. Look closely at the skin: there are tiny pores, uneven textures, and slight redness around the nose and cheeks. These natural imperfections are nearly impossible for AI to replicate consistently. Clue: Real people always have slight flaws—pimples, lines, or uneven lighting—that AI usually smooths out too much.',
  },
  {
    title: 'Lesson 2: Too Perfect to Be True – (Fake / AI)',
    image: './image/2.jpg',
    description:
      'At first glance, this looks like a professional portrait, but the skin looks airbrushed—smooth like plastic, with no pores at all. Around the hair edges, the strands blend into the background instead of being crisp. Clue: If the person looks flawless, with zero imperfections, it’s usually AI.',
  },
  {
    title: 'Lesson 3: Architectural Beauty by the Water – (Real)',
    image: './image/3.jpg',
    description:
      'A modern building reflected in water. The reflection matches the building perfectly, following natural ripples. AI often struggles with reflections, while real photos keep symmetry when light bounces.',
  },
  {
    title: 'Lesson 4: Human Image at the Beach – (Real)',
    image: './image/4.jpg',
    description:
      'Natural imperfections like pores, redness, and soft shadows make this a real photo. The reflection in the eyes also matches the outdoor environment.',
  },
  {
    title: 'Lesson 5: Plastic Glamour – (Fake / AI)',
    image: './image/5.jpg',
    description:
      'The lipstick and teeth are unnaturally perfect. Real teeth always have imperfections. Overly polished beauty photos usually come from AI.',
  },
  {
    title: 'Lesson 6: Painted Portrait – (Fake / AI)',
    image: './image/6.jpg',
    description:
      'Skin looks flat, hair strands blur into the background, and eyes lack depth. AI often struggles with hair details.',
  },
  {
    title: 'Lesson 7: Cosmic Dunk – (Fake / AI)',
    image: './image/7.jpg',
    description:
      'A basketball player glowing in neon galaxies. Clearly fantasy art — the physics of lighting are impossible. Surreal environments are a strong AI clue.',
  },
  {
    title: 'Lesson 8: Sandcastle Chess – (Fake / AI)',
    image: './image/8.jpg',
    description:
      'Chess pieces made of sand look unrealistic. Sand grains don’t follow gravity. AI often mixes unrelated objects (chess + sandcastles).',
  },
  {
    title: 'Lesson 9: Symmetry Trap – (Fake / AI)',
    image: './image/9.jpg',
    description:
      'A smiling girl with perfectly even features. No human face is perfectly symmetrical. AI tends to exaggerate symmetry.',
  },
  {
    title: 'Lesson 10: Plastic Passport Photo – (Fake / AI)',
    image: './image/10.jpg',
    description:
      'Flat skin tones, wrong shadows, and lifeless eyes make this an AI image. Clue: Flat skin and dead eyes are red flags.',
  },
];

export default function DeepFack_imagess() {
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
              You Have Successfully Completed the Deepfake Image Lessons!
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
              className="px-3 py-1 rounded-2xl border-2 bg-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white font-bold"
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
              className="px-3 py-1 rounded-2xl border-2 border-red-500 hover:bg-red-500 hover:text-white font-bold"
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
          <p className="text-lg text-gray-700">{lessons[currentLesson].description}</p>
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
