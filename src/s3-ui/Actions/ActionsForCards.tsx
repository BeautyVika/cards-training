import React, { useState } from 'react'

import BorderColorIcon from '@mui/icons-material/BorderColor'
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep'

import { BasicModal, DeleteCardModal, EditCardModal } from '../Modals'

import { CardType } from 's1-DAL/cardsAPI'

type ActionsPropsType = {
  onStudyClick: (id: string) => void
  card: CardType
}

export const ActionsForCards = (props: ActionsPropsType) => {
  const [openEditModal, setOpenEditModal] = useState(false)
  const handleOpenEditModal = () => {
    setOpenEditModal(true)
  }
  const handleCloseEditModal = () => {
    setOpenEditModal(false)
  }

  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const handleOpenDeleteModal = () => {
    setOpenDeleteModal(true)
  }
  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false)
  }

  return (
    <div style={{ marginRight: '14px' }}>
      <BorderColorIcon style={{ marginRight: '8px' }} onClick={handleOpenEditModal} />
      <DeleteSweepIcon onClick={handleOpenDeleteModal} />
      <BasicModal handleClose={handleCloseEditModal} open={openEditModal}>
        <EditCardModal card={props.card} handleClose={handleCloseEditModal} />
      </BasicModal>
      <BasicModal handleClose={handleCloseDeleteModal} open={openDeleteModal}>
        <DeleteCardModal card={props.card} handleClose={handleCloseDeleteModal} />
      </BasicModal>
    </div>
  )
}
