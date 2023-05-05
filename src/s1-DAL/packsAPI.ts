import axios from 'axios'

export const instance = axios.create({
  // baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:7542/2.0/'
      : 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true,
})

export const packsAPI = {
  getAllPacks(params: GetPacksType) {
    return instance.get<PackReturnType>('/cards/pack', { params })
  },
  addNewPack(data: AddNewPackType) {
    return instance.post('/cards/pack', { cardsPack: data })
  },
  deletePack(id: string) {
    return instance.delete(`cards/pack?id=${id}`)
  },
  updatePack(data: UpdatePackType) {
    return instance.put('cards/pack', { cardsPack: data })
  },
}

export type PackType = {
  _id: string
  user_id: string
  user_name: string
  deckCover: string
  private: boolean
  name: string
  path: string
  grade: number
  shots: number
  cardsCount: number
  type: string
  rating: number
  created: string
  updated: string
  more_id: string
  __v: number
}

export type PackReturnType = {
  cardPacks: PackType[]
  cardPacksTotalCount: number
  maxCardsCount: number
  minCardsCount: number
  page: number
  pageCount: number
}

//все из этого не обязательно, Partial делает атрибуты необязательными
export type GetPacksType = Partial<{
  packName: string
  min: number
  max: number
  sortPacks: number
  page: number
  pageCount: number
  user_id: string
  block: boolean
}>

export type AddNewPackType = Partial<{
  name: string
  deckCover: string
  private: string
}>

//id обязательно, а все остальное из packtype не обязательно, Pick выбирает обязательный атрибут
export type UpdatePackType = Partial<PackType> & Pick<PackType, '_id'>
