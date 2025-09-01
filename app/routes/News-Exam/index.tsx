import React, { useState } from 'react'
import { NavLink } from "react-router"
import FackNews_Exams from './EasyNews-Exam';

export default function LessonsMenu() {
    const [defaultt, setdefault] = useState(true);

    return (
        <div className=''>
                {defaultt && <FackNews_Exams/>}
        </div>
    )
}