import React, { FC, useState } from 'react'

import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Typography from '@mui/material/Typography'
import { useForm } from 'react-hook-form'

import s from './AddCardModal.module.scss'

import { AddNewCardType } from 's1-DAL/cardsAPI'
import { useAppSelector } from 's1-DAL/store'
import { BasicModal } from 's3-ui/Modals/BasicModal'
import { PictureFields } from 's3-ui/Modals/CardsModals/PictureFields/PictureFields'
import { TextFields } from 's3-ui/Modals/CardsModals/TextField/TextField'
import { SuperButton } from 's4-common'

type AddCardModalPropsType = {
  packCover?: string
  onAddNewCard: (data: AddNewCardType) => void
}

export const AddCardModal: FC<AddCardModalPropsType> = ({ onAddNewCard }) => {
  const [open, setOpen] = useState(false)
  const [select, setSelect] = useState('text')
  const appStatus = useAppSelector(state => state.app.status)

  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    reset()
  }

  const handleChange = (event: SelectChangeEvent) => {
    setSelect(event.target.value)
  }

  const { setValue, register, handleSubmit, reset } = useForm<AddNewCardType>()

  const onSubmit = (data: AddNewCardType) => {
    onAddNewCard(data)
    handleClose()
  }

  return (
    <>
      <SuperButton
        style={{
          letterSpacing: '0.01em',
          fontSize: '16px',
          width: '175px',
        }}
        onClick={handleOpen}
        disabled={appStatus === 'loading'}
      >
        Add new card
      </SuperButton>
      <BasicModal open={open} handleClose={handleClose}>
        <Typography variant="h5" component="h2">
          ADD NEW CARD
        </Typography>
        <div className={s.choose}>Choose a question format</div>
        <Select
          value={select}
          onChange={handleChange}
          displayEmpty
          size="small"
          sx={{ width: '100%' }}
        >
          <MenuItem value={'text'}>Text</MenuItem>
          <MenuItem value={'picture'}>Picture</MenuItem>
        </Select>
        {select === 'text' && (
          <TextFields
            onSubmit={onSubmit}
            handleClose={handleClose}
            handleSubmit={handleSubmit}
            register={register}
          />
        )}
        {select === 'picture' && (
          <PictureFields
            handleClose={handleClose}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            setValue={setValue}
          />
        )}
      </BasicModal>
    </>
  )
}
