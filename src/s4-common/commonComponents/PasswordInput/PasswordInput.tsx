import React, { useState, FC } from 'react'

import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import Input from '@mui/material/Input'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'

import s from './PasswordInput.module.scss'

type PasswordInputProps = {
  id: string
  register: any
  error: any
}

export const PasswordInput: FC<PasswordInputProps> = ({ id, register, error }) => {
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword(show => !show)

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  return (
    <FormControl sx={{ m: 1, width: '347px' }} variant="standard">
      <InputLabel htmlFor="password">Password</InputLabel>
      <Input
        id={id}
        type={showPassword ? 'text' : 'password'}
        error={!!error}
        {...register('password', {
          required: 'Password is a required field!',
          minLength: { value: 6, message: 'Minimum length of password is 6 symbols' },
          maxLength: { value: 30, message: 'Maximum length of password is 30 symbols' },
        })}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
      {error && <span className={s.error}>{error.message}</span>}
    </FormControl>
  )
}
