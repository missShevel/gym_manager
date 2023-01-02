import { createReducer } from '@reduxjs/toolkit';
import initialState from './state';
import { createUser, deleteUser, getUsers } from './thunks';

const reducer = createReducer(initialState, (builder) => {
    builder
        .addCase(getUsers.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getUsers.fulfilled, (state, { payload }) => {
            state.data = payload;
            state.isLoading = false;
        })
        .addCase(createUser.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(createUser.fulfilled, (state) => {
            state.isLoading = false;
        })
        .addCase(deleteUser.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(deleteUser.rejected, (state) => {
            state.isLoading = true;
        })
        .addCase(deleteUser.fulfilled, (state) => {
            state.isLoading = false;
        });
});

export default reducer;
