import React, { useState } from 'react'

import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'

import { HeaderType } from 's3-ui/Packs'

type Props<D> = {
  header: HeaderType<D>[]
  setSort: (sortPacks: string) => any
  sortBy?: string
  sortOrderStart: string
}
export type Order = 'asc' | 'desc'
// asc - восходящий 0
// desc- убывающий 1

export const HeadTable = <D extends unknown>({
  header,
  setSort,
  sortBy,
  sortOrderStart,
}: Props<D>) => {
  const [order, setOrder] = useState<Order>(sortOrderStart === '1' ? 'asc' : 'desc')
  const [orderBy, setOrderBy] = useState<keyof D>(sortBy as keyof D)

  const requestSortHandler = (property: keyof D) => {
    const isAsc = orderBy === property && order === 'asc'

    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
    setSort((isAsc ? '0' : '1') + property.toString())
  }

  return (
    <TableHead>
      <TableRow sx={{ backgroundColor: '#EFEFEF' }}>
        {header.map(cell => (
          <TableCell key={cell.id as string}>
            {cell.id === 'empty' ? (
              cell.label
            ) : (
              <TableSortLabel
                hideSortIcon={false}
                active={orderBy === cell.id}
                direction={orderBy === cell.id ? order : 'asc'}
                onClick={() => requestSortHandler(cell.id)}
              >
                {cell.label}
              </TableSortLabel>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}
