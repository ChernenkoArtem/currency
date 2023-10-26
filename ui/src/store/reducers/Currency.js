import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currencys: [], // {currenctAmount: number, name: string, image: string, values: [{time: string, amount: string}]}
  currentEditValue: null, //{time: string, amount: string, _id: number}
};

export const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setEditValue(state, action) {
      console.log('reducer', action.payload);
      state.currentEditValue = action.payload;
    },
  },
});

export default currencySlice.reducer;
