import { RootState } from 's1-DAL/store'

export const packNameSelector = (state: RootState) => state.cards.cardsData.packName
export const cardsSelector = (state: RootState) => state.cards.cardsData.cards
export const cardsTotalCountSelector = (state: RootState) => state.cards.cardsData.cardsTotalCount
export const packUserIdSelector = (state: RootState) => state.cards.cardsData.packUserId
export const packDeckCoverSelector = (state: RootState) => state.cards.cardsData.packDeckCover
