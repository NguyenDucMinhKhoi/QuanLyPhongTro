import React, { useCallback } from 'react'
import logo from '../../Assets/LogoHome.png'
import { Button } from '../../components'
import icons from '../../utils/icons'
import { useNavigate } from 'react-router-dom'
import { path } from '../../utils/constant'

const { AiOutlinePlusCircle } = icons

const Header = () => {
  const navigate = useNavigate()
  const goLoin = useCallback(() => {
    navigate(path.LOGIN)
  })

  return (
    <div className="w-1100">
      <div className='w-full flex items-center justify-between'>
        <img
          src={logo}
          alt='logo'
          className='w-[60px] h-[60px] object-contain'
        />
        <div className='flex items-center gap-1'>
          <small>Hello!</small>
          <Button
            text={'Login'}
            textColor='text-white'
            bgColor='bg-[#3961fb]'
            onClick={goLoin}
          />
          <Button
            text={'Sign up'}
            textColor='text-white'
            bgColor='bg-[#3961fb]'
            onClick={goLoin}
          />
          <Button
            text={'Post new news'} textColor='text-white' bgColor='bg-secondary2'
            IcAfter={AiOutlinePlusCircle}
          />
        </div>
      </div>
    </div>
  )
}

export default Header