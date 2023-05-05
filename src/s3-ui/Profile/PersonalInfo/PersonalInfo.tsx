import React from 'react'

import { NavLink } from 'react-router-dom'

import { LogOutButton } from '../../Login/LogOutButton/LogOutButton'
import { EditableSpan } from '../EditableSpan/EditableSpan'
import style from '../Profile.module.scss'
import { ProfileAvatar } from '../ProfileAvatar/ProfileAvatar'

import { PATH } from 'app/Routes/AppRoutes'
import { UserType } from 's1-DAL/authAPI'
import { SuperButton } from 's4-common'

type PersonalInfoPropsTypes = {
  profile: UserType
  onChangeHandler: (newName: string) => void
  logoutHandler: () => void
}

const PersonalInfo = ({ profile, onChangeHandler, ...props }: PersonalInfoPropsTypes) => {
  return (
    <div className={style.form}>
      <NavLink to={PATH.PACKS}>
        <SuperButton className={style.button}>Open packs</SuperButton>
      </NavLink>

      <h2 className={style.title}>Personal Information</h2>

      <ProfileAvatar size={100} withButton />

      <div className={style.name}>
        <EditableSpan value={profile.name} onChange={onChangeHandler} />
      </div>
      <div className={style.email}>{profile.email}</div>
      <LogOutButton />
    </div>
  )
}

export default PersonalInfo
