import React, { memo } from 'react'
import icons from '../utils/icons'

const images = [
    "https://pt123.cdn.static123.com/images/thumbs/900x600/fit/2022/07/19/6310726d-d075-4e35-b1cb-cf5616bf5212_1658240491.jpg",
    "https://pt123.cdn.static123.com/images/thumbs/900x600/fit/2022/07/19/9c60836e-26b2-4737-a6c8-60cb5187fa4c_1658240485.jpg",
    "https://pt123.cdn.static123.com/images/thumbs/900x600/fit/2022/07/19/716c753e-8e03-4cc8-9d09-e52ec19ce01b_1658240485.jpg",
    "https://pt123.cdn.static123.com/images/thumbs/900x600/fit/2022/07/19/9c60836e-26b2-4737-a6c8-60cb5187fa4c_1658240485.jpg"
]

const { GrStar, RiHeartFill, RiHeartLine, BsBookmarkStarFill } = icons

const Item = () => {
    return (
        <div className='w-full flex border-t border-orange-600 p-4'>
            <div className='w-2/5 flex flex-wrap gap-[2px] items-center' >
                <img src={images[0]} alt="preview" className='w-[120px] h-[100px] object-cover' />
                <img src={images[1]} alt="preview" className='w-[120px] h-[100px] object-cover' />
                <img src={images[2]} alt="preview" className='w-[120px] h-[100px] object-cover' />
                <img src={images[3]} alt="preview" className='w-[120px] h-[100px] object-cover' />
            </div>
            <div className='w-3/5'>
                <div className='flex justify-between gap-4 w-full'>
                    <div className='text-red-600 font-medium'>
                        <GrStar className='star-item' size={18} color='yellow' />
                        <GrStar className='star-item' size={18} color='yellow' />
                        <GrStar className='star-item' size={18} color='yellow' />
                        <GrStar className='star-item' size={18} color='yellow' />
                        <GrStar className='star-item' size={18} color='yellow' />
                        CHO THUÊ CĂN HỘ HOẶC VĂN PHÒNG LÀM VIỆC
                    </div>
                    <div className='w-[10%] flex justify-end'>
                        <BsBookmarkStarFill size={24} color='orange' />
                    </div>
                </div>
                <div className='my-2 flex items-center justify-between'>
                    <span className='font-bold text-green-600'>3.7 triệu/tháng</span>
                    <span>28m²</span>
                    <span>Quận Tân Bình, Hồ Chí Minh</span>
                </div>
                <p className='text-gray-500'>
                    CĂN HỘ CAO CẤP ĐƯỜNG CỘNG HÒAĐặc điểm: + Nội thất: Máy lạnh, máy giặt, giường, bàn trang điểm, máy nóng lạnh. + Giờ giấc tự do, phòng sạch...
                </p>
                <div className='flex items-center my-5 justify-between'>
                    <div className='flex items-center'>
                        <img src="https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2281862025.jpg" alt="avatar" className='w-[30px] h-[30px] object-cover rounded-full' />
                        <p>DogMyx</p>
                    </div>
                    <div className='flex items-center gap-1'>
                        <button
                            type='button'
                            className='bg-blue-700 text-white p-1 rounded-md'
                        >
                            Gọi 0774455916
                        </button>
                        <button
                            type='button'
                            className='text-blue-700 p-1 rounded-md border border-blue-700'
                        >
                            Nhắn Zalo
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(Item)