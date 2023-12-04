import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./user/userSlice";
import { registerNumberSlice } from "./user/registerNumbersSlice";

export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        userNumbers: registerNumberSlice.reducer
    }
})