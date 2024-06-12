import {
  useSelector as useReduxSelector,
  type TypedUseSelectorHook,
  useDispatch as useReduxDispatch,
} from 'react-redux';
import { type State, type Dispatch } from '..';

export const useSelector: TypedUseSelectorHook<State> = useReduxSelector;

export const useDispatch = () => useReduxDispatch<Dispatch>();
