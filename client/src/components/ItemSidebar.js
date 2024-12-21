import React, { memo } from "react";
import icons from "../utils/icons";

// Ví dụ arr_1 = [1, 2, 3, 4]
// Ví dụ arr_2 = [5, 6, 7, 8] 
/**
[
    {
        left: 34,
        right: fdf
    }
]
 */

const { GrNext } = icons

const ItemSidebar = ({ content, title, isDouble }) => {

    const formatContent = () => {
        const oddEl = content?.filter((item, index) => index % 2 !== 0);
        const evenEl = content?.filter((item, index) => index % 2 === 0);
        const formatContent = oddEl?.map((item, index) => {
            return {
                right: item,
                left: evenEl?.find((item2, index2) => index2 === index)
            }
        })
        return formatContent
    }

    return (
        <div className='p-4 rounded-md bg-white w-full'>
            <h3 className='text-lg font-semibold mb-4'>{title}</h3>
            {!isDouble && <div className='flex flex-col gap-2'>
                {content?.length > 0 && content.map(item => {
                    return (
                        <div key={item.code} className='flex gap-2 items-center cursor-pointer hover:text-orange-600 border-b border-gray-200 pb-1 border-dashed'>
                            <GrNext size={10} color="#ccc" />
                            <p>{item.value}</p>
                        </div>
                    )
                })}
            </div>}
            {isDouble && <div className='flex flex-col gap-2'>
                {content?.length > 0 && formatContent(content).map((item, index) => {
                    return (
                        <div key={index} className=''>
                            <div className='flex items-center justify-around'>
                                <div className='flex flex-1 gap-2 items-center cursor-pointer hover:text-orange-600 border-b border-gray-200 pd-1 border-dashed'>
                                    <GrNext size={10} color="#ccc" />
                                    <p>{item.left.value}</p>
                                </div>
                                <div className='flex flex-1 gap-2 items-center cursor-pointer hover:text-orange-600 border-b border-gray-200 pd-1 border-dashed'>
                                    <GrNext size={10} color="#ccc" />
                                    <p>{item.right.value}</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>}
        </div>
    );
};

export default memo(ItemSidebar);
