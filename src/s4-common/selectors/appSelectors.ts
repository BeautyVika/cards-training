import { RootState } from 's1-DAL/store'

export const appStatusSelector = (state: RootState) => state.app.status
export const isInitializedSelector = (state: RootState) => state.app.isInitialized
