import React, { useState } from 'react'

import { useForm, Controller } from 'react-hook-form'
import { Navigate, NavLink } from 'react-router-dom'

import eye from '../../assets/img/eyeIcon.svg'

import style from './registration.module.scss'

import { useAppDispatch, useAppSelector } from 's1-DAL/store'
import { registrationThunk } from 's2-BLL/authSlice'
import {
  appStatusSelector,
  CommonInput,
  emailCheck,
  isLoggedInSelector,
  SuperButton,
} from 's4-common'

type FormValues = {
  email: string
  password: string
  confirmPassword: string
}

export const Registration = () => {
  const isLoggedIn = useAppSelector(isLoggedInSelector)
  const appStatus = useAppSelector(appStatusSelector)

  const dispatch = useAppDispatch()
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>()

  const submitFunc = (data: FormValues) => {
    dispatch(registrationThunk({ email: data.email, password: data.password }))
  }

  const [isPass1Visible, setIsPass1Visible] = useState('password')

  const [isPass2Visible, setIsPass2Visible] = useState('password')

  const changePass1Visible = () => {
    if (isPass1Visible === 'password') {
      setIsPass1Visible('text')
    } else {
      setIsPass1Visible('password')
    }
  }

  const changePass2Visible = () => {
    if (isPass2Visible === 'password') {
      setIsPass2Visible('text')
    } else {
      setIsPass2Visible('password')
    }
  }

  if (isLoggedIn) {
    return <Navigate to={'/profile'} />
  }

  return (
    <div className={style.container}>
      <form className={style.form} onSubmit={handleSubmit(submitFunc)}>
        <h1 className={style.title}>Sign Up</h1>
        <Controller
          rules={{
            pattern: {
              value: emailCheck,
              message: 'Email is not valid',
            },
            required: 'Field is required',
            maxLength: { value: 30, message: 'Maximum length of email is 30 symbols' },
          }}
          control={control}
          name="email"
          render={({ field: { onChange } }) => (
            <div className={style.item}>
              <CommonInput
                autoComplete={'email'}
                onChange={onChange} // send value to hook form
                error={errors.email?.message}
                fieldname={'Email'}
              />
            </div>
          )}
        />
        <Controller
          rules={{
            minLength: { value: 6, message: 'Minimum length of password is 6 symbols' },
            required: 'Field is required',
            maxLength: { value: 30, message: 'Maximum length of password is 30 symbols' },
          }}
          control={control}
          name="password"
          render={({ field: { onChange } }) => (
            <div className={style.item}>
              <CommonInput
                autoComplete={'new-password'}
                onChange={onChange} // send value to hook form
                error={errors.password?.message}
                fieldname={'Password'}
                type={isPass1Visible}
              />
              <img
                onClick={changePass1Visible}
                className={style.eyeIcon}
                src={eye}
                alt={'show Password'}
              />
            </div>
          )}
        />
        <Controller
          rules={{
            required: 'Field is required',
            validate: (value, formValues) =>
              value === formValues.password || 'Passwords are not the same',
          }}
          control={control}
          name="confirmPassword"
          render={({ field: { onChange } }) => (
            <div className={style.item}>
              <CommonInput
                autoComplete={'new-password'}
                onChange={onChange}
                error={errors.confirmPassword?.message}
                fieldname={'Confirm Password'}
                type={isPass2Visible}
              />
              <img
                onClick={changePass2Visible}
                className={style.eyeIcon}
                src={eye}
                alt={'show Password'}
              />
            </div>
          )}
        />
        <SuperButton
          style={{ marginTop: '60px', letterSpacing: '0.01em', fontSize: '1.3rem' }}
          type="submit"
          disabled={appStatus === 'loading'}
        >
          Sign Up
        </SuperButton>
        <div className={style.divHaveAnAcc}>Already have an account?</div>
        <NavLink className={style.navLinkSignIn} to={'/login'}>
          Sign In
        </NavLink>
      </form>
    </div>
  )
}
