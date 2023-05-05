import React, { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes } from 'react'

import s from './SuperCheckbox.module.scss'

type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

type SuperCheckboxPropsType = Omit<DefaultInputPropsType, 'type'> & {
  onChangeChecked?: (checked: boolean) => void
  spanClassName?: string
}

export const SuperCheckbox: React.FC<SuperCheckboxPropsType> = ({
  onChange,
  onChangeChecked,
  className,
  spanClassName,
  children,
  id,

  ...restProps
}) => {
  const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChangeChecked !== undefined) {
      if (e.currentTarget.checked) {
        e.currentTarget.checked = true
        onChangeChecked(e.currentTarget.checked)
      } else {
        e.currentTarget.checked = false
        onChangeChecked(e.currentTarget.checked)
      }
    }
  }

  const finalInputClassName = s.checkbox + (className ? ' ' + className : '')

  return (
    <label className={s.label}>
      <input
        id={id}
        type={'checkbox'}
        onChange={onChangeCallback}
        className={finalInputClassName}
        {...restProps}
      />
      {children && (
        <span id={id ? id + '-span' : undefined} className={s.spanClassName}>
          {children}
        </span>
      )}
    </label>
  )
}
