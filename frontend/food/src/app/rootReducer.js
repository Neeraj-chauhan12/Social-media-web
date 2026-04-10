import {combineReducers} from '@reduxjs/toolkit';

import authReducer from '../features/AuthSlice';
import { authApi } from '../features/api/AuthApi';
import { reelApi } from '../features/api/ReelApi';


export const rootReducer=combineReducers({
    // Add your reducers here
    [authApi.reducerPath]:authApi.reducer,
    [reelApi.reducerPath]:reelApi.reducer,
    auth:authReducer
})