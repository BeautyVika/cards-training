import React from 'react'

import style from './LinearProgress.module.scss'

export const LinearProgress = () => {
  return (
    <div>
      <progress className={style.progress} />
    </div>
  )
}
