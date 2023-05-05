import React, { useEffect } from 'react'

import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'

import s from './Answer.module.scss'

import { useAppDispatch, useAppSelector } from 's1-DAL/store'
import { updateCardGrade } from 's2-BLL/cardsSlice'
import { setGrade } from 's2-BLL/learnSlice'
import { answerSelector, card_idSelector, gradeSelector, SuperButton } from 's4-common'

export const Answer = () => {
  const answer = useAppSelector(answerSelector)
  const grade = useAppSelector(gradeSelector)
  const card_id = useAppSelector(card_idSelector)
  const dispatch = useAppDispatch()
  const grades = ['Did not know', 'Forgot', 'A lot of thought', 'Confused', 'Knew the answer']

  useEffect(() => {
    dispatch(setGrade({ grade: 1 }))
  }, [])

  const onChangeGrade = (grade: number) => {
    dispatch(setGrade({ grade: grade + 1 }))
  }
  const onNextClickHandler = () => {
    dispatch(updateCardGrade({ grade, card_id }))
  }

  return (
    <div className={s.answerContainer}>
      <div className={s.answer}>
        <b>Answer: </b>
        {answer}
      </div>
      <FormControl>
        <span className={s.title}>Rate yourself:</span>
        <RadioGroup
          aria-labelledby="radio-buttons-group-label"
          defaultValue={grade}
          name="radio-buttons-group"
        >
          {grades.map((grade, index) => {
            return (
              <FormControlLabel
                control={<Radio />}
                label={grade}
                key={index}
                value={index}
                onChange={() => onChangeGrade(index)}
              />
            )
          })}
        </RadioGroup>
      </FormControl>
      <SuperButton className={s.button} onClick={onNextClickHandler}>
        Next
      </SuperButton>
    </div>
  )
}
