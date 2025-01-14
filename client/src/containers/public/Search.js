import React, { useCallback, useState } from 'react'
import { SearchItem, Modal } from '../../components'
import icons from '../../utils/icons'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, createSearchParams } from 'react-router-dom'
import { path } from '../../utils/constant'

const { BsChevronRight, HiOutlineLocationMarker, TbReportMoney, RiCrop2Line, BsBuildings, FiSearch } = icons

const Search = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isShowModal, setIsShowModal] = useState(false)
  const [content, setContent] = useState([])
  const [name, setName] = useState('')
  const { provinces, acreages, prices, categories } = useSelector(state => state.app)
  const [queries, setQueries] = useState({})
  const [arrMinMax, setArrMinMax] = useState({})
  const [defaultText, setDefaultText] = useState('')

  const handleShowModal = (content, name, defaultText) => {
    setContent(content)
    setName(name)
    setDefaultText(defaultText)
    setIsShowModal(true)
  }
  const handleSubmit = useCallback((e, query, arrMaxMin) => {
    e.stopPropagation()
    setQueries(prev => ({ ...prev, ...query }))
    setIsShowModal(false)
    arrMaxMin && setArrMinMax(prev => ({ ...prev, ...arrMaxMin }))
  }, [isShowModal, queries])
  const handleSearch = () => {
    const queryCodes = Object.entries(queries).filter(item => item[0].includes('Code')).filter(item => item[1])
    let queryCodesObj = {}
    queryCodes.forEach(item => { queryCodesObj[item[0]] = item[1] })
    navigate({
      pathname: path.SEARCH,
      search: createSearchParams(queryCodesObj).toString()
    })
  }

  return (
    <>
      <div className='p-[10px] w-3/5 my-3 bg-[#febb02] rounded-lg flex-col lg:flex-row flex items-center justify-around gap-2'>
        <span onClick={() => handleShowModal(categories, 'category', 'Tìm tất cả')} className='cursor-pointer flex-1'>
          <SearchItem IconBefore={<BsBuildings />} frontWeight IconAfter={<BsChevronRight color='rgb(156, 163, 175)' />} text={queries.category} defaultText={'Tìm tất cả'} />
        </span>
        <span onClick={() => handleShowModal(provinces, 'province', 'Toàn quốc')} className='cursor-pointer flex-1'>
          <SearchItem IconBefore={<HiOutlineLocationMarker />} IconAfter={<BsChevronRight color='rgb(156, 163, 175)' />} text={queries.province} defaultText={'Toàn quốc'} />
        </span>
        <span onClick={() => handleShowModal(prices, 'price', 'Chọn giá')} className='cursor-pointer flex-1'>
          <SearchItem IconBefore={<TbReportMoney />} IconAfter={<BsChevronRight color='rgb(156, 163, 175)' />} text={queries.price} defaultText={'Chọn giá'} />
        </span>
        <span onClick={() => handleShowModal(acreages, 'acreage', 'Chọn diện tích')} className='cursor-pointer flex-1'>
          <SearchItem IconBefore={<RiCrop2Line />} IconAfter={<BsChevronRight color='rgb(156, 163, 175)' />} text={queries.acreage} defaultText={'Chọn diện tích'} />
        </span>
        <button
          type='button'
          onClick={handleSearch}
          className='outline-none py-2 px-4 flex-1 bg-secondary1 rounded-lg text-[13.3px] flex items-center justify-center gap-2 text-white font-medium'
        >
          <FiSearch />
          Tìm kiếm
        </button>
      </div>
      {isShowModal && <Modal
        handleSubmit={handleSubmit}
        queries={queries}
        arrMinMax={arrMinMax}
        content={content}
        name={name}
        defaultText={defaultText}
        setIsShowModal={setIsShowModal}
      />}
    </>
  )
}

export default Search