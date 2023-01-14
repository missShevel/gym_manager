import getActionType from 'store';
import { name } from './constants';

const getType = getActionType(name);

const Types = {
  getAll: getType('getAll'),
  create: getType('create'),
  update: getType('update'),
  delete: getType('delete'),
};

export default Types;
