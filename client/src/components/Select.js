import React, { memo } from 'react'

const Select = ({
  label,
  options = [],
  value,
  onChange,
  disabled,
  isLoading,
  id,
  nameKey = 'name',
  valueKey = 'code',
  placeholder
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value || ''}
          onChange={onChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none"
          disabled={disabled || isLoading}
        >
          <option value="">{placeholder || `Chọn ${label}`}</option>
          {options?.map((item) => (
            <option 
              key={item[valueKey]} 
              value={item[valueKey]}
            >
              {item[nameKey]}
            </option>
          ))}
        </select>
        {isLoading && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-500" />
          </div>
        )}
      </div>
    </div>
  )
}

export default memo(Select)