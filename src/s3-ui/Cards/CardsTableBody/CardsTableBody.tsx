import React from 'react'

import { Skeleton } from '@mui/material'
import Rating from '@mui/material/Rating/Rating'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

import { ActionsForCards } from '../../Actions'

import { UpdateCardType } from 's1-DAL/cardsAPI'
import { useAppSelector } from 's1-DAL/store'
import { appStatusSelector, cardsSelector, userIdSelector } from 's4-common'

type CardsTableBodyType = {
  onEditCardHandle: (data: UpdateCardType) => void
  onDeleteCardHandler: (id: string) => void
}

export const CardsTableBody = (props: CardsTableBodyType) => {
  const cards = useAppSelector(cardsSelector)
  const appStatus = useAppSelector(appStatusSelector)
  const userId = useAppSelector(userIdSelector)

  return (
    <TableBody>
      {cards?.map(card => (
        <TableRow key={card._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
          <TableCell style={{ width: '100px, height: 25px' }} component="th" scope="row">
            {appStatus !== 'loading' && card.questionImg ? (
              <img style={{ width: 57, height: 36 }} src={card.questionImg} alt="cardImg" />
            ) : (
              appStatus !== 'loading' && card.question
            )}
            {appStatus === 'loading' && <Skeleton height={40} />}
          </TableCell>
          <TableCell align="left">
            {appStatus !== 'loading' && card.questionImg ? (
              <img style={{ width: 57, height: 36 }} src={card.answerImg} alt="cardImg" />
            ) : (
              appStatus !== 'loading' && card.answer
            )}
            {appStatus === 'loading' && <Skeleton height={40} />}
          </TableCell>
          <TableCell align="left">
            {appStatus === 'loading' ? <Skeleton height={40} /> : card.updated.substring(0, 10)}
          </TableCell>
          <TableCell align="left">
            {appStatus === 'loading' ? (
              <Skeleton height={40} />
            ) : (
              <Rating name="size-medium" value={card.grade} />
            )}
          </TableCell>
          {card.user_id === userId && (
            <TableCell align="left">
              {appStatus === 'loading' ? (
                <Skeleton height={40} />
              ) : (
                <ActionsForCards
                  card={card}
                  onEditCard={props.onEditCardHandle}
                  onDeleteCard={props.onDeleteCardHandler}
                />
              )}
            </TableCell>
          )}
        </TableRow>
      ))}
    </TableBody>
  )
}
