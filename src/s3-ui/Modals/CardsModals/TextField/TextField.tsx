import React, { FC } from 'react'

import TextField from '@mui/material/TextField'
import { UseFormHandleSubmit, UseFormRegister } from 'react-hook-form'

import { AddNewCardType } from 's1-DAL/cardsAPI'
import { ButtonsModals } from 's4-common'

type TextFieldPropsType = {
  onSubmit: (data: AddNewCardType) => void
  handleSubmit: UseFormHandleSubmit<AddNewCardType>
  register: UseFormRegister<AddNewCardType>
  handleClose: () => void
}

export const TextFields: FC<TextFieldPropsType> = ({
  onSubmit,
  handleSubmit,
  register,
  handleClose,
}) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        sx={{ mt: 2, width: '100%' }}
        id="question"
        label="Enter question"
        variant="standard"
        margin="normal"
        {...register('question')}
      />
      <TextField
        sx={{ mt: 2, width: '100%' }}
        id="answer"
        label="Enter answer"
        variant="standard"
        margin="normal"
        {...register('answer')}
      />
      <ButtonsModals handleClose={handleClose} name={'Save'} color={'primary'} />
    </form>
  )
}
