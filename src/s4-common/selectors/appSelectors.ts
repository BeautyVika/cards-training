import { RootState } from 's1-DAL/store'

export const appStatusSelector = (state: RootState) => state.app.status
