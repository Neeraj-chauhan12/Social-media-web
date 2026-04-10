import { configureStore}from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';
import { AuthApi } from '../features/api/AuthApi';

export const AppStore=configureStore({
    reducer:{rootReducer},
    middleware:(defaultMiddleware)=>defaultMiddleware().concat(AuthApi.middleware),
})

const initializeApp=async()=>{
    await AppStore.dispatch(AuthApi.endpoints.getProfile.initiate());
}
initializeApp();