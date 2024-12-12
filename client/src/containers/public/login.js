import React, { useState, useEffect } from 'react'
import { InputFrom, Button } from '../../components'
// import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const Login = () => {
  const location = useLocation()

  const [isRegister, setIsRegister] = useState(location.state?.flag)
  useEffect(() => {
    setIsRegister(location.state?.flag)
  }, [location.state?.flag])

  return (
    <div className='login-container my-3 bg-white w-[600px] p-[30px] pb-[100px] rounded-md shadow-sm'>
      <h3 className='font-semibold text-2xl md-3'>{isRegister ? 'Sign up' : 'Login'}</h3>
      <div className='w-full flex flex-col gap-3'>
        {isRegister && <InputFrom label={'Full Name'} />}
        <InputFrom label={'Phone Number'} />
        <InputFrom label={'Password'} />
        <Button
          text={isRegister ? 'Sign up' : 'Login'}
          bgColor='bg-secondary1'
          textColor='text-white'
          fullWidth
        />
      </div>
      <div className='mt-7 flex items-center justify-between'>
        {isRegister
          ? <small> Already have an account? <span
            onClick={() => { setIsRegister(false) }}
            className='text-blue-500 hover:underline cursor-pointer'
          >
            Login now
          </span></small>
          : <>
            <small className='text-[blue] hover:text-[red] cursor-pointer'>Forgot your password?</small>
            <small
              onClick={() => { setIsRegister(true) }}
              className='text-[blue] hover:text-[red] cursor-pointer'
            >
              Sign up
            </small>
          </>
        }
      </div>
    </div>
  )
}

export default Login