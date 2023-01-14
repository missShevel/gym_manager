/* eslint-disable max-len */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICreateEquipmentData, IUpdateEquipmentData } from 'domains';
import Types from './types';
import EquipmentsService from '../../../services/equipment';

const service = new EquipmentsService();

export const getEquipments = createAsyncThunk(Types.getAll, async () => service.getAll());

export const createEquipment = createAsyncThunk(Types.create, async (data: ICreateEquipmentData) =>
  service.create(data),
);

export const updateEquipment = createAsyncThunk(Types.update, async (data: IUpdateEquipmentData) =>
  service.updateById(data),
);

export const deleteEquipment = createAsyncThunk(Types.delete, async (data: string) =>
  service.deleteById(data),
);

export default {};
