import { User } from 'domains';

export interface UsersState {
  data: User[];
  isLoading: boolean;
}

const initialState: UsersState = {
  data: [],
  isLoading: false,
};

export default initialState;
