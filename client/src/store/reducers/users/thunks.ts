/* eslint-disable max-len */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICreateUserData, IUpdateUserData, ROLES } from 'domains';
import UserService from 'services/user';
import Types from './types';

const service = new UserService();

export const getUsers = createAsyncThunk(Types.getAll, async (role: ROLES) => service.getAll(role));

export const getUsersShortlist = createAsyncThunk(Types.getShortlist, async (role: ROLES) => service.getShortlist(role));

export const createUser = createAsyncThunk(Types.create, async (data: ICreateUserData) =>
  service.create(data),
);

export const updateUser = createAsyncThunk(Types.update, async (data: IUpdateUserData) =>
  service.updateById(data),
);

export const deleteUser = createAsyncThunk(Types.delete, async (data: string) =>
  service.deleteById(data),
);

export default {};
