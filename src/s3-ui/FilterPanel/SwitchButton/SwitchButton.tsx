import React, { FC } from 'react'

import Button from '@mui/material/Button'

import { useAppSelector } from 's1-DAL/store'

type SwitchButtonPropsType = {
  showMyPacks: () => void
  showAllPacks: () => void
  searchId: string
}

export const SwitchButton: FC<SwitchButtonPropsType> = ({
  showMyPacks,
  showAllPacks,
  searchId,
}) => {
  const appStatus = useAppSelector(state => state.app.status)
  const switchOnStyle = {
    textTransform: 'none',
    width: '98px',
    height: '36px',
    background: '#366EFF',
  }
  const switchOffStyle = {
    textTransform: 'none',
    width: '98px',
    height: '36px',
    background: '#FFF',
    color: '#000',
  }

  return (
    <div>
      <Button
        type={'button'}
        sx={!searchId ? switchOnStyle : switchOffStyle}
        variant={'contained'}
        onClick={() => showAllPacks()}
        disabled={appStatus === 'loading'}
      >
        All
      </Button>
      <Button
        type={'button'}
        sx={searchId ? switchOnStyle : switchOffStyle}
        variant={'contained'}
        onClick={() => showMyPacks()}
        disabled={appStatus === 'loading'}
      >
        My
      </Button>
    </div>
  )
}
