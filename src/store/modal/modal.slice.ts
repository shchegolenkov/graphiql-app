import { createSlice } from '@reduxjs/toolkit';

export const modalSlice = createSlice({
  name: 'modal',
  initialState: { isModalActive: false },
  reducers: {
    closeModal: (state) => {
      state.isModalActive = false;
    },
    openModal: (state) => {
      state.isModalActive = true;
    },
  },
});

export const { closeModal, openModal } = modalSlice.actions;
export default modalSlice.reducer;
