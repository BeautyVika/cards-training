import React, { ChangeEvent, memo, useState } from 'react'

import BorderColorIcon from '@mui/icons-material/BorderColor'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { IconButton } from '@mui/material'
import TextField from '@mui/material/TextField'

import s from './EditableSpan.module.scss'

type EditableSpanPropsType = {
  value: string
  onChange: (newValue: string) => void
}

export const EditableSpan = memo(function (props: EditableSpanPropsType) {
  let [editMode, setEditMode] = useState(false)
  let [title, setTitle] = useState(props.value)

  const activateEditMode = () => {
    setEditMode(true)
    setTitle(props.value)
  }
  const activateViewMode = () => {
    setEditMode(false)
    if (title.trim() !== '') props.onChange(title.trim())
  }
  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  return editMode ? (
    <div className={s.inputContainer}>
      <TextField
        sx={{ width: '348px', height: '20px' }}
        label="Nickmame"
        value={title}
        onChange={changeTitle}
        autoFocus
        onBlur={activateViewMode}
      />
      <IconButton onClick={() => setEditMode(false)}>
        <CheckCircleIcon fontSize="large" color="primary" className={s.icon} />
      </IconButton>
    </div>
  ) : (
    <span onDoubleClick={activateEditMode} className={s.textContainer}>
      {props.value}
      <IconButton onClick={() => setEditMode(true)}>
        <BorderColorIcon fontSize="small" color="primary" className={s.icon} />
      </IconButton>
    </span>
  )
})
