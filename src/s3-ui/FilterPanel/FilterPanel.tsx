import React from 'react'

import FilterAltOffIcon from '@mui/icons-material/FilterAltOff'
import Button from '@mui/material/Button'

import s from './FilterPanel.module.scss'
import { SuperRange } from './SuperRange/SuperRange'
import { SwitchButton } from './SwitchButton/SwitchButton'

import { useAppSelector } from 's1-DAL/store'
import { appStatusSelector } from 's4-common'

type FilterPanelType = {
  minSearchCardsNumber: number
  maxSearchCardsNumber: number
  maxCardsValue: number
  showMyPacks: () => void
  showAllPacks: () => void
  resetFilters: () => void
  onChangeSlider: (min: number, max: number) => void
  searchId: string
}

export const FilterPanel = (props: FilterPanelType) => {
  const appStatus = useAppSelector(appStatusSelector)

  return (
    <div className={s.mainContainer}>
      <div className={s.container}>
        <span className={s.text}>Show packs cards</span>
        <SwitchButton
          showMyPacks={props.showMyPacks}
          showAllPacks={props.showAllPacks}
          searchId={props.searchId}
        />
      </div>

      <div className={s.container}>
        <span className={s.text}>Number of cards</span>
        <SuperRange
          min={props.minSearchCardsNumber}
          max={props.maxSearchCardsNumber}
          maxValue={props.maxCardsValue}
          setToUrlCardValues={props.onChangeSlider}
        />
      </div>

      <Button
        sx={{
          width: '40px',
          height: '36px',
          background: '#E8E8E8',
        }}
        type={'button'}
        variant={'outlined'}
        onClick={props.resetFilters}
        disabled={appStatus === 'loading'}
      >
        <FilterAltOffIcon />
      </Button>
    </div>
  )
}
