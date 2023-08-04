import React, { FC } from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import { useLocation, useNavigate } from 'react-router-dom'

import emailImg from '../../../assets/img/emailImg.svg'

import s from './CheckEmail.module.scss'

import { boxCreatorStyle } from 's4-common/utils/boxCreatorStyle'

export const CheckEmail: FC = () => {
  const navigate = useNavigate()
  const onClickHandler = () => {
    return navigate('/login')
  }
  const location = useLocation()
  const email = location.pathname.split('/').pop()

  return (
    <Box sx={boxCreatorStyle(400)}>
      <Paper elevation={3}>
        <div className={s.containerPaper}>
          <div className={s.title}>Check Email</div>
          <img className={s.img} src={emailImg} alt="emailImg" />
          <p className={s.text}>{`We’ve sent an Email with instructions to ${email}`}</p>
          <Button
            sx={{
              borderRadius: '30px',
              background: '#366EFF',
              letterSpacing: '0.01em',
              width: '347px',
              m: '41px 0 48px ',
            }}
            type={'submit'}
            variant={'contained'}
            color={'primary'}
            onClick={onClickHandler}
          >
            Back to login
          </Button>
        </div>
      </Paper>
    </Box>
  )
}
