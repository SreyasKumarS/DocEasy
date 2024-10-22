// store.js (or wherever you configure your Redux store)

import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../frontend/src/slices/apliSlice'; // Adjust the path as necessary
import patientReducer from '../frontend/src/slices/patientSlice/patientAuthSlice';
import doctorReducer from '../frontend/src/slices/doctorSlice/doctorAuthSlice';
import adminReducer from '../frontend/src/slices/adminSlice/adminAuthSlice';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer, 
    PatientAuth: patientReducer,                   
    DoctorAuth: doctorReducer,
    AdminAuth: adminReducer                   
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware), 
});


export type RootState = ReturnType<typeof store.getState>;
export default store;
