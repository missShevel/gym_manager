import { createReducer } from '@reduxjs/toolkit';
import initialState from './state';
import * as Actions from './actions';

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(Actions.setMessage, (state, { payload }) => {
    state.message = payload;
  });
});

export default reducer;
