import { createReducer } from '@reduxjs/toolkit';
import initialState from './state';
import { createEquipment, getEquipments } from './thunks';

const reducer = createReducer(initialState, (builder) => {
    builder
        .addCase(getEquipments.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getEquipments.fulfilled, (state, { payload }) => {
            state.data = payload;
            state.isLoading = false;
        })
        .addCase(createEquipment.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(createEquipment.fulfilled, (state) => {
            state.isLoading = false;
        });
});

export default reducer;
