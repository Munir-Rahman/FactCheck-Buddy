
import React, { useState } from 'react'
import FackNews_lessons from '../News-lessons/Easylesson';

export default function FackNews_lesson() {
  let [defaultt,setDefault] = useState(true);

  return (
    <div className='flex flex-col w-full gap-2.5'>
        {defaultt && <FackNews_lessons/>}
    </div>
  )
}
