import React from 'react'

import CloseIcon from '@mui/icons-material/Close'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { Controller, useForm } from 'react-hook-form'
import { useLocation } from 'react-router-dom'

import { CardType } from 's1-DAL/cardsAPI'
import { useAppDispatch } from 's1-DAL/store'
import { updateCard } from 's2-BLL/cardsSlice'
import { SuperButton } from 's4-common'
import { fileToBasePromise } from 's4-common/utils/fileToBasePromise'

type AddCardModalPropsType = {
  card: CardType
  handleClose: () => void
}

export type AddCardType = {
  selectValue: string
  question: string
  answer: string
  questionImg: string
}

const options = ['Text', 'Image']

export const EditCardModal = (props: AddCardModalPropsType) => {
  const dispatch = useAppDispatch()
  const { search } = useLocation()
  const paramsFromUrl = Object.fromEntries(new URLSearchParams(search))

  const handleOpen = () => {
    submitFunc(getValues())
    props.handleClose()
  }

  const question = props.card.questionImg ? props.card.questionImg : props.card.question

  const { control, getValues, reset, setValue } = useForm<AddCardType>({
    defaultValues: {
      selectValue: options[0],
      question: question,
      answer: props.card.answer,
      questionImg: '',
    },
  })

  const submitFunc = (data: AddCardType) => {
    dispatch(
      updateCard(
        {
          ...props.card,
          answer: data.answer,
          question: data.question,
          questionImg: data.questionImg,
        },
        { cardsPack_id: props.card.cardsPack_id, ...paramsFromUrl }
      )
    )
    reset({ selectValue: options[0], question: '', answer: '' })
  }

  const uploadHandler = (files: FileList | null) => {
    if (files && files.length) {
      fileToBasePromise(files[0]).then(res => {
        setValue('questionImg', res as string)
      })
    }
  }

  return (
    <div
      style={{
        width: '400px',
        height: '400px',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '347px',
        }}
      >
        <Typography>Edit card</Typography>
        <CloseIcon onClick={props.handleClose} />
      </div>

      <div
        style={{
          height: '190px',
          width: '347px',
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'column',
        }}
      >
        {question.length < 30 ? (
          <div>
            <Controller
              render={({ field }) => (
                <Select sx={{ width: '100%', height: '36px' }} {...field}>
                  {options.map((option, index) => (
                    <MenuItem key={index} sx={{ width: '347px', height: '36px' }} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              )}
              name="selectValue"
              control={control}
            />
          </div>
        ) : null}

        <div>
          <div>Question</div>
          <div>
            <Controller
              control={control}
              name="question"
              render={({ field: { onChange, value } }) => (
                <div>
                  {value.length > 30 ? (
                    <img style={{ width: 345, height: 100 }} src={value} alt="image" />
                  ) : (
                    <TextField
                      style={{ width: '100%' }}
                      variant="standard"
                      onChange={onChange}
                      value={value}
                    />
                  )}
                </div>
              )}
            />
          </div>
          <div>
            <Controller
              control={control}
              name="question"
              render={({ field: { onChange } }) => (
                <label>
                  <input
                    type="file"
                    onChange={event => {
                      return uploadHandler(event.target.files)
                    }}
                    style={{ display: 'none' }}
                    accept="image/png, image/jpeg, image/svg"
                  />
                  <Button style={{ marginLeft: '95px' }} variant="contained" component="span">
                    Upload button
                  </Button>
                </label>
              )}
            />
          </div>
        </div>
        <div>
          <div>Answer</div>
          <div>
            <Controller
              control={control}
              name="answer"
              render={({ field: { onChange, value } }) => (
                <TextField
                  style={{ width: '100%' }}
                  variant="standard"
                  onChange={onChange}
                  value={value}
                />
              )}
            />
          </div>
        </div>
      </div>
      <SuperButton onClick={handleOpen}>Edit card</SuperButton>
    </div>
  )
}
