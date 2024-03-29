import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react'

import Button from '@mui/material/Button'
import { UseFormSetValue } from 'react-hook-form'

import defaultCover from 'assets/img/defaultCover.svg'
import { useAppDispatch } from 's1-DAL/store'
import { setAppError } from 's2-BLL/appSlice'
import { convertFileToBase64 } from 's4-common/utils'

type UploadPackImageType = {
  buttonName: string
  packCover?: string
  setValue: UseFormSetValue<any>
  name: string
}

export const UploadImage = ({
  buttonName,
  packCover,
  setValue,
  name,
  ...props
}: UploadPackImageType) => {
  const [image, setImage] = useState<string | undefined>(packCover)

  const dispatch = useAppDispatch()

  useEffect(() => {
    setImage(packCover)
  }, [])

  const imageUploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      if (!/^image\//.test(file.type)) {
        dispatch(setAppError({ error: `File is not an image.` }))

        // alert(`File ${file.name} is not an image.`)
        return false
      }

      if (file.size < 4000000) {
        convertFileToBase64(file, (file64: string) => {
          setImage(file64)
          setValue(`${name}`, file64)
        })
      } else {
        dispatch(setAppError({ error: `File is to large. Should be less then 4 MB` }))

        // alert(`File ${file.name} is to large. Should be less than 4 MB`)

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
          id={name}
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
          style={{ width: '100%', height: '150px', marginTop: '10px' }}
          onError={errorHandler}
          alt="image"
        />
      )}
    </>
  )
}
