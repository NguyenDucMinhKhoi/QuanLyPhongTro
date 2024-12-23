import React from 'react'
import { SubItem } from './index'

const RelatedPost = () => {
    return (
        <div className='w-full bg-white rounded-md p-4'>
            <h3 className='font-semibold text-lg mb-4'>Tin mới đăng</h3>
            <div className='w-full flex flex-col gap-2'>
                <SubItem/>
                <SubItem/>
                <SubItem/>
            </div>
        </div>
    )
}

export default RelatedPost