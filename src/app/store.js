import { configureStore } from "@reduxjs/toolkit";
import currentUserReducer from './../features/currentUser/currentUserSlice'
import commentsReducer from './../features/comments/commentsSlice'

export const store=configureStore({
    reducer:{
      currentUser:currentUserReducer,
      comments:commentsReducer,
    }
})