import React, { FC } from 'react'

import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

type ButtonsModalsPropsType = {
  handleClose: () => void
  name: string
  onClickHandler?: () => void
  color: 'primary' | 'error'
}

export const ButtonsModals: FC<ButtonsModalsPropsType> = ({
  handleClose,
  name,
  onClickHandler,
  color,
}) => {
  return (
    <Typography sx={{ mt: 2 }} display={'flex'} justifyContent={'space-between'}>
      <Button variant={'outlined'} onClick={handleClose} sx={{ width: '85px' }}>
        Cancel
      </Button>
      <Button
        variant={'contained'}
        color={color}
        type={'submit'}
        sx={{ width: '85px' }}
        onClick={onClickHandler}
      >
        {name}
      </Button>
    </Typography>
  )
}
