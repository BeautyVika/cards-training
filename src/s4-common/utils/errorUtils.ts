import { Dispatch } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'

import { setAppError, setAppStatus } from 's2-BLL/appSlice'

export const errorUtils = (dispatch: Dispatch, e: any) => {
  const err = e as Error | AxiosError<{ error: string }>

  if (axios.isAxiosError(err)) {
    const error = err.response?.data ? err.response.data : err.message

    if (error.error) {
      dispatch(setAppError({ error: error.error }))
    } else {
      dispatch(setAppError({ error: error }))
    }
  } else {
    dispatch(setAppError({ error: `native error ${err.message}` }))
  }
  dispatch(setAppStatus({ status: 'failed' }))
}
