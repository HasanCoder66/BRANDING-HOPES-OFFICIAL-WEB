import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
    isLoading : false,
    user : null,
    // token :  null 
    error : '',
    // error : false,
};

const authSlice  = createSlice({
    name : 'authSlice',
    initialState,
    reducers : {
        loginPending : (state) => {
            state.isLoading = true;
        },

        loginSuccess: (state, {payload}) => {
            state.isLoading = false;
            state.user = payload;
            // state.token = payload.token
        },
        
        loginFailed: (state, {payload}) => {
            state.isLoading = false;
            // state.error = true  
            state.error = payload 
        },
        
        logout: (state) => {
            state.isLoading = false;
            state.user = null;
            state.error = false;
        },

        signupPending : (state) => {
            state.isLoading = true;
        },

        signupSuccess : (state, {payload}) => {
            state.isLoading = false;
        },

        signupFailed : (state, {payload}) => {
            state.isLoading = false;
            state.error =  payload.message
        },
    }
});

const {reducer , actions } = authSlice;

export const { loginPending , loginFailed , loginSuccess , logout , signupFailed , signupPending , signupSuccess} = actions;


export default reducer;
