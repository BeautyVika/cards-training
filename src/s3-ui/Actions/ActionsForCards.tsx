import React, { FC } from 'react'

import { Skeleton } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { useLocation, useNavigate } from 'react-router-dom'

import { PATH } from 'app/Routes/AppRoutes'
import { CardType, UpdateCardType } from 's1-DAL/cardsAPI'
import { useAppDispatch, useAppSelector } from 's1-DAL/store'
import { deleteCard, updateCard } from 's2-BLL/cardsSlice'
import { DeleteCardModal, EditCardModal } from 's3-ui/Modals'
import { appStatusSelector } from 's4-common'

type ActionsForCardsPropsType = {
  card: CardType
}

export const ActionsForCards: FC<ActionsForCardsPropsType> = ({ card }) => {
  const appStatus = useAppSelector(appStatusSelector)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { search } = useLocation()

  const paramsFromUrl = Object.fromEntries(new URLSearchParams(search))

  if (appStatus === 'loading') {
    return <Skeleton height={40} />
  }

  const onEditCardHandle = (data: UpdateCardType) => {
    dispatch(updateCard(data, { ...paramsFromUrl, cardsPack_id: card.cardsPack_id }))
  }

  const onDeleteCardHandler = (id: string) => {
    dispatch(deleteCard(id, { ...paramsFromUrl, cardsPack_id: card.cardsPack_id }))
    navigate(PATH.CARDS)
  }

  const theme = createTheme({
    palette: {
      secondary: {
        main: '#000',
      },
    },
  })

  return (
    <Typography>
      <ThemeProvider theme={theme}>
        <EditCardModal
          onEditHandle={onEditCardHandle}
          cardId={card._id}
          cardQuestionImg={card.questionImg}
          cardAnswerImg={card.answerImg}
          question={card.question}
          answer={card.answer}
        />
        <DeleteCardModal
          cardId={card._id}
          cardQuestionImg={card.questionImg}
          question={card.question}
          onDelete={onDeleteCardHandler}
        />
      </ThemeProvider>
    </Typography>
  )
}
