// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import employeeFormReducer from './employeeFormSlice';

export const store = configureStore({
    reducer: {
        employeeForm: employeeFormReducer,
    },
});
