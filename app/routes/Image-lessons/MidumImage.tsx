import React, { useState } from 'react';
import { NavLink } from 'react-router';
import { FaRegArrowAltCircleLeft } from 'react-icons/fa';
import Button from '../News-Exam/Button';

const lessons = [
  {
    title: 'Lesson 1: Staged Vintage Illusion – (Fake / AI)',
    image: './image/11.jpg',
    description:
      'Looks like an old black-and-white photograph. But the man’s proportions are slightly wrong, and the dog’s body blends oddly with the background. Clue: AI struggles with vintage style—it exaggerates contrast and creates mismatched shadows.',
  },
  {
    title: 'Lesson 2: Street Style Snapshot – (Real)',
    image: './image/12.jpg',
    description:
      'Two fashionable women walking with natural clothing folds and real-world randomness (one holding a pet). The faces show asymmetry, and the glasses reflect the real environment. Clue: Real photos often capture messy details—wrinkles in clothes, hair blowing, reflections in glasses.',
  },
  {
    title: 'Lesson 3: Overdone Wrinkles – (Fake / AI)',
    image: './image/13.jpg',
    description:
      'An elderly man with extreme detail. The wrinkles are too sharp and evenly spread, and the jewelry is overly symmetrical. Clue: AI often exaggerates details like wrinkles, making them look too perfect.',
  },
  {
    title: 'Lesson 4: Broken Reflections – (Fake / AI)',
    image: './image/14.jpg',
    description:
      'A woman with glasses, but the reflection in the lenses doesn’t match her surroundings. Also, the face texture is unusually smooth. Clue: Always check glasses or shiny objects. If reflections don’t make sense, it’s fake.',
  },
  {
    title: 'Lesson 5: Lightning That Lies – (Fake / AI)',
    image: './image/15.jpg',
    description:
      'A thunderstorm outside the window looks dramatic, but the lightning doesn’t cast light into the room. The cup on the table should glow from the strike but doesn’t. Clue: In real photos, outside light always affects inside objects.',
  },
  {
    title: 'Lesson 6: Gravity-Defying Jump – (Fake / AI)',
    image: './image/16.jpg',
    description:
      'A man jumping into a galaxy sky. The glowing nebula makes it surreal. Clue: If the scene looks like science fiction, it’s AI art.',
  },
  {
    title: 'Lesson 7: Copy-Paste Tools – (Fake / AI)',
    image: './image/17.jpg',
    description:
      'A workbench of tools looks realistic, but zooming in shows repeated textures on the metal. AI loves copy-paste patterns. Clue: If objects look duplicated, it’s fake.',
  },
  {
    title: 'Lesson 8: Dreamlike Sunset – (Fake / AI)',
    image: './image/18.jpg',
    description:
      'The sunset looks beautiful, but the clouds are too smooth and the water reflection lacks real ripples. Clue: Real skies always have irregular grain and noise.',
  },
  {
    title: 'Lesson 9: Authentic Classroom Moment – (Real)',
    image: './image/19.jpg',
    description:
      'A teacher in front of a blackboard. His glasses have realistic glare, his suit has wrinkles, and the chalkboard shows imperfect writing. Clue: Look for random imperfections—creases, glare, and messiness always prove reality.',
  },
  {
    title: 'Lesson 10: Desert Fox Beauty – (Real)',
    image: './image/20.jpg',
    description:
      'A fennec fox with veins visible in its ears, natural sandy textures, and realistic shadows. The eyes reflect real light sources. Clue: Tiny biological details (veins, fur imperfections) are hard for AI to fake.',
  },
];

export default function DeepFack_images_mid() {
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
              className="px-3 py-1 rounded-2xl border-2 border-blue-500 hover:bg-blue-500 hover:text-white font-bold"
            >
              Easy
            </NavLink>
            <NavLink
              to="/MidImage"
              className="px-3 py-1 rounded-2xl border-2 bg-yellow-500 border-yellow-500 hover:bg-yellow-500 hover:text-white font-bold"
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
