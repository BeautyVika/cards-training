import React, { FC, useState } from 'react'

import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { SubmitHandler, useForm } from 'react-hook-form'

import { AddNewCardType } from 's1-DAL/cardsAPI'
import { useAppSelector } from 's1-DAL/store'
import { BasicModal } from 's3-ui/Modals/BasicModal'
import { SuperButton, UploadPackImage } from 's4-common'

type AddCardModallPropsType = {
  pack_id: string
  onAddNewCard: (data: AddNewCardType) => void
}

export const AddCardModall: FC<AddCardModallPropsType> = ({ onAddNewCard, pack_id }) => {
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
    console.log(data)
    onAddNewCard(data)
    handleClose()
  }

  return (
    <div>
      {/*<SuperButton*/}
      {/*  style={{*/}
      {/*    letterSpacing: '0.01em',*/}
      {/*    fontSize: '16px',*/}
      {/*    width: '175px',*/}
      {/*  }}*/}
      {/*  onClick={handleOpen}*/}
      {/*  disabled={appStatus === 'loading'}*/}
      {/*>*/}
      {/*  Add new card*/}
      {/*</SuperButton>*/}
      {/*<BasicModal open={open} handleClose={handleClose}>*/}
      <Typography variant="h5" component="h2">
        ADD NEW CARD
      </Typography>
      <div>Choose a question format</div>
      <Select value={select} onChange={handleChange} displayEmpty size="small">
        <MenuItem value={'text'}>Text</MenuItem>
        <MenuItem value={'picture'}>Picture</MenuItem>
      </Select>
      {select === 'text' && (
        <form onSubmit={handleSubmit(onSubmit)}>
          {/*<UploadPackImage setValue={setValue} buttonName={'Update cover picture'} />*/}
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
          <Typography sx={{ mt: 2 }} display={'flex'} justifyContent={'space-between'}>
            <Button variant={'outlined'} onClick={handleClose} sx={{ width: '85px' }}>
              Cancel
            </Button>
            <Button variant={'contained'} color={'primary'} type={'submit'} sx={{ width: '85px' }}>
              Save
            </Button>
          </Typography>
        </form>
      )}

      {select === 'picture' && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <span>Enter question</span>
            <UploadPackImage setValue={setValue} buttonName={'Update cover picture'} />
          </div>
          <div>
            <span>Enter answer</span>
            <UploadPackImage setValue={setValue} buttonName={'Update cover picture'} />
          </div>
          <Typography sx={{ mt: 2 }} display={'flex'} justifyContent={'space-between'}>
            <Button variant={'outlined'} onClick={handleClose} sx={{ width: '85px' }}>
              Cancel
            </Button>
            <Button variant={'contained'} color={'primary'} type={'submit'} sx={{ width: '85px' }}>
              Save
            </Button>
          </Typography>
        </form>
      )}

      {/*</BasicModal>*/}
    </div>
  )
}
