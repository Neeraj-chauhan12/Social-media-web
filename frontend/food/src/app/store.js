import { configureStore}from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';
import { authApi } from '../features/api/AuthApi';
import { reelApi } from '../features/api/ReelApi';
;

export const AppStore=configureStore({
    reducer:rootReducer,
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(authApi.middleware,reelApi.middleware),
})

const initializeApp=async()=>{
    await AppStore.dispatch(authApi.endpoints.getProfile.initiate({},{forceRefetch:true}));
}
initializeApp();