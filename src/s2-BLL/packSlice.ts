import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { setAppStatus } from './appSlice'

import {
  AddNewPackType,
  GetPacksType,
  PackReturnType,
  packsAPI,
  UpdatePackType,
} from 's1-DAL/packsAPI'
import { AppDispatch, RootState } from 's1-DAL/store'
import { errorUtils } from 's4-common'

const initialState = {
  packsData: {} as PackReturnType,
  packsTotalCount: 0,
  maxCardsCount: 100,
  minCardsCount: 0,
}

const packSlice = createSlice({
  name: 'pack',
  initialState: initialState,
  reducers: {
    setPacks: (state, action: PayloadAction<{ packsData: PackReturnType }>) => {
      state.packsData = action.payload.packsData
    },
    setPacksTotalCount: (state, action: PayloadAction<{ value: number }>) => {
      state.packsTotalCount = action.payload.value
    },
    setMinPacksCount(state, action: PayloadAction<{ value: number }>) {
      state.minCardsCount = action.payload.value
    },
    setMaxCardsCount(state, action: PayloadAction<{ value: number }>) {
      state.maxCardsCount = action.payload.value
    },
  },
  extraReducers: builder => {},
})

export const { setPacks, setPacksTotalCount, setMinPacksCount, setMaxCardsCount } =
  packSlice.actions

export const packReducer = packSlice.reducer

//Thunk creators
export const getPacks =
  (attributes: GetPacksType) => async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(setAppStatus({ status: 'loading' }))

    try {
      const result = await packsAPI.getAllPacks(attributes)

      dispatch(setPacks({ packsData: result.data }))
      dispatch(setMinPacksCount({ value: result.data.minCardsCount }))
      dispatch(setMaxCardsCount({ value: result.data.maxCardsCount }))
      dispatch(setPacksTotalCount({ value: result.data.cardPacksTotalCount }))
      dispatch(setAppStatus({ status: 'succeeded' }))
    } catch (e: any) {
      errorUtils(dispatch, e)
    }
  }

export const addNewPack =
  (data: AddNewPackType, attributes: GetPacksType) => async (dispatch: AppDispatch) => {
    dispatch(setAppStatus({ status: 'loading' }))
    try {
      await packsAPI.addNewPack(data)

      dispatch(getPacks(attributes))
      dispatch(setAppStatus({ status: 'succeeded' }))
    } catch (e: any) {
      errorUtils(dispatch, e)
    }
  }

export const deletePack =
  (packId: string, attributes: GetPacksType) => async (dispatch: AppDispatch) => {
    dispatch(setAppStatus({ status: 'loading' }))
    try {
      await packsAPI.deletePack(packId)

      dispatch(getPacks(attributes))
      dispatch(setAppStatus({ status: 'succeeded' }))
    } catch (e: any) {
      errorUtils(dispatch, e)
    }
  }
export const updatePack =
  (data: UpdatePackType, attributes: GetPacksType) => async (dispatch: AppDispatch) => {
    dispatch(setAppStatus({ status: 'loading' }))
    try {
      await packsAPI.updatePack(data)

      dispatch(getPacks(attributes))
      dispatch(setAppStatus({ status: 'succeeded' }))
    } catch (e: any) {
      errorUtils(dispatch, e)
    }
  }

//types
type initialStateType = typeof initialState
