export interface ErrorState {
  message: string | null;
}

const initialState: ErrorState = {
  message: null,
};

export default initialState;
