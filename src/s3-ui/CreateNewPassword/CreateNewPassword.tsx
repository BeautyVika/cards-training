import React from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Navigate, useParams } from 'react-router-dom'

import s from './CreateNewPassword.module.scss'

import { PATH } from 'app/Routes/AppRoutes'
import { useAppDispatch, useAppSelector } from 's1-DAL/store'
import { createNewPassword } from 's2-BLL/authSlice'
import { appStatusSelector, isCreateNewPasswordSelector, PasswordInput } from 's4-common'

type NewPasswordType = {
  password: string
}

export const CreateNewPassword = () => {
  const dispatch = useAppDispatch()
  const isCreateNewPassword = useAppSelector(isCreateNewPasswordSelector)
  const appStatus = useAppSelector(appStatusSelector)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewPasswordType>({ mode: 'onTouched' })

  const { token } = useParams<{ token: string }>()

  const onSubmit: SubmitHandler<NewPasswordType> = data => {
    if (token) {
      dispatch(createNewPassword({ password: data.password, resetPasswordToken: token }))
    }
  }

  if (isCreateNewPassword) {
    return <Navigate to={PATH.LOGIN} />
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        m: 1,
        width: '413px',
        height: '372px',
        margin: '50px auto',
      }}
    >
      <Paper elevation={3}>
        <div className={s.paperContainer}>
          <div className={s.title}>Create new password</div>
          <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
            <PasswordInput id="password" error={errors.password} register={register} />
            <p className={s.text}>
              {`Create new password and we will send you further instructions to email`}
            </p>
            <Button
              sx={{
                width: '347px',
                borderRadius: '30px',
                mt: '42px',
                background: '#366EFF',
                letterSpacing: '0.01em',
              }}
              type={'submit'}
              variant={'contained'}
              color={'primary'}
              disabled={appStatus === 'loading'}
            >
              Create new password
            </Button>
          </form>
        </div>
      </Paper>
    </Box>
  )
}
