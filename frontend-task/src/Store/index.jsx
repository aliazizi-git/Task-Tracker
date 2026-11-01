import { configureStore } from "@reduxjs/toolkit";
import auth from './Slices/authSlice'
const store = configureStore({
    reducer:{
        auth,
    }
})
export default store