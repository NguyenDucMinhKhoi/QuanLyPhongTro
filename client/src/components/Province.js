import React from 'react'
import { ProvinceBtn } from './index'
import { location } from '../utils/constant'

const Province = () => {
  return (
    <div className='flex items-center gap-5 justify-center py-5 text-sm'>
        {location.map(item => {
          return (
            <ProvinceBtn
              key={item.id}
              image={item.image}
              name={item.name}
            />
          )
        })}
      </div>
  )
}

export default Province