import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AnyAction, combineReducers } from 'redux'
import { ThunkAction } from 'redux-thunk'

import { appReducer } from 's2-BLL/appSlice'
import { authReducer } from 's2-BLL/authSlice'
import { cardsReducer } from 's2-BLL/cardsSlice'
import { learnReducer } from 's2-BLL/learnSlice'
import { packReducer } from 's2-BLL/packSlice'

export const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  cards: cardsReducer,
  packs: packReducer,
  learn: learnReducer,
})

export const store = configureStore({
  reducer: rootReducer,
})

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch: () => AppDispatch = useDispatch

//types
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>
export type AppActionTypes = AnyAction
export type RootState = ReturnType<typeof store.getState>
