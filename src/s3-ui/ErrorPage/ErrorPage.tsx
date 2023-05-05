import React from 'react'

import { useNavigate } from 'react-router-dom'

import errorImg from '../../assets/img/404.svg'

import s from './ErrorPage.module.scss'

import { PATH } from 'app/Routes/AppRoutes'
import { SuperButton } from 's4-common'

export const ErrorPage = () => {
  const navigate = useNavigate()

  return (
    <div className={s.container}>
      <div className={s.textContainer}>
        <h2 className={s.title}>Ooops!</h2>
        <span className={s.text}>Sorry! Page not found!</span>
        <SuperButton style={{ width: '218px' }} onClick={() => navigate(PATH.PACKS)}>
          Back to home page
        </SuperButton>
      </div>
      <img src={errorImg} alt="404" />
    </div>
  )
}
