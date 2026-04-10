import {createSlice} from '@reduxjs/toolkit';


const initialState={
    isAuthenticated:false,
    user:null,
    token:null,
    partner:null,
    partnerToken:null
}

const AuthSlice=createSlice({
    name:"authSlice",
    initialState,
    reducers:{
        UserLogin:(state,action)=>{
            state.isAuthenticated=true;
            state.user=action.payload.user;
            state.token=action.payload.token;
        },
        UserLogout:(state)=>{
            state.isAuthenticated=false;
            state.user=null;
            state.token=null;
        }
    }
})

export const {UserLogin}=AuthSlice.actions;
export default AuthSlice.reducer;