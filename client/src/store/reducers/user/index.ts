import { createReducer } from '@reduxjs/toolkit';
import initialState from './state';
import { autoLogin, logout, signIn } from './thunks';

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(signIn.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(signIn.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.isLoading = false;
    })
    .addCase(autoLogin.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(autoLogin.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.isLoading = false;
    })
    .addCase(logout.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(logout.fulfilled, (state) => {
      state.data = null;
      state.isLoading = false;
    });
});

export default reducer;
