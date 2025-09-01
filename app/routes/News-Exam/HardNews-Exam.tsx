import React, { useState } from 'react'
import { NavLink } from 'react-router'
import { FaRegArrowAltCircleLeft } from 'react-icons/fa'
import Button from './Button'

export default function FackNews_Exam() {
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])
    const [submited, setSubmited] = useState(false)
    const [totalmarks, setTotalmarks] = useState(0)
    const [level, setLevel] = useState<string | null>(null)

    const questions = [
        {
            text: 'What is metadata, and how can it help detect fake news?',
            options: [
                { text: 'Hidden info like date/camera; discrepancies can reveal fakes', id: 'true' },
                { text: 'Page color', id: 'false' },
                { text: 'Number of comments', id: 'false' },
                { text: 'Ads', id: 'false' }
            ]
        },
        {
            text: 'Name a key feature to spot deepfake videos?',
            options: [
                { text: 'Natural blinking', id: 'false' },
                { text: 'Matching lips and sound', id: 'false' },
                { text: 'Unnatural blinking or glitchy faces', id: 'true' },
                { text: 'High resolution', id: 'false' }
            ]
        },
        {
            text: 'Why is it important to check the original source of a story?',
            options: [
                { text: 'To see how many ads are present', id: 'false' },
                { text: 'Real news comes from reputable agencies; social media sources may be fake', id: 'true' },
                { text: 'To add images', id: 'false' },
                { text: 'To shorten articles', id: 'false' }
            ]
        },
        {
            text: 'How can cross-language search help detect fake news?',
            options: [
                { text: 'If story not in major languages, it might be fake', id: 'true' },
                { text: 'Translation adds credibility', id: 'false' },
                { text: 'Only English matters', id: 'false' },
                { text: 'Social media posts always confirm it', id: 'false' }
            ]
        },
        {
            text: 'What does a consistency test involve?',
            options: [
                { text: 'Checking image colors', id: 'false' },
                { text: 'Comparing details like weather, shadows, and time', id: 'true' },
                { text: 'Reading only headlines', id: 'false' },
                { text: 'Counting words', id: 'false' }
            ]
        },
        {
            text: 'Why is expert analysis important for health or science news?',
            options: [
                { text: 'Only qualified professionals can confirm accuracy', id: 'true' },
                { text: 'Social media is enough', id: 'false' },
                { text: 'Clickbait is reliable', id: 'false' },
                { text: 'Experts are optional', id: 'false' }
            ]
        },
        {
            text: 'How does bot activity spread fake news?',
            options: [
                { text: 'Bots post identical messages quickly to create fake support', id: 'true' },
                { text: 'Real people post faster', id: 'false' },
                { text: 'Likes confirm truth', id: 'false' },
                { text: 'Bots only share verified news', id: 'false' }
            ]
        },
        {
            text: 'Why should you consider financial motives behind news?',
            options: [
                { text: 'Some fake news is created for profit or clicks', id: 'true' },
                { text: 'Ads improve credibility', id: 'false' },
                { text: 'Financial news is always fake', id: 'false' },
                { text: 'All news is free', id: 'false' }
            ]
        },
        {
            text: 'How can comparing small details in images help detect fake news?',
            options: [
                { text: 'Discrepancies in hands, shadows, or eyes reveal manipulation', id: 'true' },
                { text: 'Only headlines matter', id: 'false' },
                { text: 'Ads indicate truth', id: 'false' },
                { text: 'Fonts show accuracy', id: 'false' }
            ]
        },
        {
            text: 'How can blockchain verification help fight fake news?',
            options: [
                { text: 'Blockchain can prove authenticity of articles or images', id: 'true' },
                { text: 'Blockchain adds ads', id: 'false' },
                { text: 'It shortens articles', id: 'false' },
                { text: 'It changes headlines', id: 'false' }
            ]
        }
    ]

    const handleAnswer = (idx: number) => {
        const newAnswers = [...selectedAnswers]
        newAnswers[currentQuestion] = idx
        setSelectedAnswers(newAnswers)
    }

    const nextQuestion = () => {
        if (selectedAnswers[currentQuestion] === undefined) {
            alert('Please select an answer before proceeding!')
            return
        }
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1)
        } else {
            submitQuiz()
        }
    }

    const prevQuestion = () => {
        if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1)
    }

    const submitQuiz = () => {
        let score = 0
        selectedAnswers.forEach((selectedIdx, qIdx) => {
            if (questions[qIdx].options[selectedIdx].id === 'true') score += 40
        })
        setTotalmarks(score)

        if (score >= 290) setLevel('Expert')
        else if (score >= 240) setLevel('High')
        else if (score >= 180) setLevel('Good')
        else setLevel('Bad')

        setSubmited(true)
        // ✅ Store results in localStorage
        localStorage.setItem('HardNewsExamMarks', JSON.stringify({ score}))
    }

    const resetQuiz = () => {
        setCurrentQuestion(0)
        setSelectedAnswers([])
        setSubmited(false)
        setTotalmarks(0)
        setLevel(null)
    }

    const question = questions[currentQuestion]

    return (
        <div className='px-4 py-6'>
            {submited && (
                <div className='fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.8)] z-50'>
                    <div className='bg-white p-6 rounded-3xl w-[450px] text-center shadow-2xl shadow-black'>
                        <span
                            className='text-red-600 text-3xl font-bold cursor-pointer absolute top-4 right-6'
                            onClick={resetQuiz}
                        >
                            ⨉
                        </span>
                        <h2 className='text-3xl font-bold my-4 text-green-600'>🎉 Congratulations 🎉</h2>
                        <p className='my-2 text-lg'>You Have Successfully Completed The Test</p>
                        <p className='my-2 font-semibold'>Your Total Score: <span className='text-blue-600'>{totalmarks}</span></p>
                        <p className='my-2 font-semibold'>Your Level: 
                            <span className={`ml-2 ${level === 'Bad' ? 'text-red-500' : 'text-green-600'}`}>{level}</span>
                        </p>
                        <div className='mt-4 flex justify-between items-center w-full'>
                            <div>
                            <Button onClickFun={resetQuiz} name="Retry" />
                            </div>
                            <div>
                            <NavLink to="/exam">
                                <Button onClickFun={() => {}} name="Back to Home" />
                            </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <h2 className='w-full flex justify-center items-center text-center font-bold text-3xl mb-1 py-4 px-10'>Know About Fake News</h2>
            <div className='flex justify-between items-center mb-4'>
                <NavLink
                    to='/exam'
                    className='flex items-center gap-1 p-2 border-2 rounded-2xl hover:bg-white hover:text-black font-bold'
                >
                    <FaRegArrowAltCircleLeft /> Back
                </NavLink>
                <div className='flex gap-2 items-center justify-center'>
                    <span className='font-bold'>Level:</span>
                    <NavLink to='/EasyNewsExam' className='px-2 py-1 rounded-xl border-2 border-white bg-gray-500 text-white'>Easy</NavLink>
                    <NavLink to='/MidNewsExam' className='px-2 py-1 rounded-xl border-2 border-white bg-gray-500 text-white'>Mid</NavLink>
                    <NavLink to='/HardNewsExam' className='px-2 py-1 rounded-xl border-2 border-white bg-red-500 text-white'>Hard</NavLink>
                </div>
            </div>

            <div className='bg-cyan-700 p-6 rounded-2xl mb-4'>
                <h2 className='text-2xl font-bold text-amber-300'>Question {currentQuestion + 1}</h2>
                <p className='text-white text-lg mt-2'>{question.text}</p>
            </div>

            <div className='flex flex-col gap-4 mb-4'>
                {question.options.map((opt, idx) => (
                    <div
                        key={idx}
                        className={`flex items-center gap-2 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                            selectedAnswers[currentQuestion] === idx
                                ? 'bg-green-500 text-white'
                                : 'bg-white text-black hover:bg-green-200'
                        }`}
                        onClick={() => handleAnswer(idx)}
                    >
                        <input
                            type='radio'
                            checked={selectedAnswers[currentQuestion] === idx}
                            readOnly
                            className='mr-2'
                        />
                        <span>{String.fromCharCode(65 + idx)}: {opt.text}</span>
                    </div>
                ))}
            </div>

            <div className='flex justify-between w-full items-center'>
                <div>
                <Button onClickFun={prevQuestion} name="Previous" disabled={currentQuestion === 0} />
                </div>
                <div>
                <Button onClickFun={nextQuestion} name={currentQuestion === questions.length - 1 ? "Submit" : "Next"} />
                </div>
            </div>
        </div>
    )
}
