import React, { useEffect, useState } from 'react'
import { Select, InputFormV2 } from './'
import { useSelector, useDispatch } from 'react-redux'
import { getCategories } from '../store/actions/app'

const Overview = () => {
  const dispatch = useDispatch()
  const { categories } = useSelector(state => state.app)
  const [selectedCategory, setSelectedCategory] = useState('')
  const { currentData } = useSelector(state => state.user)
  const [selectedTarget, setSelectedTarget] = useState('')

  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])

  const targets = [
    { code: 'male', value: 'Nam' },
    { code: 'female', value: 'Nữ' },
    { code: 'other', value: 'Không xác định' }
  ]

  console.log(targets); // Kiểm tra giá trị của targets

  const handleChangeCategory = (e) => {
    const { value } = e.target
    setSelectedCategory(value)
  }

  const handleChangeTarget = (e) => {
    const { value } = e.target
    setSelectedTarget(value)
  }

  return (
    <div>
      <h2 className="font-semibold text-xl py-4">Thông tin mô tả</h2>
      <div className='w-full flex flex-col gap-4'>
        <div className='w-1/2'>
          <Select
            options={categories}
            label="Loại chuyên mục"
            value={selectedCategory}
            onChange={handleChangeCategory}
            nameKey="value"
            valueKey="code"
          />
        </div>
        <InputFormV2 label="Tiêu đề" keyPayload="title" />
        <div className='flex flex-col gap-2'>
          <label htmlFor="desc" className="font-medium text-sm">Nội dung mô tả</label>
          <textarea id="desc" cols={30} rows={10} className='w-full rounded-md outline-none border border-gray-300 p-2' />
        </div>
        <div className='w-1/2 flex flex-col gap-4'>
          <label htmlFor="name" className="font-medium text-sm">Thông tin liên hệ:</label>
          <input
            type="text"
            id="name"
            readOnly
            className="border border-gray-200 rounded-md p-2 w-full outline-none bg-gray-50"
            value={currentData?.name || currentData?.username || ''}
            placeholder="Thông tin liên hệ"
          />
          <label htmlFor="phone" className="font-medium text-sm">Điện thoại:</label>
          <input
            type="text"
            id="phone"
            readOnly
            className="border border-gray-200 rounded-md p-2 w-full outline-none bg-gray-50"
            value={currentData?.phone || ''}
            placeholder="Số điện thoại"
          />
          <InputFormV2 label="Giá cho thuê" unit="đồng" />
          <InputFormV2 label="Diện tích" unit="m2" />
          <Select
            options={targets}
            label="Đối tượng cho thuê"
            value={selectedTarget}
            onChange={handleChangeTarget}
            nameKey="value"
            valueKey="code"
            id="target-select"
          />
        </div>
      </div>
    </div>
  )
}

export default Overview