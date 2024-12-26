import React, { useState } from 'react'
import { text } from "../../utils/constant";
import { Province, ItemSidebar, RelatedPost } from "../../components";
import { List, Pagination } from "./index";
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { formatVietnameseToString } from '../../utils/Common/formatVietnameseToString';

const Rental = () => {
  const { prices, acreages, categories } = useSelector(state => state.app)
  const [categoryCurrent, setCategoryCurrent] = useState({})
  const [categoryCode, setCategoryCode] = useState('none')
  const location = useLocation()

  useState(() => {
    const category = categories?.find(item => `/${formatVietnameseToString(item.value)}` === location.pathname)
    setCategoryCurrent(category)
    if (category)
      setCategoryCode(category.code)
  }, [location])

  return (
    <div className="w-full flex flex-col gap-3">
      <div>
        <h1 className="text-[28px] font-bold">{categoryCurrent?.header}</h1>
        <p className="text-base text-gray-700">{categoryCurrent?.subheader}</p>
      </div>
      <Province />
      <div className='w-full flex gap-4'>
        <div className='w-[70%]'>
          <List categoryCode={categoryCode} />
          <Pagination />
        </div>
        <div className='w-[30%] flex flex-col gap-4 justify-start items-center'>
          <ItemSidebar isDouble={true} type='priceCode' content={prices} title='Xem theo giá' />
          <ItemSidebar isDouble={true} content={acreages} type='acreageCode' title='Xem theo diện tích' />
          <RelatedPost />
        </div>
      </div>
    </div>
  )
}

export default Rental