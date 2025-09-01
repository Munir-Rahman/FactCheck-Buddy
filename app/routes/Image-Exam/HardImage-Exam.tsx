import React, { useState } from 'react';
import { NavLink } from 'react-router';
import { FaRegArrowAltCircleLeft } from 'react-icons/fa';
import Button from './Button';

interface Question {
  text: string;
  image: string;
  options: { text: string; id: string }[];
}

export default function FackImage_Exam() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [submited, setSubmited] = useState(false);
  const [totalmarks, setTotalmarks] = useState(0);
  const [level, setLevel] = useState<string | null>(null);

  const questions: Question[] = [
    { text: 'Is This AI Generated (DeepFack)?', image: './image/h1.png', options: [{ text: 'Yes', id: 'true' }, { text: 'No', id: 'false' }] },
    { text: 'Is This AI Generated (DeepFack)?', image: './image/h2.png', options: [{ text: 'Yes', id: 'true' }, { text: 'No', id: 'false' }] },
    { text: 'Is This AI Generated (DeepFack)?', image: './image/h3.png', options: [{ text: 'Yes', id: 'true' }, { text: 'No', id: 'false' }] },
    { text: 'Is This AI Generated (DeepFack)?', image: './image/h4.png', options: [{ text: 'Yes', id: 'true' }, { text: 'No', id: 'false' }] },
    { text: 'Is This AI Generated (DeepFack)?', image: './image/h5.png', options: [{ text: 'Yes', id: 'true' }, { text: 'No', id: 'false' }] },
    { text: 'Is This AI Generated (DeepFack)?', image: './image/h6.png', options: [{ text: 'Yes', id: 'true' }, { text: 'No', id: 'false' }] },
    { text: 'Is This AI Generated (DeepFack)?', image: './image/h7.jpg', options: [{ text: 'Yes', id: 'true' }, { text: 'No', id: 'false' }] },
    { text: 'Is This AI Generated (DeepFack)?', image: './image/h8.jpg', options: [{ text: 'Yes', id: 'true' }, { text: 'No', id: 'false' }] },
    { text: 'Is This AI Generated (DeepFack)?', image: './image/h9.jpg', options: [{ text: 'Yes', id: 'true' }, { text: 'No', id: 'false' }] },
    { text: 'Is This AI Generated (DeepFack)?', image: './image/h10.jpg', options: [{ text: 'Yes', id: 'true' }, { text: 'No', id: 'false' }] },
  ];

  const handleAnswer = (idx: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = idx;
    setSelectedAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (selectedAnswers[currentQuestion] === undefined) {
      alert('Please select an answer before proceeding!');
      return;
    }
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      submitQuiz();
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1);
  };

  const submitQuiz = () => {
    let score = 0;
    selectedAnswers.forEach((selectedIdx, qIdx) => {
      if (questions[qIdx].options[selectedIdx].id === 'true') score += 40;
    });
    setTotalmarks(score);

    if (score >= 290) setLevel('Expert');
    else if (score >= 240) setLevel('High');
    else if (score >= 180) setLevel('Good');
    else setLevel('Bad');

    setSubmited(true);
    // ✅ Store results in localStorage
    localStorage.setItem('HardImageExamMarks', JSON.stringify({ score}))
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setSubmited(false);
    setTotalmarks(0);
    setLevel(null);
  };

  const question = questions[currentQuestion];

  return (
    <div className="px-4 py-6 md:px-12 md:py-8 lg:px-24 lg:py-10">
      {submited && (
        <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.85)] z-50">
          <div className="bg-white p-8 rounded-3xl w-full max-w-md text-center shadow-2xl shadow-black relative">
            <span className="text-red-600 text-3xl font-bold cursor-pointer absolute top-4 right-6" onClick={resetQuiz}>⨉</span>
            <h2 className="text-3xl font-bold my-4 text-green-600">🎉 Congratulations 🎉</h2>
            <p className="my-2 text-lg">You Have Successfully Completed The Test</p>
            <p className="my-2 font-semibold">Total Score: <span className="text-blue-600">{totalmarks}</span></p>
            <p className="my-2 font-semibold">Level: <span className={`${level === 'Bad' ? 'text-red-500' : 'text-green-600'}`}>{level}</span></p>
            <div className='mt-4 flex justify-between items-center w-full'>
              <Button onClickFun={resetQuiz} name="Retry" />
              <NavLink to="/exam">
                <Button onClickFun={() => { }} name="Back to Home" />
              </NavLink>
            </div>
          </div>
        </div>
      )}

      <h2 className="w-full text-center font-bold text-3xl mb-4 text-pink-700">Know About Deepfake Images</h2>

      <div className="flex justify-between items-center mb-6 flex-wrap gap-2">
        <NavLink
          to='/exam'
          className="flex items-center gap-2 p-2 border-2 rounded-2xl hover:bg-white hover:text-black font-bold"
        >
          <FaRegArrowAltCircleLeft /> Back
        </NavLink>
        <div className="flex gap-2 items-center">
          <span className="font-bold">Level:</span>
          <NavLink to='/EasyImageExam' className="px-3 py-1 rounded-xl border-2 border-white bg-gray-500 text-white">Easy</NavLink>
          <NavLink to='/MidImageExam' className="px-3 py-1 rounded-xl border-2 border-white bg-gray-400 text-white">Mid</NavLink>
          <NavLink to='/HardImageExam' className="px-3 py-1 rounded-xl border-2 border-white bg-red-500 text-white">Hard</NavLink>
        </div>
      </div>

      <div className="bg-cyan-700 p-6 rounded-3xl mb-6 shadow-lg shadow-black">
        <h2 className="text-2xl font-bold text-amber-300">Question {currentQuestion + 1}</h2>
        <p className="text-white text-lg mt-2 mb-4">{question.text}</p>
        <div className="flex justify-center items-center">
          <img src={question.image} alt={`Question ${currentQuestion + 1}`} className="w-full md:w-3/4 lg:w-1/2 h-auto rounded-2xl object-cover shadow-md shadow-black" />
        </div>
      </div>

      <div className="flex flex-col gap-4 mb-6">
        {question.options.map((opt, idx) => (
          <div
            key={idx}
            className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all shadow hover:shadow-lg ${selectedAnswers[currentQuestion] === idx ? 'bg-green-500 text-white' : 'bg-white text-black hover:bg-green-200'}`}
            onClick={() => handleAnswer(idx)}
          >
            <input type="radio" checked={selectedAnswers[currentQuestion] === idx} readOnly className="mr-2" />
            <span className="text-lg">{String.fromCharCode(65 + idx)}: {opt.text}</span>
          </div>
        ))}
      </div>

      <div className="flex justify-between w-full items-center flex-nowrap">
        <div>
        <Button onClickFun={prevQuestion} name="Previous" disabled={currentQuestion === 0} />
        </div>
        <div>
        <Button onClickFun={nextQuestion} name={currentQuestion === questions.length - 1 ? "Submit" : "Next"} />
        </div>
      </div>
    </div>
  );
}
