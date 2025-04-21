import React from 'react'

const InputFormV2 = ({ label, unit }) => {
    return (
        <div>
            <label htmlFor='title' className="font-medium text-sm">{label}</label>
            <div className='flex items-center'>
                <input type="text" id="title" className={`${unit ? 'rounded-tl-md rounded-bl-md' : 'rounded-md'} outline-none border flex-auto border-gray-300 p-2`} />
                {unit && <span className='p-2 border flex-none w-16 flex items-center justify-center bg-gray-400 rounded-tr-md rounded-br-md'>{unit}</span>}
            </div>
        </div>
    )
}

export default InputFormV2