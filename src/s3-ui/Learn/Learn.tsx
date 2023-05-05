import React, { useEffect } from 'react'

import Paper from '@mui/material/Paper'
import { useLocation, useParams } from 'react-router-dom'

import { Answer } from './Answer/Answer'
import s from './Learn.module.scss'
import { Question } from './Question/Question'

import { useAppDispatch, useAppSelector } from 's1-DAL/store'
import { getCards } from 's2-BLL/cardsSlice'
import { setCurrentCard } from 's2-BLL/learnSlice'
import {
  appStatusSelector,
  BackToPacksList,
  cardsSelector,
  getRandomCard,
  isLoggedInSelector,
  LinearProgress,
  packNameSelector,
  showAnswerSelector,
} from 's4-common'

export const Learn = () => {
  const cards = useAppSelector(cardsSelector)
  const packName = useAppSelector(packNameSelector)
  const isLoggedIn = useAppSelector(isLoggedInSelector)
  const showAnswer = useAppSelector(showAnswerSelector)
  const appStatus = useAppSelector(appStatusSelector)

  const dispatch = useAppDispatch()
  const { search } = useLocation()
  const paramsFromUrl = Object.fromEntries(new URLSearchParams(search))
  const { packId } = useParams<{ packId: string }>()

  useEffect(() => {
    if (!isLoggedIn) return
    dispatch(getCards({ ...paramsFromUrl, cardsPack_id: packId ?? '' }))
  }, [packId, isLoggedIn])

  useEffect(() => {
    if (cards && cards.length > 0) {
      dispatch(setCurrentCard(getRandomCard(cards)))
    }
  }, [isLoggedIn, packId, cards])

  if (appStatus === 'loading') {
    return <LinearProgress />
  }

  return (
    <>
      <BackToPacksList />
      <div className={s.questionContainer}>
        <div className={s.title}>Learn &quot;{packName}&quot;</div>
        <Paper elevation={3}>
          <Question />
          {showAnswer && <Answer />}
        </Paper>
      </div>
    </>
  )
}
