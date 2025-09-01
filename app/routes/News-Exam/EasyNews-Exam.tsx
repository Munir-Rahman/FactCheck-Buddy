import React, { useState } from 'react'
import { NavLink } from 'react-router'
import { FaRegArrowAltCircleLeft } from 'react-icons/fa'
import Button from './Button'

export default function FakeNewsExams() {
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]) // store selected option index
    const [submited, setSubmited] = useState(false)
    const [totalmarks, setTotalmarks] = useState(0)
    const [level, setLevel] = useState<string | null>(null)

    const questions = [
        {
            text: 'What should you check first to see if a news source is trustworthy?',
            options: [
                { text: 'The website’s color scheme', id: 'false' },
                { text: 'The source name and reliability', id: 'true' },
                { text: 'How many ads it has', id: 'false' },
                { text: 'The number of images', id: 'false' }
            ]
        },
        {
            text: 'How can you tell if a website URL might be fake?',
            options: [
                { text: 'It uses https', id: 'false' },
                { text: 'It is easy to read', id: 'false' },
                { text: 'Misspellings, extra words, or unusual domains', id: 'true' },
                { text: 'It has images', id: 'false' }
            ]
        },
        {
            text: 'Why are sensational headlines a warning sign of fake news?',
            options: [
                { text: 'They make you curious', id: 'false' },
                { text: 'Fake news uses shocking or exaggerated titles', id: 'true' },
                { text: 'They always contain videos', id: 'false' },
                { text: 'They are written by professionals', id: 'false' }
            ]
        },
        {
            text: 'What does poor grammar or spelling in an article indicate?',
            options: [
                { text: 'It may indicate the article is fake', id: 'true' },
                { text: 'It is reliable', id: 'false' },
                { text: 'It has expert quotes', id: 'false' },
                { text: 'It is short', id: 'false' }
            ]
        },
        {
            text: 'Why is checking the date and time of a news story important?',
            options: [
                { text: 'To see how long the article is', id: 'false' },
                { text: 'Fake news sometimes recycles old events', id: 'true' },
                { text: 'To count images', id: 'false' },
                { text: 'To check grammar', id: 'false' }
            ]
        },
        {
            text: 'What does writing in all caps usually suggest in a news article?',
            options: [
                { text: 'Professional reporting', id: 'false' },
                { text: 'Clickbait or fake news', id: 'true' },
                { text: 'Accurate data', id: 'false' },
                { text: 'Neutral tone', id: 'false' }
            ]
        },
        {
            text: 'What should you do if an image in a news article looks strange or unrelated?',
            options: [
                { text: 'Ignore it', id: 'false' },
                { text: 'Share it', id: 'false' },
                { text: 'Verify it; it may be fake', id: 'true' },
                { text: 'Only read the headline', id: 'false' }
            ]
        },
        {
            text: 'Why is the presence of an author important?',
            options: [
                { text: 'Adds credibility', id: 'true' },
                { text: 'Shows page design', id: 'false' },
                { text: 'Increases ads', id: 'false' },
                { text: 'Makes it shorter', id: 'false' }
            ]
        },
        {
            text: 'What does "too good or too bad to be true" indicate?',
            options: [
                { text: 'It is likely fake', id: 'true' },
                { text: 'It is entertaining', id: 'false' },
                { text: 'It is reliable', id: 'false' },
                { text: 'It has expert quotes', id: 'false' }
            ]
        },
        {
            text: 'Why is it important to cross-check headlines?',
            options: [
                { text: 'To see if other sources report the same story', id: 'true' },
                { text: 'To find ads', id: 'false' },
                { text: 'To check grammar', id: 'false' },
                { text: 'To read the images', id: 'false' }
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
        localStorage.setItem('EasyNewsExamMarks', JSON.stringify({ score}))
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

            <h2 className='w-full flex justify-center items-center text-center font-bold text-3xl mb-1  py-4 px-10'>Fake News Exam</h2>
            <div className='flex justify-between items-center mb-4'>
                <NavLink
                    to='/exam'
                    className='flex items-center gap-1 p-2 border-2 rounded-2xl hover:bg-white hover:text-black font-bold'
                >
                    <FaRegArrowAltCircleLeft /> Back
                </NavLink>
                <div className='flex gap-2 items-center justify-center'>
                    <span className='font-bold'>Level:</span>
                    <NavLink to='/EasyNewsExam' className={`px-2 py-1 rounded-xl border-2 border-white bg-blue-500 text-white hover:bg-blue-500 hover:text-white`}>Easy</NavLink>
                    <NavLink to='/MidNewsExam' className={`px-2 py-1 rounded-xl border-2 border-white bg-gray-500 text-white hover:bg-yellow-500 hover:text-white`}>Mid</NavLink>
                    <NavLink to='/MidNewsExam' className={`px-2 py-1 rounded-xl border-2 border-white bg-gray-500 text-white hover:bg-red-500 hover:text-white`}>Hard</NavLink>
                </div>
            </div>

            {/* Current Question */}
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
