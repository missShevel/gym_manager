import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICreateClientData, IUpdateClientData } from 'domains';
import Types from './types';
import ClientsService from '../../../services/client';

const service = new ClientsService();

export const getClients = createAsyncThunk(Types.getAll, async () => {
  try {
    const clients = await service.getAll();

    return clients;
  } catch (e) {
    console.log(e);
  }

  return [];
});

export const createClient = createAsyncThunk(
  Types.create,
  async (data: ICreateClientData) => {
    try {
      await service.create(data);
    } catch (e) {
      console.log(e);
    }
  },
);

export const updateClient = createAsyncThunk(
  Types.update,
  async (data: IUpdateClientData) => {
    try {
      await service.updateById(data);
    } catch (e) {
      console.log(e);
    }
  },
);

export const deleteClient = createAsyncThunk(Types.delete, async (data: string) => {
  try {
    await service.deleteById(data);
  } catch (e) {
    console.log(e);
  }
});

export default {};
