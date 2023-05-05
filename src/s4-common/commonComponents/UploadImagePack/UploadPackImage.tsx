import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react'

import Button from '@mui/material/Button'
import { UseFormSetValue } from 'react-hook-form'

import defaultCover from 'assets/img/defaultCover.svg'
import { convertFileToBase64 } from 's4-common/utils'

type UploadPackImageType = {
  buttonName: string
  packCover?: string
  setValue: UseFormSetValue<any>
}

export const UploadPackImage = ({
  buttonName,
  packCover,
  setValue,
  ...props
}: UploadPackImageType) => {
  const [image, setImage] = useState<string | undefined>(packCover)

  useEffect(() => {
    setImage(packCover)
  }, [])

  const imageUploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      console.log('file: ', file)

      if (!/^image\//.test(file.type)) {
        alert(`File ${file.name} is not an image.`)

        return false
      }

      if (file.size < 4000000) {
        convertFileToBase64(file, (file64: string) => {
          console.log('file64: ', file64)
          setImage(file64)
          setValue('deckCover', file64)
        })
      } else {
        console.error('Error: ', 'Файл слишком большого размера')
        alert(`File ${file.name} is to large. Should be less then 4 MB`)

        return false
      }
    } else return false
  }

  /**
   * https://stackoverflow.com/a/48222599
   */
  const errorHandler = (event: SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.onerror = null
    event.currentTarget.src = defaultCover
  }

  return (
    <>
      <label>
        <input
          type="file"
          accept="image/*"
          id="deckCover"
          style={{ display: 'none' }}
          onChange={imageUploadHandler}
        />
        <Button variant="text" color={'primary'} component="span">
          {buttonName}
        </Button>
      </label>
      {image && (
        <img
          src={image}
          style={{ width: '100%', height: '150px', margin: '10px' }}
          onError={errorHandler}
          alt="packImage"
        />
      )}
    </>
  )
}
