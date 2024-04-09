import { configureStore } from '@reduxjs/toolkit'
import userdata from './user/dataSlice'
export const store = configureStore({
  reducer: {
    userdata : userdata
  },
})