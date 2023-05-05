import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: InitialStateType = {
  error: null,
  status: 'succeeded' as StatusAppType,
  isInitialized: false,
}
const appSlice = createSlice({
  name: 'app',
  initialState: initialState,
  reducers: {
    setAppError: (state, action: PayloadAction<{ error: null | string }>) => {
      state.error = action.payload.error
    },
    setAppStatus: (state, action: PayloadAction<{ status: StatusAppType }>) => {
      state.status = action.payload.status
    },
    setIsInitializedAC: (state, action: PayloadAction<{ value: boolean }>) => {
      state.isInitialized = action.payload.value
    },
  },
})

export const { setAppError, setAppStatus, setIsInitializedAC } = appSlice.actions
export const appReducer = appSlice.reducer

//types
type StatusAppType = 'loading' | 'idle' | 'succeeded' | 'failed'

type InitialStateType = {
  error: string | null
  status: StatusAppType
  isInitialized: boolean
}
