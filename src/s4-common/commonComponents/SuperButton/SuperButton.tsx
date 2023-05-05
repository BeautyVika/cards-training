import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'

import s from './SuperButton.module.scss'

type DefaultButtonPropsType = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

type SuperButtonPropsType = DefaultButtonPropsType & {
  xType?: string
}

export const SuperButton: React.FC<SuperButtonPropsType> = ({
  xType,
  className,
  disabled,
  ...restProps
}) => {
  const finalClassName =
    s.button +
    (disabled ? ' ' + s.disabled : '') +
    (xType === 'red' ? ' ' + s.red : '') +
    (xType === 'secondary' ? ' ' + s.secondary : ' ' + s.default) +
    (className ? ' ' + className : '')

  return (
    <button
      style={{ textAlign: 'center' }}
      disabled={disabled}
      className={finalClassName}
      {...restProps}
    />
  )
}
