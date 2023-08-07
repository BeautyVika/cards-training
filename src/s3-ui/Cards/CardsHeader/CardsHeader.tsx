import React, { useState } from 'react'

import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'

import { AddCardModal, BasicModal } from '../../Modals'
import { EditBar } from '../EditBar/EditBar'

import s from './CardsHeader.module.scss'

import { PATH } from 'app/Routes/AppRoutes'
import defaultCover from 'assets/img/defaultCover.svg'
import { AddNewCardType } from 's1-DAL/cardsAPI'
import { useAppSelector } from 's1-DAL/store'
import { AddCardModall } from 's3-ui/Modals/CardsModals/AddCardModall'
import {
  BackToPacksList,
  cardsTotalCountSelector,
  packDeckCoverSelector,
  packNameSelector,
  packUserIdSelector,
  SuperButton,
  userIdSelector,
} from 's4-common'

type CardsHeaderType = {
  onAddNewCard: (data: AddNewCardType) => void
  packId: string
}

export const CardsHeader = (props: CardsHeaderType) => {
  const userId = useAppSelector(userIdSelector)
  const packUserId = useAppSelector(packUserIdSelector)
  const cardsTotalCount = useAppSelector(cardsTotalCountSelector)
  const packName = useAppSelector(packNameSelector)
  const imgPack = useAppSelector(packDeckCoverSelector)

  const navigate = useNavigate()

  const onLearnCards = () => {
    navigate(`${PATH.LEARN}/${props.packId}`)
  }

  const [open, setOpen] = useState(false)
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <BackToPacksList />
      <div className={s.headerContainer}>
        <div className={s.header}>
          <Typography className={s.title}>{packName}</Typography>
          {userId === packUserId && (
            <EditBar
              packId={props.packId}
              packName={packName}
              cardsTotalCount={cardsTotalCount}
              packUserId={packUserId}
            />
          )}
          <img
            src={imgPack ? imgPack : defaultCover}
            style={{ width: '80px', height: '40px', marginRight: '10px' }}
            alt="packImage"
            className={s.imgPack}
          />
        </div>
        {userId === packUserId ? (
          <SuperButton
            style={{
              letterSpacing: '0.01em',
              fontSize: '16px',
              width: '175px',
            }}
            onClick={handleOpen}
          >
            Add new card
          </SuperButton>
        ) : (
          <SuperButton
            style={{
              letterSpacing: '0.01em',
              fontSize: '16px',
              width: '175px',
            }}
            disabled={cardsTotalCount === 0}
            onClick={onLearnCards}
          >
            Learn to pack
          </SuperButton>
        )}
      </div>

      <BasicModal handleClose={handleClose} open={open}>
        {/*<AddCardModall pack_id={props.packId} onAddNewCard={props.onAddNewCard} />*/}
        <AddCardModal
          onAddNewCard={props.onAddNewCard}
          pack_id={props.packId}
          handleClose={handleClose}
        />
      </BasicModal>
    </>
  )
}
