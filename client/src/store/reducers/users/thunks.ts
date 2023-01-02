import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICreateUserData, IUpdateUserData, ROLES } from 'domains';
import UserService from 'services/user';
import Types from './types';

const service = new UserService();

export const getUsers = createAsyncThunk(Types.getAll, async (role: ROLES) => {
  try {
    const users = await service.getAll(role);

    return users;
  } catch (e) {
    console.log(e);
  }

  return [];
});

export const createUser = createAsyncThunk(Types.create, async (data: ICreateUserData) => {
  try {
    await service.create(data);
  } catch (e) {
    console.log(e);
  }
});

export const updateUser = createAsyncThunk(Types.update, async (data: IUpdateUserData) => {
  try {
    await service.updateById(data);
  } catch (e) {
    console.log(e);
  }
});

export const deleteUser = createAsyncThunk(Types.delete, async (data: string) => {
  try {
    await service.deleteById(data);
  } catch (e) {
    console.log(e);
  }
});

export default {};
