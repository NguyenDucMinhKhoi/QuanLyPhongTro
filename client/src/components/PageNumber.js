import React, { memo } from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom'

const notActive = 'w-[46px] h-[48px] flex justify-center items-center bg-white hover:bg-gray-300 rounded-md cursor-pointer'
const active = 'w-[46px] h-[48px] flex justify-center items-center bg-white bg-[#E13427] text-white hover:bg-gray-300 rounded-md cursor-pointer'

const PageNumber = ({ text, currentPage, icon, setCurrentPage, type }) => {
    const navigate = useNavigate()
    const handleChangePage = () => {
        setCurrentPage(+text)
        navigate({
            pathname: '/',
            search: createSearchParams({
                page: text
            }).toString()
        })
    }
    return (
        <div
            className={+text === +currentPage ? active : notActive}
            onClick={handleChangePage}
        >
            {icon || text}
        </div>
    )
}

export default memo(PageNumber)