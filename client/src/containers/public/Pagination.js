import React, { useEffect, useState } from 'react';
import { PageNumber } from '../../components'
import { useSelector } from 'react-redux'
import icons from '../../utils/icons'

const { HiChevronDoubleRight, HiChevronDoubleLeft } = icons
const arrNumber = [1, 2, 3]

const Pagination = ({ number }) => {
    const { count, posts } = useSelector(state => state.post)
    const [arrPage, setArrPage] = useState([])
    const [currentPage, setCurrentPage] = useState(+number)
    const [isHideEnd, setIsHideEnd] = useState(false)
    const [isHideStart, setIsHideStart] = useState(false)

    useEffect(() => {
        let maxPage = Math.floor(count / posts.length)
        let end = (currentPage + 1) > maxPage ? maxPage : (currentPage + 1)
        let start = (currentPage - 1) <= 0 ? 1 : (currentPage - 1)
        let temp = []
        for (let i = start; i <= end; i++) temp.push(i)
        setArrPage(temp)
        currentPage >= (maxPage - 1) ? setIsHideEnd(true) : setIsHideEnd(false)
        currentPage <= 2 ? setIsHideStart(true) : setIsHideStart(false)
    }, [count, posts, currentPage])

    return (
        <div className='flex items-center justify-center gap-2 py-5'>
            {!isHideEnd && <PageNumber icon={<HiChevronDoubleLeft />} setCurrentPage={setCurrentPage} text={1} />}
            {!isHideEnd && <PageNumber text={'...'} />}
            {arrNumber.length > 0 && arrNumber.map(item => {
                return (
                    <PageNumber
                        key={item}
                        text={item}
                        setCurrentPage={setCurrentPage}
                        currentPage={currentPage}
                    />
                )
            })}
            {!isHideEnd && <PageNumber text={'...'} />}
            {!isHideEnd && <PageNumber icon={<HiChevronDoubleRight />} setCurrentPage={setCurrentPage} text={Math.floor(count / posts.length)} type='end' />}
        </div>
    )
}

export default Pagination