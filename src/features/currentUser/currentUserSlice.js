import {createSlice} from '@reduxjs/toolkit'
import userImage from './../../assets/images/avatars/image-juliusomo.png'
const initialState={
        "image": { 
          "png": userImage,
          "webp": "./images/avatars/image-juliusomo.webp"
        },
        "username": "juliusomo"
}

const currentUserSlice=createSlice({
    name:'currentUser',
    initialState,
    reducers:{
      
    }
})

export const selectCurrentUser=(state)=> state.currentUser;
export default currentUserSlice.reducer;