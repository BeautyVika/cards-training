import React, { FC } from 'react'

import { UseFormHandleSubmit, UseFormSetValue } from 'react-hook-form'

import s from './PictureFields.module.scss'

import { AddNewCardType } from 's1-DAL/cardsAPI'
import { ButtonsModals, UploadImage } from 's4-common'

type PictureFieldsPropsType = {
  onSubmit: (data: AddNewCardType) => void
  handleSubmit: UseFormHandleSubmit<AddNewCardType>
  handleClose: () => void
  setValue: UseFormSetValue<any>
  packCover?: string
}

export const PictureFields: FC<PictureFieldsPropsType> = ({
  handleClose,
  handleSubmit,
  onSubmit,
  setValue,
}) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.formInput}>
      <div className={s.container}>
        <span className={s.title}>Choose an image for the question</span>
        <UploadImage setValue={setValue} buttonName={'Update picture'} name={'questionImg'} />
      </div>
      <div className={s.container}>
        <span className={s.title}>Choose an image for the answer</span>
        <UploadImage setValue={setValue} buttonName={'Update picture'} name={'answerImg'} />
      </div>
      <ButtonsModals handleClose={handleClose} name={'Save'} color={'primary'} />
    </form>
  )
}
