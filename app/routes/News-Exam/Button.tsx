
import React from 'react'

export default function Button({ onClickFun, name }) {
    return (
        <div className='p-4 flex items-center justify-end w-full pr-8'>
            <button className='border-3 border-amber-50 p-3 text-white px-7 rounded-3xl cursor-pointer font-bold text-[1.2rem] bg-yellow-400 hover:bg-green-800 hover:text-white' onClick={onClickFun}>{name}</button>
        </div>
    )
}
