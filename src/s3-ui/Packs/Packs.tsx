import React, { useEffect } from 'react'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import { useLocation, useSearchParams } from 'react-router-dom'

import { FilterPanel } from '../FilterPanel/FilterPanel'
import { AddPackModal } from '../Modals'
import { SuperPagination } from '../Pagination/Pagination'

import s from './Packs.module.scss'
import { PacksTableBody } from './PacksTableBody'
import { PacksTableHead } from './PacksTableHead'

import { AddNewPackType, UpdatePackType } from 's1-DAL/packsAPI'
import { useAppDispatch, useAppSelector } from 's1-DAL/store'
import { addNewPack, deletePack, getPacks, updatePack } from 's2-BLL/packSlice'
import { isLoggedInSelector, SearchField, userIdSelector } from 's4-common'
import {
  maxCardsValueSelector,
  packsSelector,
  packsTotalCountSelector,
} from 's4-common/selectors/packsSelectors'

export const Packs = () => {
  const packs = useAppSelector(packsSelector)
  const packsTotalCount = useAppSelector(packsTotalCountSelector)
  const userId = useAppSelector(userIdSelector)
  const maxCardsValue = useAppSelector(maxCardsValueSelector)
  const isLoggedIn = useAppSelector(isLoggedInSelector)

  const dispatch = useAppDispatch()

  //set params into URL
  const [searchParams, setSearchParams] = useSearchParams()
  //get Single Params From URL
  const minSearchCardsNumber = Number(searchParams.get('min'))
  const maxSearchCardsNumber = Number(searchParams.get('max'))
  const rows = Number(searchParams.get('pageCount'))
  const pageNumber = Number(searchParams.get('page'))
  const searchValue = searchParams.get('packName')
  const sortPacks = searchParams.get('sortPacks')
  const searchId = searchParams.get('user_id')

  //to get params from URL after Question Mark
  const { search } = useLocation()
  const paramsFromUrl = Object.fromEntries(new URLSearchParams(search))

  useEffect(() => {
    if (!isLoggedIn) return
    dispatch(getPacks(paramsFromUrl))
  }, [searchParams, isLoggedIn])

  const showMyPacks = () => {
    setSearchParams({ ...paramsFromUrl, user_id: userId })
  }
  const showAllPacks = () => {
    const param = searchParams.get('user_id')

    if (param) {
      searchParams.delete('user_id')
      setSearchParams(searchParams)
    }
  }
  const resetFilters = () => {
    setSearchParams({})
  }

  const setRowsAndPage = (rowsPerPage: number, pageNumber: number) => {
    setSearchParams({
      ...paramsFromUrl,
      pageCount: rowsPerPage.toString(),
      page: pageNumber.toString(),
    })
  }
  const onChangeCardValues = (min: number, max: number) => {
    setSearchParams({ ...paramsFromUrl, min: min.toString(), max: max.toString() })
  }
  const setSortPacks = (sortPacks: string) => {
    setSearchParams({
      ...paramsFromUrl,
      sortPacks,
    })
  }

  const onDeletePackHandle = (id: string) => {
    dispatch(deletePack(id, paramsFromUrl))
  }

  const onSearchNameDebounce = (value: string) => {
    setSearchParams({ ...paramsFromUrl, packName: value })
  }

  const onAddPackHandle = (data: AddNewPackType) => {
    dispatch(addNewPack(data, paramsFromUrl))
  }

  const onEditPackHandle = (data: UpdatePackType) => {
    dispatch(updatePack(data, paramsFromUrl))
  }

  return (
    <div className={s.block}>
      <div className={s.header}>
        <div className={s.title}>Packs list</div>
        <AddPackModal onAddHandle={onAddPackHandle} />
      </div>
      <TableContainer component={Paper}>
        <div className={s.filterContainer}>
          <SearchField
            onSearchName={onSearchNameDebounce}
            searchValue={searchValue ?? ''}
            classname={s.search}
            searchParams={searchParams}
          />
          <FilterPanel
            minSearchCardsNumber={minSearchCardsNumber}
            maxSearchCardsNumber={maxSearchCardsNumber}
            showAllPacks={showAllPacks}
            showMyPacks={showMyPacks}
            resetFilters={resetFilters}
            onChangeSlider={onChangeCardValues}
            maxCardsValue={maxCardsValue}
            searchId={searchId ?? ''}
          />
        </div>

        {packs?.length > 0 ? (
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <PacksTableHead sort={sortPacks ?? '0updated'} setSort={setSortPacks} />
            <PacksTableBody
              onDeletePackHandle={onDeletePackHandle}
              onEditPackHandle={onEditPackHandle}
            />
          </Table>
        ) : (
          <div className={s.container}>
            <span className={s.message}>{'Nothing was found. Change your search parameters'}</span>
          </div>
        )}
      </TableContainer>

      <SuperPagination
        paginationTitle={'Packs per Page'}
        setRowsAndPage={setRowsAndPage}
        totalCount={packsTotalCount ?? 0}
        rows={rows === 0 ? 4 : rows}
        page={pageNumber === 0 ? 0 : pageNumber - 1}
      />
    </div>
  )
}
