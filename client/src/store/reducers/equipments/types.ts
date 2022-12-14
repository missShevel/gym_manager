import getActionType from 'store';
import { name } from './constants';

const getType = getActionType(name);

const Types = {
    getAll: getType('getAll'),
    create: getType('create'),
    delete: getType('delete'),
};

export default Types;
