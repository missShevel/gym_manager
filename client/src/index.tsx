import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyles from '@mui/material/GlobalStyles';
import { store } from 'store';
import Router from './Router';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <GlobalStyles
        styles={{
          m: 0,
          p: 0,
          boxSizing: 'border-box',
        }}
      />
      <Router />
    </BrowserRouter>
  </Provider>,
);
