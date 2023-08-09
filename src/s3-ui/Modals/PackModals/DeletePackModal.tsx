import React, { useState } from 'react'

import DeleteSweepIcon from '@mui/icons-material/DeleteSweep'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

import { BasicModal } from '../BasicModal'

import { ButtonsModals } from 's4-common'

type DeletePackModalType = {
  packId: string
  packName: string
  onDelete: (id: string) => void
  hasText?: boolean
}

export const DeletePackModal = ({ packId, packName, onDelete, ...props }: DeletePackModalType) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const onDeleteHandler = () => {
    onDelete(packId)
  }

  return (
    <>
      <IconButton color={'secondary'} onClick={handleOpen}>
        <DeleteSweepIcon style={{ marginRight: '4px' }} />
        {props.hasText && <span>Delete</span>}
      </IconButton>
      <BasicModal open={open} handleClose={handleClose}>
        <Typography variant="h5" component="h2">
          DELETE PACK
        </Typography>
        <Typography sx={{ mt: 2 }}>
          Do you really want to remove <b>{packName}</b>?
          <br />
          All cards will be deleted
        </Typography>
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
