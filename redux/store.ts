import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice'
import errorMessagesReducer from './features/errorSlice';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
//Creates a store that we use to provide the reducers to the application.
export const store = configureStore({
    reducer: {
        authReducer,
        errorMessagesReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector