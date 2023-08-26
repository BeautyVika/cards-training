import React, { FC, useState } from 'react'

import DeleteSweepIcon from '@mui/icons-material/DeleteSweep'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

import { BasicModal } from 's3-ui/Modals/BasicModal'
import { ButtonsModals } from 's4-common'

type DeleteCardModalType = {
  cardId: string
  cardQuestionImg: string | undefined
  question: string
  onDeleteCard: (id: string) => void
}

export const DeleteCardModal: FC<DeleteCardModalType> = ({
  cardId,
  cardQuestionImg,
  question,
  onDeleteCard,
}) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const onDeleteHandler = () => {
    onDeleteCard(cardId)
  }

  return (
    <>
      <IconButton color={'secondary'} onClick={handleOpen}>
        <DeleteSweepIcon style={{ marginRight: '4px' }} />
      </IconButton>
      <BasicModal open={open} handleClose={handleClose}>
        <Typography variant="h5" component="h2">
          DELETE CARD
        </Typography>
        {cardQuestionImg ? (
          <Typography sx={{ mt: 2 }}>
            Do you really want to remove?{' '}
            <b>
              <img
                src={cardQuestionImg}
                alt="cardImg"
                style={{ width: '100%', height: '150px', marginTop: '10px' }}
              />
            </b>
            <br />
            Card will be deleted
          </Typography>
        ) : (
          <Typography sx={{ mt: 2 }}>
            Do you really want to remove <b>{question}</b>?
            <br />
            Card will be deleted
          </Typography>
        )}
        <ButtonsModals
          handleClose={handleClose}
          name={'Delete'}
          onClickHandler={onDeleteHandler}
          color={'error'}
        />
      </BasicModal>
    </>
  )
}
