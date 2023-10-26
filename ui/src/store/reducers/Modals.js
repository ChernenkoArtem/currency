import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currencyCreate: false,
  currencyValusesCreate: false,
  currencyValusesEdit: false,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openCreateModal: (state) => {
      state.currencyCreate = true;
    },
    closeCreateModal: (state) => {
      state.currencyCreate = false;
    },
    openEditValueModal: (state) => {
      state.currencyValusesEdit = true;
    },
    closeEditValueModal: (state) => {
      state.currencyValusesEdit = false;
    },
    openCreateValuesModal: (state) => {
      state.currencyValusesCreate = true;
    },
    closeCreateValuesModal: (state) => {
      state.currencyValusesCreate = false;
    },
  },
});

export default modalSlice.reducer;
