/* eslint-disable max-len */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICreateClientData, IUpdateClientData } from 'domains';
import Types from './types';
import ClientsService from '../../../services/client';

const service = new ClientsService();

export const getClients = createAsyncThunk(Types.getAll, () => service.getAll());

export const createClient = createAsyncThunk(Types.create, (data: ICreateClientData) =>
  service.create(data),
);

export const updateClient = createAsyncThunk(Types.update, (data: IUpdateClientData) =>
  service.updateById(data),
);

export const deleteClient = createAsyncThunk(Types.delete, (data: string) =>
  service.deleteById(data),
);

export default {};
