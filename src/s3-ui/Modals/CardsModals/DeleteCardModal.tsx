import React from 'react'

import { useLocation } from 'react-router-dom'

import { CardType } from 's1-DAL/cardsAPI'
import { useAppDispatch } from 's1-DAL/store'
import { deleteCard } from 's2-BLL/cardsSlice'
import { SuperButton } from 's4-common'

type AddCardModalPropsType = {
  card: CardType
  handleClose: () => void
}

export const DeleteCardModal = (props: AddCardModalPropsType) => {
  const dispatch = useAppDispatch()
  const { search } = useLocation()
  const paramsFromUrl = Object.fromEntries(new URLSearchParams(search))
  const onButtonClickHandler = () => {
    dispatch(
      deleteCard(props.card._id, { cardsPack_id: props.card.cardsPack_id, ...paramsFromUrl })
    )
    props.handleClose()
  }

  return (
    <div
      style={{
        height: '240px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div
        style={{
          fontFamily: 'Montserrat',
          fontWeight: '500',
          fontSize: '22px',
          lineHeight: '22px',
        }}
      >
        Delete Card
      </div>
      <div>
        <div style={{ marginBottom: '3px' }}>
          Do you really want to remove <b>{props.card.question}</b> ?
        </div>
        <div>Card will be deleted</div>
      </div>
      <SuperButton
        onClick={onButtonClickHandler}
        style={{ alignSelf: 'center', width: '200px', backgroundColor: 'red' }}
      >
        Delete card
      </SuperButton>
    </div>
  )
}
