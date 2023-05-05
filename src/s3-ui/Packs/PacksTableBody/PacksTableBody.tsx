import React, { SyntheticEvent } from 'react'

import { Skeleton } from '@mui/material'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { useNavigate } from 'react-router-dom'

import defaultCover from '../../../assets/img/defaultCover.svg'
import { ActionsForPack } from '../../Actions'

import { PATH } from 'app/Routes/AppRoutes'
import { UpdatePackType } from 's1-DAL/packsAPI'
import { useAppSelector } from 's1-DAL/store'

type PacksTableBodyType = {
  onDeletePackHandle: (id: string) => void
  onEditPackHandle: (data: UpdatePackType) => void
}

export const PacksTableBody = (props: PacksTableBodyType) => {
  const packs = useAppSelector(state => state.packs.packsData.cardPacks)
  const appStatus = useAppSelector(state => state.app.status)
  const navigate = useNavigate()
  const onNameClickHandler = (id: string, cardsCount: number) => {
    navigate(PATH.CARDS + `?cardsPack_id=${id}&pageCount=${cardsCount}`)
  }

  /**
   * https://stackoverflow.com/a/48222599
   */
  const errorHandler = (event: SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.onerror = null
    event.currentTarget.src = defaultCover
  }

  return (
    <TableBody>
      {packs?.map(pack => (
        <TableRow key={pack._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
          <TableCell
            style={{ cursor: 'pointer', width: '350px' }}
            onClick={() => onNameClickHandler(pack._id, pack.cardsCount)}
            component="th"
            scope="row"
          >
            {appStatus !== 'loading' && (
              <img
                src={pack.deckCover ? pack.deckCover : defaultCover}
                style={{ width: '100px', height: '36px', marginRight: '10px' }}
                onError={errorHandler}
                alt="packImage"
              />
            )}
            {appStatus === 'loading' ? <Skeleton width={250} height={40} /> : pack.name}
          </TableCell>
          <TableCell align="left">
            {appStatus === 'loading' ? <Skeleton height={40} /> : pack.cardsCount}
          </TableCell>
          <TableCell align="left">
            {appStatus === 'loading' ? <Skeleton height={40} /> : pack.updated.substring(0, 10)}
          </TableCell>
          <TableCell align="left">
            {appStatus === 'loading' ? <Skeleton height={40} /> : pack.user_name}
          </TableCell>
          <TableCell align="left">
            <ActionsForPack
              packName={pack.name}
              packId={pack._id}
              id={pack.user_id}
              totalCardsInPack={pack.cardsCount}
              packCover={pack.deckCover}
            />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  )
}
