import { configureStore}from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';
import { authApi } from '../features/api/AuthApi';
;

export const AppStore=configureStore({
    reducer:rootReducer,
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(authApi.middleware),
})

const initializeApp=async()=>{
    await AppStore.dispatch(authApi.endpoints.getProfile.initiate({},{forceRefetch:true}));
}
initializeApp();