import { Client } from 'domains';

export interface ClientState {
  data: Client[];
  isLoading: boolean;
}

const initialState: ClientState = {
  data: [],
  isLoading: false,
};

export default initialState;
