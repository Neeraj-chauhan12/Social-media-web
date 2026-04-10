import {combineReducers} from '@reduxjs/toolkit';
import { AuthApi } from '../features/api/AuthApi';
import authReducer from '../features/AuthSlice';


export const rootReducer=combineReducers({
    // Add your reducers here
    [AuthApi.reducerPath]:AuthApi.reducer,
    auth:authReducer
})