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
            text: 'How can checking references help detect fake news?',
            options: [
                { text: 'Fake news always uses real data', id: 'false' },
                { text: 'Real news cites studies or experts', id: 'true' },
                { text: 'References make articles longer', id: 'false' },
                { text: 'References are unnecessary', id: 'false' }
            ]
        },
        {
            text: 'What is the purpose of using reverse image search?',
            options: [
                { text: 'To check if a photo has been used before', id: 'true' },
                { text: 'To add filters to images', id: 'false' },
                { text: 'To resize images', id: 'false' },
                { text: 'To increase clicks', id: 'false' }
            ]
        },
        {
            text: 'Why are expert quotes important in a news story?',
            options: [
                { text: 'They make the story longer', id: 'false' },
                { text: 'Experts provide credibility', id: 'true' },
                { text: 'They confuse readers', id: 'false' },
                { text: 'They are optional', id: 'false' }
            ]
        },
        {
            text: 'What does checking the About Us page reveal?',
            options: [
                { text: 'Website speed', id: 'false' },
                { text: 'Ads quantity', id: 'false' },
                { text: 'Legitimacy and transparency', id: 'true' },
                { text: 'Image quality', id: 'false' }
            ]
        },
        {
            text: 'How do emotional triggers indicate fake news?',
            options: [
                { text: 'They make readers think logically', id: 'false' },
                { text: 'Fake news manipulates feelings to spread fast', id: 'true' },
                { text: 'They are always true', id: 'false' },
                { text: 'They are neutral', id: 'false' }
            ]
        },
        {
            text: 'Why should you use fact-checking sites?',
            options: [
                { text: 'They analyze and verify claims', id: 'true' },
                { text: 'They make news longer', id: 'false' },
                { text: 'They always report fake news', id: 'false' },
                { text: 'They add ads', id: 'false' }
            ]
        },
        {
            text: 'How can social media verification help detect fake news?',
            options: [
                { text: 'Verified accounts are more reliable', id: 'true' },
                { text: 'Unverified accounts are always true', id: 'false' },
                { text: 'Likes determine accuracy', id: 'false' },
                { text: 'Comments show truth', id: 'false' }
            ]
        },
        {
            text: 'Why are too many ads a warning sign?',
            options: [
                { text: 'It is visually appealing', id: 'false' },
                { text: 'Fake news sites focus on profit over accuracy', id: 'true' },
                { text: 'Real news never has ads', id: 'false' },
                { text: 'Ads improve reliability', id: 'false' }
            ]
        },
        {
            text: 'How can writing style indicate fake news?',
            options: [
                { text: 'Dramatic or emotional language may signal fake news', id: 'true' },
                { text: 'Long articles are always true', id: 'false' },
                { text: 'Headlines don’t matter', id: 'false' },
                { text: 'Images are more important', id: 'false' }
            ]
        },
        {
            text: 'What does asking "Who benefits?" reveal?',
            options: [
                { text: 'Hidden motives behind the story', id: 'true' },
                { text: 'Grammar issues', id: 'false' },
                { text: 'Source color scheme', id: 'false' },
                { text: 'Number of images', id: 'false' }
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
            if (questions[qIdx].options[selectedIdx].id === 'true') score += 30
        })
        setTotalmarks(score)

        if (score >= 290) setLevel('Expert')
        else if (score >= 240) setLevel('High')
        else if (score >= 180) setLevel('Good')
        else setLevel('Bad')

        setSubmited(true)
        // ✅ Store results in localStorage
        localStorage.setItem('MidNewsExamMarks', JSON.stringify({ score}))
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
                                    <Button onClickFun={() => { }} name="Back to Home" />
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <h2 className='w-full flex justify-center items-center text-center font-bold text-3xl mb-1  py-4 px-10'>Know About Fake News</h2>
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
                    <NavLink to='/MidNewsExam' className='px-2 py-1 rounded-xl border-2 border-white bg-yellow-500 text-white'>Mid</NavLink>
                    <NavLink to='/HardNewsExam' className='px-2 py-1 rounded-xl border-2 border-white bg-gray-500 text-white'>Hard</NavLink>
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
                        className={`flex items-center gap-2 p-4 rounded-2xl border-2 cursor-pointer transition-all ${selectedAnswers[currentQuestion] === idx
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
