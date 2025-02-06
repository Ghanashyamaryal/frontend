import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./Slice"

const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

export default store;
