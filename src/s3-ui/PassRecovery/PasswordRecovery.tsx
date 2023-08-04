import React, { useState } from 'react'

import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import { SubmitHandler, useForm } from 'react-hook-form'
import { NavLink, useNavigate } from 'react-router-dom'

import { PATH } from 'app/Routes/AppRoutes'
import { useAppDispatch, useAppSelector } from 's1-DAL/store'
import { getNewToken } from 's2-BLL/authSlice'
import s from 's3-ui/Login/Login.module.scss'
import { appStatusSelector, isSendedEmailSelector, SuperButton } from 's4-common'
import { boxCreatorStyle } from 's4-common/utils/boxCreatorStyle'

type PasswordRecoveryFormType = {
  email: string
}

export const PasswordRecovery = () => {
  const [email, setEmail] = useState('')
  const dispatch = useAppDispatch()
  const isSendedEmail = useAppSelector(isSendedEmailSelector)
  const appStatus = useAppSelector(appStatusSelector)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordRecoveryFormType>({ mode: 'onTouched' })
  const onSubmit: SubmitHandler<PasswordRecoveryFormType> = (data: PasswordRecoveryFormType) => {
    setEmail(data.email)
    dispatch(getNewToken(data.email))
  }

  if (isSendedEmail) {
    navigate(`${PATH.CHECK_EMAIL}/${email}`)
  }

  return (
    <Box sx={boxCreatorStyle(456)}>
      <Paper elevation={3}>
        <div className={s.paperContainer}>
          <h1 className={s.title}>Forgot your password?</h1>
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
            <div className={s.describe}>
              Enter your email address and we will send you further instructions
            </div>
            <SuperButton
              style={{
                borderRadius: '30px',
                background: '#366EFF',
                letterSpacing: '0.01em',
                fontSize: '1.3rem',
                width: '347px',
                marginTop: '66px',
              }}
              type="submit"
              disabled={appStatus === 'loading'}
            >
              Send instructions
            </SuperButton>
          </form>
          <div className={s.already}>Did you remember your password?</div>
          <NavLink to={'/login'} className={s.singUp}>
            Try logging in
          </NavLink>
        </div>
      </Paper>
    </Box>
  )
}
