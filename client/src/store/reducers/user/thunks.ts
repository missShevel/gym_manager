/* eslint-disable max-len */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ISignInData } from 'domains';
import UserService from 'services/user';
import Types from './types';

const service = new UserService();

export const signIn = createAsyncThunk(Types.signIn, async (data: ISignInData) =>
  service.signIn(data),
);

interface IAutoLogin {
  onLoginFail: Function;
  onLoginSuccess?: Function;
}

export const autoLogin = createAsyncThunk(
  Types.autoLogin,
  async ({ onLoginFail, onLoginSuccess }: IAutoLogin) => {
    try {
      const user = await service.me();

      if (onLoginSuccess) onLoginSuccess();

      return user;
    } catch (e) {
      console.log(e);
      onLoginFail();
      throw e;
    }
  },
);

export const logout = createAsyncThunk(Types.logout, async () => service.logout());

export default {};
