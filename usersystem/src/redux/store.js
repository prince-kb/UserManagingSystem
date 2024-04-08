import { configureStore } from '@reduxjs/toolkit'
import user from './user/userSlice'
import userdata from './user/dataSlice'
export const store = configureStore({
  reducer: {
    user : user,
    userdata : userdata
  },
})