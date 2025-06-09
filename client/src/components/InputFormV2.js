import React from 'react'

const InputFormV2 = ({ label, unit, value, onChange, name, small }) => {
    return (
        <div>
            <div className='flex'>
                <label htmlFor={name} className="font-medium text-sm">{label}</label>
                <span className='text-red-500'>(*)</span>
            </div>
            <div className='flex items-center'>
                <input
                    type="text"
                    id={name}
                    className={`${unit ? 'rounded-tl-md rounded-bl-md' : 'rounded-md'} outline-none border flex-auto border-gray-300 p-2`}
                    value={value}
                    onChange={onChange}
                />
                {unit && <span className='p-2 border flex-none w-16 flex items-center justify-center bg-gray-400 rounded-tr-md rounded-br-md'>{unit}</span>}
            </div>
            {small && <small className='opacity-70'>{small}</small>}
        </div>
    )
}

export default InputFormV2