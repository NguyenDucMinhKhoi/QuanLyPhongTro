import React, { useState, useEffect } from 'react';
import icons from '../utils/icons'

const { GrLinkPrevious } = icons

const Modal = ({ setIsShowModal, content, name }) => {
    const [persent1, setPersent1] = useState(0)
    const [persent2, setPersent2] = useState(100)

    useEffect(() => {
        const activedTrackEl = document.getElementById('track-active')
        if (persent2 <= persent1) {
            activedTrackEl.style.left = `${persent2}%`
            activedTrackEl.style.right = `${100 - persent1}%`
        } else {
            activedTrackEl.style.left = `${persent1}%`
            activedTrackEl.style.right = `${100 - persent2}%`
        }
    }, [persent1, persent2])

    return (
        <div onClick={() => { setIsShowModal(false) }}
            className='fixed top-0 left-0 right-0 bottom-0 bg-overlay-70 z-20 flex justify-center items-center'
        >
            <div onClick={(e) => {
                e.stopPropagation()
                setIsShowModal(true)
            }}
                className='w-1/3 bg-white rounded-md'
            >
                <div className='h-[45px] px-4 flex items-center border-b border-gray-100'>
                    <span onClick={(e) => {
                        e.stopPropagation()
                        setIsShowModal(false)
                    }}
                        className='cursor-pointer'
                    >
                        <GrLinkPrevious size={24} />
                    </span>
                </div>
                {(name === 'category' || name === 'province') && <div className='p-4 flex flex-col'>
                    {content?.map(item => {
                        return (
                            <span key={item.code} className='py-2 flex gap-2 items-center border-b border-gray-200'>
                                <input className='cursor-pointer' type='radio' name={name} value={item.code} />
                                <label htmlFor={item.code}>{item.value}</label>
                            </span>
                        )
                    })}
                </div>}
                {(name === 'price' || name === 'acreage') && <div className='p-12'>
                    <div className='flex flex-col items-center justify-center relative'>
                        <div className='slider-track h-[5px] w-full absolute top-0 bottom-0 bg-gray-300 rounded-full'></div>
                        <div id='track-active' className='slider-track-active h-[5px] absolute top-0 bottom-0 bg-orange-500 rounded-full'></div>
                        <input
                            max='100'
                            min='0'
                            step='5'
                            type='range'
                            value={persent1}
                            className='w-full appearence-none pointer-events-none absolute top-0 bottom-0'
                            onChange={(e) => setPersent1(+e.target.value)}
                        />
                        <input
                            max='100'
                            min='0'
                            step='5'
                            type='range'
                            value={persent2}
                            onChange={(e) => setPersent2(+e.target.value)}
                            className='w-full appearence-none pointer-events-none absolute top-0 bottom-0'
                        />
                    </div>
                </div>
                }
            </div>
        </div>
    )
}

export default Modal