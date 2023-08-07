import React, { FC } from 'react'

import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { IconButton } from '@mui/material'
import Avatar from '@mui/material/Avatar'

import defaultAvatar from '../../../assets/img/defaultAvatar.svg'

import s from './ProfileAvatar.module.scss'

import { useAppDispatch, useAppSelector } from 's1-DAL/store'
import { changeProfileImage } from 's2-BLL/authSlice'
import { avatarSelector } from 's4-common'
import { uploadHandler } from 's4-common/utils/convertFileToBase64'

type ProfileAvatarPropsType = {
  size: number
  withButton?: boolean
}

export const ProfileAvatar: FC<ProfileAvatarPropsType> = ({ size, withButton }) => {
  const avatar = useAppSelector(avatarSelector)

  const dispatch = useAppDispatch()

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
            <CloudUploadIcon className={s.icon} />
          </IconButton>
        </label>
      )}
    </div>
  )
}
