import { RootState } from 's1-DAL/store'

export const showAnswerSelector = (state: RootState) => state.learn.showAnswer
export const questionSelector = (state: RootState) => state.learn.currentCard.question
export const questionImgSelector = (state: RootState) => state.learn.currentCard.questionImg
export const answerImgSelector = (state: RootState) => state.learn.currentCard.answerImg
export const shotsSelector = (state: RootState) => state.learn.currentCard.shots
export const gradeSelector = (state: RootState) => state.learn.currentCard.grade
export const answerSelector = (state: RootState) => state.learn.currentCard.answer
export const card_idSelector = (state: RootState) => state.learn.currentCard._id
