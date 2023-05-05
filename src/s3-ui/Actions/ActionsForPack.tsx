import React from 'react'

import SchoolIcon from '@mui/icons-material/School'
import { Skeleton } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { useLocation, useNavigate } from 'react-router-dom'

import { DeletePackModal, EditPackModal } from '../Modals'

import { PATH } from 'app/Routes/AppRoutes'
import { UpdatePackType } from 's1-DAL/packsAPI'
import { useAppDispatch, useAppSelector } from 's1-DAL/store'
import { deletePack, updatePack } from 's2-BLL/packSlice'
import { appStatusSelector, userIdSelector } from 's4-common'

type ActionsPropsType = {
  packId: string
  packName: string
  totalCardsInPack: number
  id: string
  hasText?: boolean
  packCover: string | undefined
}

export const ActionsForPack = ({
  packId,
  packName,
  totalCardsInPack,
  id,
  packCover,
  ...props
}: ActionsPropsType) => {
  const userId = useAppSelector(userIdSelector)
  const appStatus = useAppSelector(appStatusSelector)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { search } = useLocation()
  const paramsFromUrl = Object.fromEntries(new URLSearchParams(search))

  const theme = createTheme({
    palette: {
      secondary: {
        main: '#000',
      },
    },
  })

  const onStudyClick = () => {
    navigate(`${PATH.LEARN}/${packId}`)
  }

  if (appStatus === 'loading') {
    return <Skeleton height={40} />
  }

  const onDeletePackHandle = (id: string) => {
    dispatch(deletePack(id, paramsFromUrl))
    navigate(PATH.PACKS)
  }

  const onEditPackHandle = (data: UpdatePackType) => {
    dispatch(updatePack(data, paramsFromUrl))
  }

  const style = props.hasText
    ? {
        display: 'flex',
        flexDirection: 'column',
      }
    : {}

  return (
    <Typography sx={style}>
      <ThemeProvider theme={theme}>
        {!totalCardsInPack ? (
          <IconButton disabled>
            <SchoolIcon style={{ marginRight: '4px' }} />
            {props.hasText && <span>Learn</span>}
          </IconButton>
        ) : (
          <IconButton color={'secondary'} onClick={onStudyClick}>
            <SchoolIcon color={'secondary'} style={{ marginRight: '4px' }} />
            {props.hasText && <span color={'black'}>Learn</span>}
          </IconButton>
        )}
        {id === userId && (
          <EditPackModal
            onEditHandle={onEditPackHandle}
            packId={packId}
            packName={packName}
            hasText={props.hasText}
            packCover={packCover}
          />
        )}
        {id === userId && (
          <DeletePackModal
            packId={packId}
            packName={packName}
            onDeleteHandle={onDeletePackHandle}
            hasText={props.hasText}
          />
        )}
      </ThemeProvider>
    </Typography>
  )
}
