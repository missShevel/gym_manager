import getActionType from 'store';
import { name } from './constants';

const getType = getActionType(name);

const Types = {
  signIn: getType('sign-in'),
  autoLogin: getType('autoLogin'),
  logout: getType('logout'),
};

export default Types;
