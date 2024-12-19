import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { formatVietnameseToString } from '../../utils/Common/formatVietnameseToString'
import { apiGetCategories } from '../../services/category'

const notActive = 'hover:bg-secondary2 flex items-center h-full px-4 bg-secondary1'
const active = 'bg-secondary2 hover:bg-secondary2 flex items-center h-full px-4'

const Navigation = () => {

    const [categories, setCategories] = useState([])
    useEffect(() => {
        const fetchCategories = async () => {
            const response = await apiGetCategories()
            if (response?.data.err === 0) {
                setCategories(response.data.response)
            }
        }
        fetchCategories()
    }, [])
    return (
        <div className='w-full flex justify-center items-center h-[40px] bg-secondary1 text-white'>
            <div className='w-3/5 flex h-full items-center text-sm font-medium'>
                <NavLink
                    to={`/`}
                    className={({ isActive }) => isActive ? active : notActive}
                >
                    Trang chủ
                </NavLink>
                {categories?.length > 0 && categories.map(item => {
                    return (
                        <div key={item.code} className='flex justify-center items-center h-full'>
                            <NavLink
                                to={`/${formatVietnameseToString(item.value)}`}
                                className={({ isActive }) => isActive ? active : notActive}
                            >
                                {item.value}
                            </NavLink>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Navigation