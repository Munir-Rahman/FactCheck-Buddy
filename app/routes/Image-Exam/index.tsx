import React, { useState } from 'react'
import { NavLink } from "react-router"
import FackImage_Exams from './EasyImage-Exam';

export default function LessonsMenu() {
    const [defaultt, setdefault] = useState(true);

    return (
        <div>
                {defaultt && <FackImage_Exams/>}
        </div>
    )
}
