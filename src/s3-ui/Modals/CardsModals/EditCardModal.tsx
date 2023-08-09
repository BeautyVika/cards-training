import React, { FC, useState } from 'react'

import BorderColorIcon from '@mui/icons-material/BorderColor'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { SubmitHandler, useForm } from 'react-hook-form'

import { BasicModal } from '../BasicModal'

import { UpdateCardType } from 's1-DAL/cardsAPI'
import { UpdatePackType } from 's1-DAL/packsAPI'
import { ButtonsModals, UploadImage } from 's4-common'

type EditCardModalPropsType = {
  cardId: string
  cardQuestionImg: string | undefined
  cardAnswerImg: string | undefined
  question: string
  answer: string
  onEditHandle: (data: UpdateCardType) => void
}

export const EditCardModal: FC<EditCardModalPropsType> = ({
  cardId,
  cardQuestionImg,
  cardAnswerImg,
  question,
  answer,
  onEditHandle,
}) => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    reset()
  }

  const { register, handleSubmit, reset, setValue } = useForm<UpdateCardType>()

  const onSubmit: SubmitHandler<UpdatePackType> = (data: UpdateCardType) => {
    onEditHandle({ ...data, _id: cardId })
    handleClose()
  }

  return (
    <>
      <IconButton color={'secondary'} onClick={handleOpen}>
        <BorderColorIcon style={{ marginRight: '4px' }} />
      </IconButton>

      <BasicModal open={open} handleClose={handleClose}>
        <Typography variant="h5" component="h2">
          EDIT CARD
        </Typography>
        {cardQuestionImg ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <UploadImage
              buttonName={'Update cover'}
              setValue={setValue}
              packCover={cardQuestionImg}
              name={'questionImg'}
            />
            <UploadImage
              buttonName={'Update cover'}
              setValue={setValue}
              packCover={cardAnswerImg}
              name={'answerImg'}
            />
            <ButtonsModals handleClose={handleClose} name={'Save'} color={'primary'} />
          </form>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              sx={{ mt: 2, width: '100%' }}
              id="question"
              label="Edit question"
              variant="standard"
              margin="normal"
              defaultValue={question}
              {...register('question')}
            />
            <TextField
              sx={{ mt: 2, width: '100%' }}
              id="answer"
              label="Edit answer"
              variant="standard"
              margin="normal"
              defaultValue={answer}
              {...register('answer')}
            />

            <ButtonsModals handleClose={handleClose} name={'Save'} color={'primary'} />
          </form>
        )}
      </BasicModal>
    </>
  )
}
