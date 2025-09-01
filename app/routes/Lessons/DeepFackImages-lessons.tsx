
import React, { useState } from 'react'
import { NavLink } from 'react-router'
import { FaRegArrowAltCircleLeft } from 'react-icons/fa'
import DeepFack_imagess from '../Image-lessons/EasyImage';

export default function FackNews_lesson() {
    let [defaultt, setDefaultt] = useState(true);

    return (
        <div className='flex flex-col justify-center items-center gap-2.5'>
            {defaultt && <DeepFack_imagess />}
        </div>
    )
}
