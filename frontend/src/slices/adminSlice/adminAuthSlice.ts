import { createSlice } from '@reduxjs/toolkit';

interface Admin {
    id: string;
    name: string;
    email: string;
}

interface AuthState {
    isAuthenticated: boolean;
    user: Admin | null;
    token: string | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    token: null,
};

const authSlice = createSlice({
    name: 'AdminAuth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            console.log("Payload received in setCredentials:", action.payload);

            state.isAuthenticated = true;
            state.user = action.payload.admin; 
            state.token = action.payload.token; 
        },
        clearCredentials: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
        },
    },
});


export const { setCredentials, clearCredentials } = authSlice.actions;


export default authSlice.reducer;
