// src/store/employeeFormSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    birthdate: '',
};

const employeeFormSlice = createSlice({
    name: 'employeeForm',
    initialState,
    reducers: {
        setFirstName: (state, action) => {
            state.firstName = action.payload;
        },
        setLastName: (state, action) => {
            state.lastName = action.payload;
        },
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        setPhoneNumber: (state, action) => {
            state.phoneNumber = action.payload;
        },
        setBirthdate: (state, action) => {
            state.birthdate = action.payload;
        },
        clearForm: (state) => {
            state.firstName = '';
            state.lastName = '';
            state.email = '';
            state.phoneNumber = '';
            state.birthdate = '';
        },
    },
});

export const {
    setFirstName,
    setLastName,
    setEmail,
    setPhoneNumber,
    setBirthdate,
    clearForm,
} = employeeFormSlice.actions;

export default employeeFormSlice.reducer;
