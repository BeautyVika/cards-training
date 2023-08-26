import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { setAppStatus } from './appSlice'

import {
  AddNewPackType,
  GetPacksType,
  PackReturnType,
  packsAPI,
  UpdatePackType,
} from 's1-DAL/packsAPI'
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
export const getPacks = createAsyncThunk(
  'pack/getPacks',
  async (attributes: GetPacksType, { dispatch }) => {
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
)
export const addNewPack = createAsyncThunk(
  'pack/addNewPack',
  async (arg: { data: AddNewPackType; attributes: GetPacksType }, { dispatch }) => {
    dispatch(setAppStatus({ status: 'loading' }))
    try {
      await packsAPI.addNewPack(arg.data)

      dispatch(getPacks(arg.attributes))
      dispatch(setAppStatus({ status: 'succeeded' }))
    } catch (e: any) {
      errorUtils(dispatch, e)
    }
  }
)
export const deletePack = createAsyncThunk(
  'pack/deletePack',
  async (arg: { packId: string; attributes: GetPacksType }, { dispatch }) => {
    dispatch(setAppStatus({ status: 'loading' }))
    try {
      await packsAPI.deletePack(arg.packId)

      dispatch(getPacks(arg.attributes))
      dispatch(setAppStatus({ status: 'succeeded' }))
    } catch (e: any) {
      errorUtils(dispatch, e)
    }
  }
)
export const updatePack = createAsyncThunk(
  'pack/updatePack',
  async (arg: { data: UpdatePackType; attributes: GetPacksType }, { dispatch }) => {
    dispatch(setAppStatus({ status: 'loading' }))
    try {
      await packsAPI.updatePack(arg.data)

      dispatch(getPacks(arg.attributes))
      dispatch(setAppStatus({ status: 'succeeded' }))
    } catch (e: any) {
      errorUtils(dispatch, e)
    }
  }
)

//types
type initialStateType = typeof initialState
