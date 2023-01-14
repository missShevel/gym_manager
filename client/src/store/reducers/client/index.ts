import { createReducer } from '@reduxjs/toolkit';
import initialState from './state';
import { createClient, deleteClient, getClients } from './thunks';

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getClients.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getClients.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.isLoading = false;
    })
    .addCase(getClients.rejected, (state) => {
      state.isLoading = false;
    })
    .addCase(createClient.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(createClient.fulfilled, (state) => {
      state.isLoading = false;
    })
    .addCase(createClient.rejected, (state) => {
      state.isLoading = false;
    })
    .addCase(deleteClient.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(deleteClient.rejected, (state) => {
      state.isLoading = false;
    })
    .addCase(deleteClient.fulfilled, (state) => {
      state.isLoading = false;
    });
});

export default reducer;
