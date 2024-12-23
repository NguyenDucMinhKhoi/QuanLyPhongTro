import React from 'react'

const SubItem = ({title, price, image, createdAt}) => {
    return (
        <div className='w-full flex items-center gap-2 p-2 border-b border-gray-300 '>
            <img
                src='https://pt123.cdn.static123.com/images/thumbs/900x600/fit/2022/08/08/photo-2022-08-08-185454-result_1659959756.jpg'
                alt='ảnh'
                className='w-[65px] h-[65px] object-cover rounded-md'
            />
            <div className='w-full flex flex-col justify-between gap-1'>
                <h4 className='text-blue-600 text-[14px]'>{`${title?.slice(0,45)}...`}</h4>
                <div className='flex items-center justify-between w-full'>
                    <span className='text-sm font-medium text-green-500'>{price}</span>
                    <span className='text-sm text-gray-300'>{createdAt}</span>
                </div>
            </div>
        </div>
    )
}

export default SubItem