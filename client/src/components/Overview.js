import React, { useEffect, useState } from 'react'
import { Select, InputFormV2 } from './'
import { useSelector, useDispatch } from 'react-redux'
import { getCategories } from '../store/actions/app'

const Overview = ({ payload, onChangePayload, errors }) => {
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

  const handleChangeCategory = (e) => {
    const { value } = e.target
    setSelectedCategory(value)
    onChangePayload('categoryCode', value)
  }

  const handleChangeTarget = (e) => {
    const { value } = e.target
    setSelectedTarget(value)
    onChangePayload('target', value)
  }

  const handleChange = (key, value) => {
    onChangePayload(key, value)
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
            error={errors.categoryCode}
          />
        </div>
        <InputFormV2
          label="Tiêu đề"
          value={payload.title}
          onChange={(e) => handleChange('title', e.target.value)}
          name="title"
          error={errors.title}
        />
        <div className='flex flex-col gap-2'>
          <div className='flex'>
            <label htmlFor="desc" className="font-medium text-sm">Nội dung mô tả</label>
            <span className='text-red-500'>(*)</span>
          </div>
          <textarea
            id="desc"
            cols={30}
            rows={10}
            className={`w-full rounded-md outline-none border p-2 ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
            value={payload.description}
            onChange={(e) => handleChange('description', e.target.value)}
          />
          {errors.description && (
            <span className="text-red-500 text-sm">{errors.description}</span>
          )}
        </div>
        <div className='w-1/2 flex flex-col gap-4'>
          <div className='flex'>
            <label htmlFor="name" className="font-medium text-sm">Thông tin liên hệ:</label>
            <span className='text-red-500'>(*)</span>
          </div>
          <input
            type="text"
            id="name"
            readOnly
            className="border border-gray-200 rounded-md p-2 w-full outline-none bg-gray-50"
            value={currentData?.name || currentData?.username || ''}
            placeholder="Thông tin liên hệ"
          />
          <div className='flex'>
            <label htmlFor="phone" className="font-medium text-sm">Điện thoại:</label>
            <span className='text-red-500'>(*)</span>
          </div>
          <input
            type="text"
            id="phone"
            readOnly
            className="border border-gray-200 rounded-md p-2 w-full outline-none bg-gray-50"
            value={currentData?.phone || ''}
            placeholder="Số điện thoại"
          />
          <InputFormV2
            label="Giá cho thuê"
            unit="đồng"
            value={payload.priceNumber}
            onChange={(e) => handleChange('priceNumber', e.target.value)}
            name="priceNumber"
            error={errors.priceNumber}
          />
          <InputFormV2
            label="Diện tích"
            unit="m2"
            value={payload.acreageNumber}
            onChange={(e) => handleChange('acreageNumber', e.target.value)}
            name="acreageNumber"
            error={errors.acreageNumber}
          />
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