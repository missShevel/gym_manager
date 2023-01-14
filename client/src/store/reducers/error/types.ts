import getActionType from 'store';
import { name } from './constants';

const getType = getActionType(name);

const Types = {
  setError: getType('setError'),
};

export default Types;
