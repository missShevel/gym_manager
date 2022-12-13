import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICreateEquipmentData } from 'domains';
import Types from './types';
import EquipmentsService from '../../../services/equipment';

const service = new EquipmentsService();

export const getEquipments =
    createAsyncThunk(Types.getAll, async () => {
    try {
        const equipments = await service.getAll();

        return equipments;
    } catch (e) {
        console.log(e);
    }

    return [];
});

export const createEquipment =
    createAsyncThunk(Types.create, async (data: ICreateEquipmentData) => {
    try {
        await service.create(data);
    } catch (e) {
        console.log(e);
    }
});

export default {};
