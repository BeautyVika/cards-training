import React, {
  ChangeEvent,
  DetailedHTMLProps,
  InputHTMLAttributes,
  KeyboardEvent,
  ReactNode,
} from 'react'

import s from './SuperInputText.module.scss'

type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

type SuperInputTextPropsType = Omit<DefaultInputPropsType, 'type'> & {
  onChangeText?: (value: string) => void
  onEnter?: () => void
  error?: ReactNode
  spanClassName?: string
  type?: string
}

export const SuperInputText: React.FC<SuperInputTextPropsType> = ({
  onChange,
  onChangeText,
  onKeyPress,
  onEnter,
  error,
  className,
  spanClassName,
  id,
  name,
  type,
  ...restProps
}) => {
  const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e)
    }
    onChangeText?.(e.currentTarget.value)
  }
  const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
    onKeyPress?.(e)

    onEnter && e.key === 'Enter' && onEnter()
  }

  const finalSpanClassName = s.error + (spanClassName ? ' ' + spanClassName : '')
  const finalInputClassName =
    s.input +
    (error ? ' ' + s.errorInput : ' ' + s.superInput) +
    (className ? ' ' + s.className : '')

  return (
    <div className={s.inputWrapper}>
      <input
        id={id}
        onChange={onChangeCallback}
        type={type}
        onKeyPress={onKeyPressCallback}
        className={finalInputClassName}
        name={name}
        {...restProps}
      />
      <span id={id ? id + '-span' : undefined} className={finalSpanClassName}>
        {error}
      </span>
    </div>
  )
}
