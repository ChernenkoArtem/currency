import { createBrowserRouter } from 'react-router-dom';
import CurrencyPage from '../features/Currency/Currency-page';
import Layout from '../features/Layout/Layout';
import App from '../App';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Layout />,
      },
      {
        path: 'currency/:name',
        element: <CurrencyPage />,
      },
    ],
  },
]);
