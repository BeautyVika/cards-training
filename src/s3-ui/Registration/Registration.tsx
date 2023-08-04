import React from 'react'

import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Navigate, NavLink } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from 's1-DAL/store'
import { registrationThunk } from 's2-BLL/authSlice'
import s from 's3-ui/Login/Login.module.scss'
import { appStatusSelector, isLoggedInSelector, PasswordInput, SuperButton } from 's4-common'
import { boxCreatorStyle } from 's4-common/utils/boxCreatorStyle'

type RegistrationType = {
  email: string
  password: string
  confirmPassword: string
}

export const Registration = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(isLoggedInSelector)
  const appStatus = useAppSelector(appStatusSelector)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationType>({ mode: 'onTouched' })
  const onSubmit: SubmitHandler<RegistrationType> = (data: RegistrationType) => {
    dispatch(registrationThunk({ email: data.email, password: data.password }))
  }

  if (isLoggedIn) {
    return <Navigate to={'/profile'} />
  }

  return (
    <Box sx={boxCreatorStyle(528)}>
      <Paper elevation={3}>
        <div className={s.paperContainer}>
          <h1 className={s.title}>Sign Up</h1>
          <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
            <TextField
              sx={{ m: 1, width: '347px' }}
              id="email"
              label="Email"
              variant="standard"
              margin="normal"
              error={!!errors.email}
              helperText={errors.email?.message}
              {...register('email', { required: 'Email is a required field!' })}
            />
            <PasswordInput id="password" register={register} error={errors.password} />
            <PasswordInput
              id="confirmPassword"
              error={errors.confirmPassword}
              register={register}
            />
            <SuperButton
              style={{
                marginTop: '60px',
                letterSpacing: '0.01em',
                fontSize: '1.3rem',
                width: '347px',
              }}
              type="submit"
              disabled={appStatus === 'loading'}
            >
              Sign Up
            </SuperButton>
          </form>
          <div className={s.already}>Already have an account?</div>
          <NavLink to={'/login'} className={s.singUp}>
            Sing In
          </NavLink>
        </div>
      </Paper>
    </Box>
  )
}
