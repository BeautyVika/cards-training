import React, { useState } from 'react'

import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { SubmitHandler, useForm } from 'react-hook-form'

import { BasicModal } from '../BasicModal'

import { AddNewPackType } from 's1-DAL/packsAPI'
import { useAppSelector } from 's1-DAL/store'
import { ButtonsModals, SuperButton, UploadImage } from 's4-common'

type AddPackModalPropsType = {
  onAddHandle: (data: AddNewPackType) => void
}

export const AddPackModal = ({ onAddHandle, ...props }: AddPackModalPropsType) => {
  const [open, setOpen] = useState(false)

  const appStatus = useAppSelector(state => state.app.status)

  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    reset()
  }

  const { setValue, register, handleSubmit, reset } = useForm<AddNewPackType>()

  const onSubmit: SubmitHandler<AddNewPackType> = (data: AddNewPackType) => {
    onAddHandle(data)
    handleClose()
  }

  return (
    <div>
      <SuperButton
        style={{
          letterSpacing: '0.01em',
          fontSize: '16px',
          width: '175px',
        }}
        onClick={handleOpen}
        disabled={appStatus === 'loading'}
      >
        Add new pack
      </SuperButton>
      <BasicModal open={open} handleClose={handleClose}>
        <Typography variant="h5" component="h2">
          ADD NEW PACK
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <UploadImage setValue={setValue} buttonName={'Update cover picture'} name={'deckCover'} />
          <TextField
            sx={{ mt: 2, width: '100%' }}
            id="pack-name"
            label="Enter pack's name"
            variant="standard"
            margin="normal"
            {...register('name')}
          />
          <Typography>
            <Checkbox id="private-pack" {...register('private')} />
            Private pack
          </Typography>

          <ButtonsModals handleClose={handleClose} name={'Save'} color={'primary'} />
        </form>
      </BasicModal>
    </div>
  )
}
