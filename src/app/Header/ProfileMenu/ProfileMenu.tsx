import React, { useCallback, useState } from 'react'

import { MenuEditBar } from './MenuEditBar/MenuEditBar'
import s from './ProfileMenu.module.scss'

import { useAppSelector } from 's1-DAL/store'
import { ProfileAvatar } from 's3-ui/Profile'
import { userNameSelector } from 's4-common'

export const ProfileMenu = () => {
  const userName = useAppSelector(userNameSelector)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const openProfileMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleMenuClose = useCallback(() => {
    setAnchorEl(null)
  }, [])

  const id = open ? 'simple-popover' : undefined

  return (
    <>
      <div className={s.container} onClick={openProfileMenu}>
        <span className={s.name}>{userName}</span>
        <ProfileAvatar size={36} />
      </div>
      <MenuEditBar id={id} open={open} handleMenuClose={handleMenuClose} anchorEl={anchorEl} />
    </>
  )
}
