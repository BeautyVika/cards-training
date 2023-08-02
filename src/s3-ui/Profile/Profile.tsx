import React, { useCallback } from 'react'

import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { Navigate, NavLink } from 'react-router-dom'

import style from './Profile.module.scss'

import { PATH } from 'app/Routes/AppRoutes'
import { useAppDispatch, useAppSelector } from 's1-DAL/store'
import { changeProfileName } from 's2-BLL/authSlice'
import { LogOutButton } from 's3-ui/Login/LogOutButton/LogOutButton'
import { EditableSpan } from 's3-ui/Profile/EditableSpan/EditableSpan'
import { ProfileAvatar } from 's3-ui/Profile/ProfileAvatar/ProfileAvatar'
import { isLoggedInSelector, SuperButton, userInfoSelector } from 's4-common'

export const Profile = () => {
  const userInfo = useAppSelector(userInfoSelector)
  const isLoggedIn = useAppSelector(isLoggedInSelector)
  const dispatch = useAppDispatch()

  const onNameChangeHandler = useCallback((newName: string) => {
    dispatch(changeProfileName(newName))
  }, [])

  if (!isLoggedIn) return <Navigate to={PATH.LOGIN} />

  return (
    <div className={style.mainContainer}>
      <NavLink to={PATH.PACKS} className={style.button}>
        <SuperButton>Open packs</SuperButton>
      </NavLink>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          m: 1,
          width: '420px',
          height: '348px',
          margin: '50px auto',
        }}
      >
        <Paper elevation={3} sx={{ width: '100%' }}>
          <div className={style.container}>
            <h2 className={style.title}>Personal Information</h2>
            <ProfileAvatar size={100} withButton />
            <div className={style.name}>
              <EditableSpan value={userInfo.name} onChange={onNameChangeHandler} />
            </div>
            <div className={style.email}>{userInfo.email}</div>
            <LogOutButton />
          </div>
        </Paper>
      </Box>
    </div>
  )
}
