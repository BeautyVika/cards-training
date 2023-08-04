import React, { useEffect } from 'react'

import './App.module.scss'

import { ErrorSnackbar } from './ErrorSnackBar/ErrorSnackBar'
import { Layout } from './Header/Layout'
import AppRoutes from './Routes/AppRoutes'

import { useAppDispatch, useAppSelector } from 's1-DAL/store'
import { getAuthUserData } from 's2-BLL/authSlice'
import { appStatusSelector, isInitializedSelector, LinearProgress } from 's4-common'

const App = () => {
  const isLoading = useAppSelector(appStatusSelector)
  const isInitialized = useAppSelector(isInitializedSelector)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getAuthUserData())
  }, [])

  if (!isInitialized) {
    return <LinearProgress />
  }

  return (
    <div className="App">
      <ErrorSnackbar />
      <Layout>
        {isLoading === 'loading' ? <LinearProgress /> : null}
        <AppRoutes />
      </Layout>
    </div>
  )
}

export default App
