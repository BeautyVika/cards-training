import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { CardType } from 's1-DAL/cardsAPI'

const initialState = {
  showAnswer: false,
  currentCard: {} as CardType,
}

const learnSlice = createSlice({
  name: 'learn',
  initialState: initialState,
  reducers: {
    setCurrentCard(state, action: PayloadAction<CardType>) {
      state.currentCard = action.payload
    },
    setShowAnswer(state, action: PayloadAction<{ showAnswer: boolean }>) {
      state.showAnswer = action.payload.showAnswer
    },
    setGrade(state, action: PayloadAction<{ grade: number }>) {
      state.currentCard.grade = action.payload.grade
    },
  },
})

export const { setShowAnswer, setCurrentCard, setGrade } = learnSlice.actions
export const learnReducer = learnSlice.reducer
