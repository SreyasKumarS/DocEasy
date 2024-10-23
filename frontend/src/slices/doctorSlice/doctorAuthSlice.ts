import { createSlice } from '@reduxjs/toolkit';

interface Doctor {
    id: string;
    name: string;
    email: string;
}

interface AuthState {
    isAuthenticated: boolean;
    user: Doctor | null;
    token: string | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    token: null,
};
const authSlice = createSlice({
    name: 'DoctorAuth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload.doctor; 
            
        },
        clearCredentials: (state) => {
            state.isAuthenticated = false;
            state.user = null;       
        },
    },
});

export const { setCredentials, clearCredentials } = authSlice.actions;


export default authSlice.reducer;
