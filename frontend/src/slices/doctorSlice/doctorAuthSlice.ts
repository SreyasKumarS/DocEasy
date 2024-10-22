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

// Create the authentication slice for doctor
const authSlice = createSlice({
    name: 'DoctorAuth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            console.log("Payload received in setCredentials:", action.payload);

            state.isAuthenticated = true;
            state.user = action.payload.doctor; // Store doctor details
            state.token = action.payload.token;
            localStorage.setItem('token', action.payload.token); // Store the token in local storage
        },
        clearCredentials: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
            localStorage.removeItem('token'); // Clear the token from local storage
        },
    },
});

// Export the actions
export const { setCredentials, clearCredentials } = authSlice.actions;

// Export the reducer
export default authSlice.reducer;
