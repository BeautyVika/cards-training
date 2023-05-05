import React from 'react'

import s from './commonInput.module.scss'

type CommonInputType = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & { error?: string; fieldname: string }

export const CommonInput = (props: CommonInputType) => {
  const finalClassName = s.inputField + (props.error ? ' ' + s.error : '')

  return (
    <div className={s.form__group}>
      <input {...props} placeholder={props.fieldname} className={finalClassName} />
      <label htmlFor={props.fieldname} className={s.form__label}>
        {props.fieldname}
      </label>
      <div className={s.errorMessageBox}>
        <span className={s.errorMessage}>{props.error ? props.error : ''}</span>
      </div>
    </div>
  )
}
