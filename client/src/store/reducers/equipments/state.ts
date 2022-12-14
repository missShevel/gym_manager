import { Equipment } from 'domains';

export interface EquipmentState {
  data: Equipment[];
  isLoading: boolean;
}

const initialState: EquipmentState = {
  data: [],
  isLoading: false,
};

export default initialState;
