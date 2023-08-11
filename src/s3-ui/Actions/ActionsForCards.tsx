import React, { FC } from 'react'

import { Skeleton } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

import { CardType, UpdateCardType } from 's1-DAL/cardsAPI'
import { useAppSelector } from 's1-DAL/store'
import { DeleteCardModal, EditCardModal } from 's3-ui/Modals'
import { appStatusSelector } from 's4-common'

type ActionsForCardsPropsType = {
  card: CardType
  onEditCard: (data: UpdateCardType) => void
  onDeleteCard: (id: string) => void
}

export const ActionsForCards: FC<ActionsForCardsPropsType> = ({
  card,
  onEditCard,
  onDeleteCard,
}) => {
  const appStatus = useAppSelector(appStatusSelector)

  if (appStatus === 'loading') {
    return <Skeleton height={40} />
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
          cardId={card._id}
          cardQuestionImg={card.questionImg}
          cardAnswerImg={card.answerImg}
          question={card.question}
          answer={card.answer}
          onEditCard={onEditCard}
        />
        <DeleteCardModal
          cardId={card._id}
          cardQuestionImg={card.questionImg}
          question={card.question}
          onDeleteCard={onDeleteCard}
        />
      </ThemeProvider>
    </Typography>
  )
}
