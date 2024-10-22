
import { createSlice } from '@reduxjs/toolkit';

interface Patient {
    id: string;
    name: string;
    email: string;
}

interface AuthState {
    isAuthenticated: boolean;
    user: Patient | null;
    token: string | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    token: null,
};

const authSlice = createSlice({
    name: 'PatientAuth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            console.log("Payload received in setCredentials:", action.payload); 

            state.isAuthenticated = true;
            state.user = action.payload.patient;
            state.token = action.payload.token;
            localStorage.setItem('token', action.payload.token); 
        },
        clearCredentials: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
            localStorage.removeItem('token'); 
        },
    },
});


export const { setCredentials, clearCredentials } = authSlice.actions;


export default authSlice.reducer;
