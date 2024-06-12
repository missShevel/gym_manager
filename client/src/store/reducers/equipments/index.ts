import { createReducer } from '@reduxjs/toolkit';
import initialState from './state';
import { createEquipment, deleteEquipment, getEquipments } from './thunks';

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getEquipments.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getEquipments.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.isLoading = false;
    })
    .addCase(getEquipments.rejected, (state) => {
      state.isLoading = false;
    })
    .addCase(createEquipment.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(createEquipment.fulfilled, (state) => {
      state.isLoading = false;
    })
    .addCase(createEquipment.rejected, (state) => {
      state.isLoading = false;
    })
    .addCase(deleteEquipment.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(deleteEquipment.rejected, (state) => {
      state.isLoading = false;
    })
    .addCase(deleteEquipment.fulfilled, (state) => {
      state.isLoading = false;
    });
});

export default reducer;
