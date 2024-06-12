import { createAction } from '@reduxjs/toolkit';
import Types from './types';

export default {};

export const setMessage = createAction<string | null>(Types.setError);
