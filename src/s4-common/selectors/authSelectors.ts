import { RootState } from 's1-DAL/store'

export const isLoggedInSelector = (state: RootState) => state.auth.isLoggedIn
export const userIdSelector = (state: RootState) => state.auth.profile._id
export const isCreateNewPasswordSelector = (state: RootState) => state.auth.isCreateNewPassword
export const isSendedEmailSelector = (state: RootState) => state.auth.isSendedEmail
export const userInfoSelector = (state: RootState) => state.auth.profile
export const avatarSelector = (state: RootState) => state.auth.profile.avatar
export const userNameSelector = (state: RootState) => state.auth.profile.name
