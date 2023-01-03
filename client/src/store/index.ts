import { configureStore } from '@reduxjs/toolkit';
import EquipmentsReducer from './reducers/equipments';
import UserReducer from './reducers/user';
import UsersReducer from './reducers/users';
import ClientReducer from './reducers/client';

export const store = configureStore({
  reducer: {
    equipment: EquipmentsReducer,
    user: UserReducer,
    users: UsersReducer,
    client: ClientReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export const getStore = () => store;

export type Store = ReturnType<typeof getStore>;
export type State = ReturnType<Store['getState']>;
export type Dispatch = Store['dispatch'];
export type ThunkOptions = {
  state: State;
  dispatch: Dispatch;
};

export default function getActionType(state: string) {
  return (action: string) => `${state}/${action}`;
}
