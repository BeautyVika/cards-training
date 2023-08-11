import React, { useEffect } from 'react'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import { Navigate, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import s from './Cards.module.scss'
import { CardsHeader } from './CardsHeader'
import { CardsTableBody } from './CardsTableBody'
import { CardsTableHead } from './CardsTableHead'

import { PATH } from 'app/Routes/AppRoutes'
import { AddNewCardType, UpdateCardType } from 's1-DAL/cardsAPI'
import { useAppDispatch, useAppSelector } from 's1-DAL/store'
import { addNewCard, deleteCard, getCards, updateCard } from 's2-BLL/cardsSlice'
import { SuperPagination } from 's3-ui/Pagination/Pagination'
import { cardsSelector, cardsTotalCountSelector, isLoggedInSelector, SearchField } from 's4-common'

export const Cards = () => {
  const cards = useAppSelector(cardsSelector)
  const cardsTotalCount = useAppSelector(cardsTotalCountSelector)
  const isLoggedIn = useAppSelector(isLoggedInSelector)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  //set params into URL
  const [searchParams, setSearchParams] = useSearchParams()
  //get Single Params From URL
  const searchValue = searchParams.get('cardQuestion')
  const sortCards = searchParams.get('sortCards')
  const cardsPack_id = searchParams.get('cardsPack_id')
  const rows = Number(searchParams.get('pageCount'))
  const pageNumber = Number(searchParams.get('page'))
  //to get params from URL after Question Mark
  const { search } = useLocation()

  const paramsFromUrl = Object.fromEntries(new URLSearchParams(search))

  useEffect(() => {
    if (!isLoggedIn) return
    dispatch(getCards({ ...paramsFromUrl, cardsPack_id }))
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

  const setRowsAndPage = (rowsPerPage: number, pageNumber: number) => {
    setSearchParams({
      ...paramsFromUrl,
      pageCount: rowsPerPage.toString(),
      page: pageNumber.toString(),
    })
  }

  const onAddNewCardHandler = (data: AddNewCardType) => {
    dispatch(
      addNewCard({
        data: { ...data, cardsPack_id },
        attributes: { ...paramsFromUrl, cardsPack_id },
      })
    )
    // dispatch(addNewCard({ ...data, cardsPack_id }, { ...paramsFromUrl, cardsPack_id }))
  }
  const onEditCardHandle = (data: UpdateCardType) => {
    dispatch(updateCard(data, { ...paramsFromUrl, cardsPack_id }))
  }
  const onDeleteCardHandler = (id: string) => {
    dispatch(
      deleteCard({
        id,
        attributes: {
          ...paramsFromUrl,
          cardsPack_id,
        },
      })
    )
    navigate(PATH.CARDS)
  }

  if (cardsPack_id === null) return <Navigate to={PATH.PACKS} />

  return (
    <div className={s.block}>
      <CardsHeader onAddNewCard={onAddNewCardHandler} packId={cardsPack_id} />
      <TableContainer component={Paper}>
        <SearchField
          onSearchName={onSearchNameDebounce}
          searchValue={searchValue ?? ''}
          searchParams={searchParams}
          classname={s.search}
        />
        {cards?.length > 0 ? (
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <CardsTableHead setSort={setSortCards} sort={sortCards ?? '0updated'} />
            <CardsTableBody
              onEditCardHandle={onEditCardHandle}
              onDeleteCardHandler={onDeleteCardHandler}
            />
          </Table>
        ) : (
          <div className={s.container}>
            <span className={s.message}>{'Nothing was found. Change your search parameters'}</span>
          </div>
        )}
      </TableContainer>
      <SuperPagination
        paginationTitle={'Cards per Page'}
        setRowsAndPage={setRowsAndPage}
        totalCount={cardsTotalCount ?? 0}
        rows={rows === 0 ? 4 : rows}
        page={pageNumber === 0 ? 0 : pageNumber - 1}
      />
    </div>
  )
}
