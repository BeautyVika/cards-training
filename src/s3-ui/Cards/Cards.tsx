import React, { useEffect } from 'react'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import { Navigate, useLocation, useSearchParams } from 'react-router-dom'

import s from './Cards.module.scss'
import { CardsHeader } from './CardsHeader'
import { CardsTableBody } from './CardsTableBody'
import { CardsTableHead } from './CardsTableHead'

import { PATH } from 'app/Routes/AppRoutes'
import { AddNewCardType } from 's1-DAL/cardsAPI'
import { useAppDispatch, useAppSelector } from 's1-DAL/store'
import { addNewCard, getCards } from 's2-BLL/cardsSlice'
import { cardsSelector, isLoggedInSelector, SearchField } from 's4-common'

export const Cards = () => {
  const cards = useAppSelector(cardsSelector)
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(isLoggedInSelector)
  //set params into URL
  const [searchParams, setSearchParams] = useSearchParams()
  //get Single Params From URL
  const searchValue = searchParams.get('cardQuestion')
  const sortCards = searchParams.get('sortCards')
  const cardsPack_id = searchParams.get('cardsPack_id')
  //to get params from URL after Question Mark
  const { search } = useLocation()
  const paramsFromUrl = Object.fromEntries(new URLSearchParams(search))

  useEffect(() => {
    if (!isLoggedIn) return

    dispatch(getCards({ ...paramsFromUrl, cardsPack_id: cardsPack_id }))
  }, [searchParams, isLoggedIn])

  const onSearchNameDebounce = (value: string) => {
    setSearchParams({ ...paramsFromUrl, cardQuestion: value })
  }

  const setSortCards = (sortCards: string) => {
    setSearchParams({
      ...paramsFromUrl,
      sortCards,
    })
  }

  const onAddNewCardHandler = (data: AddNewCardType) => {
    dispatch(addNewCard({ ...data, cardsPack_id }, { ...paramsFromUrl, cardsPack_id }))
  }

  if (cardsPack_id === null) return <Navigate to={PATH.PACKS} />

  return (
    <>
      <CardsHeader onAddNewCard={onAddNewCardHandler} packId={cardsPack_id} />
      <TableContainer component={Paper}>
        <SearchField
          onSearchName={onSearchNameDebounce}
          searchValue={searchValue ?? ''}
          searchParams={searchParams}
        />
        {cards?.length > 0 ? (
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <CardsTableHead setSort={setSortCards} sort={sortCards ?? '0updated'} />
            <CardsTableBody />
          </Table>
        ) : (
          <div className={s.container}>
            <span className={s.message}>{'Nothing was found. Change your search parameters'}</span>
          </div>
        )}
      </TableContainer>
    </>
  )
}
