import React, { useState, useEffect } from 'react'
import { InputFrom, Button } from '../../components'
import { useLocation, useNavigate } from 'react-router-dom'
import * as actions from '../../store/actions'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'

const Login = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoggedIn, msg, update } = useSelector(state => state.auth)
  const [isRegister, setIsRegister] = useState(location.state?.flag)
  const [invalidFields, setInvalidFields] = useState([])
  const [payload, setPayload] = useState({
    phone: '',
    password: '',
    name: ''
  })
  useEffect(() => {
    setIsRegister(location.state?.flag)
  }, [location.state?.flag])

  useEffect(() => {
    isLoggedIn && navigate('/')
  }, [isLoggedIn])

  useEffect(() => {
    msg && Swal.fire('Opps!', msg, 'error')
  }, [msg, update])

  const handleSubmit = async () => {
    let finalPayload = isRegister ? payload : {
      phone: payload.phone,
      password: payload.password
    }
    let invalids = validate(finalPayload)
    if (invalids === 0) isRegister ? dispatch(actions.register(payload)) : dispatch(actions.login(payload))
  }
  const validate = (payload) => {
    let invalids = 0
    let fields = Object.entries(payload)
    fields.forEach(item => {
      if (item[1] === '') {
        setInvalidFields(prev => [...prev, {
          name: item[0],
          message: 'You cannot leave this field blank.'
        }])
        invalids++
      }
    })
    fields.forEach(item => {
      switch (item[0]) {
        case 'password':
          if (item[1].length < 8) {
            setInvalidFields(prev => [...prev, {
              name: item[0],
              message: 'Password must be at least 8 characters.'
            }])
            invalids++
          }
          break;
        case 'phone':
          if (!+item[1]) {
            setInvalidFields(prev => [...prev, {
              name: item[0],
              message: 'Invalid phone number.'
            }])
            invalids++
          }
          break;

        default:
          break;
      }
    })
    return invalids
  }

  return (
    <div className='login-container my-3 bg-white w-[600px] p-[30px] pb-[100px] rounded-md shadow-sm'>
      <h3 className='font-semibold text-2xl md-3'>{isRegister ? 'Sign up' : 'Login'}</h3>
      <div className='w-full flex flex-col gap-3'>
        {isRegister && <InputFrom
          setInvalidFields={setInvalidFields}
          invalidFields={invalidFields}
          label={'Full Name'}
          value={payload.name}
          setValue={setPayload}
          keyPayload={'name'}
        />}
        <InputFrom
          setInvalidFields={setInvalidFields}
          invalidFields={invalidFields}
          label={'Phone Number'}
          value={payload.phone}
          setValue={setPayload}
          keyPayload={'phone'}
        />
        <InputFrom
          setInvalidFields={setInvalidFields}
          invalidFields={invalidFields}
          label={'Password'}
          value={payload.password}
          setValue={setPayload}
          keyPayload={'password'}
          type={'password'}
        />
        <Button
          text={isRegister ? 'Sign up' : 'Login'}
          bgColor='bg-secondary1'
          textColor='text-white'
          fullWidth
          onClick={handleSubmit}

        />
      </div>
      <div className='mt-7 flex items-center justify-between'>
        {isRegister
          ? <small> Already have an account? <span
            onClick={() => {
              setIsRegister(false)
              setPayload({
                phone: '',
                password: '',
                name: ''
              })
            }}
            className='text-blue-500 hover:underline cursor-pointer'
          >
            Login now
          </span></small>
          : <>
            <small className='text-[blue] hover:text-[red] cursor-pointer'>Forgot your password?</small>
            <small
              onClick={() => {
                setIsRegister(true)
                setPayload({
                  phone: '',
                  password: '',
                  name: ''
                })
              }}
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