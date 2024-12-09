import React from 'react'
import { InputFrom, Button } from '../../components'

const Login = () => {
  return (
    <div className='login-container my-3 bg-white w-[600px] p-[30px] pb-[100px] rounded-md shadow-sm'>
      <h3 className='font-semibold text-2xl md-3'>Login</h3>
      <div className='w-full flex flex-col gap-3'>
        <InputFrom label={'Phone Number'} />
        <InputFrom label={'Password'} />
        <Button
          text='Login'
          bgColor='bg-secondary1'
          textColor='text-white'
          fullWidth
        />
      </div>
      <div className='mt-7 flex items-center justify-between'>
        <small className='text-[blue] hover:text-[red] cursor-pointer'>Forgot your password?</small>
        <small className='text-[blue] hover:text-[red] cursor-pointer'>Sign up</small>
      </div>
    </div>
  )
}

export default Login