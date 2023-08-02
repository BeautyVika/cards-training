import React, { ChangeEvent, FC } from 'react'

import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { IconButton } from '@mui/material'
import Avatar from '@mui/material/Avatar'

import defaultAvatar from '../../../assets/img/defaultAvatar.svg'

import s from './ProfileAvatar.module.scss'

import { AppDispatch, useAppDispatch, useAppSelector } from 's1-DAL/store'
import { setAppError, setAppStatus } from 's2-BLL/appSlice'
import { changeProfileImage } from 's2-BLL/authSlice'
import { avatarSelector, convertFileToBase64 } from 's4-common'

type ProfileAvatarPropsType = {
  size: number
  withButton?: boolean
}

export const ProfileAvatar: FC<ProfileAvatarPropsType> = ({ size, withButton }) => {
  const avatar = useAppSelector(avatarSelector)

  const dispatch = useAppDispatch()

  const uploadHandler = (
    e: ChangeEvent<HTMLInputElement>,
    dispatch: AppDispatch,
    callback: (img: string) => void
  ) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]
      const fileSizeMB = file.size / 1024 ** 2

      if (fileSizeMB < 1) {
        convertFileToBase64(file, (file64: string) => {
          callback(file64)
        })
      } else {
        dispatch(setAppError({ error: 'The file is too large' }))
        dispatch(setAppStatus({ status: 'failed' }))
      }
    }
  }

  const onChangeAvatar = (file64: string) => {
    dispatch(changeProfileImage(file64))
  }

  return (
    <div className={s.container}>
      <Avatar
        src={avatar ? avatar : defaultAvatar}
        style={{ width: `${size}px`, height: `${size}px` }}
        alt="ava"
      />
      {withButton && (
        <label>
          <input
            type="file"
            onChange={e => uploadHandler(e, dispatch, onChangeAvatar)}
            style={{ display: 'none' }}
            accept="image/png, image/jpeg, image/svg"
          />
          <IconButton
            component="span"
            style={{
              position: 'absolute',
              bottom: '-12px',
              right: '-15px',
            }}
          >
            <CloudUploadIcon />
          </IconButton>
        </label>
      )}
    </div>
  )
}
