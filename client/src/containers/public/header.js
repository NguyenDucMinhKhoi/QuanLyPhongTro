import React, { useCallback } from 'react'
import logo from '../../Assets/LogoHome.png'
import { Button } from '../../components'
import icons from '../../utils/icons'
import { useNavigate, Link } from 'react-router-dom'
import { path } from '../../utils/constant'

const { AiOutlinePlusCircle } = icons

const Header = () => {
  const navigate = useNavigate()
  const goLogin = useCallback((flag) => {
    navigate(path.LOGIN, { state: { flag } })
  }, [])

  return (
    <div className="w-1100">
      <div className='w-full flex items-center justify-between'>
        <Link to={'/'}>
          <img
            src={logo}
            alt='logo'
            className='w-[60px] h-[60px] object-contain'
          />
        </Link>
        <div className='flex items-center gap-1'>
          <small>Hello!</small>
          <Button
            text={'Login'}
            textColor='text-white'
            bgColor='bg-[#3961fb]'
            onClick={() => goLogin(false)}
          />
          <Button
            text={'Sign up'}
            textColor='text-white'
            bgColor='bg-[#3961fb]'
            onClick={() => goLogin(true)}
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