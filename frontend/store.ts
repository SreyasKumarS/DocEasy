// frontend/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { patientApi } from './src/slices/patientSlice/patientApiSlice'; // Adjust the import path as necessary
import authReducer from './src/slices/patientSlice/patientAuthSlice'; // Ensure this path is correct

const store = configureStore({
  reducer: {
    PatientAuth: authReducer, // Ensure you have this line to include the auth reducer
    [patientApi.reducerPath]: patientApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(patientApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export default store;
