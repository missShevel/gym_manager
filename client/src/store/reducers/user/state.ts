import { User } from 'domains';

export interface UserState {
  data: User | null;
  isLoading: boolean;
}

const initialState: UserState = {
  data: null,
  isLoading: false,
};

export default initialState;
