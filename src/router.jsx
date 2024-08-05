import { createBrowserRouter } from 'react-router-dom';
import Layout from './routes/Layout';
import App from './routes/App';
import ErrorPage from './routes/ErrorPage';
import Store from './routes/store';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <App />
      },
      {
        path: 'store',
        element: <Store />
      }
    ],
    errorElement: (
      <Layout>
        <ErrorPage />
      </Layout>
    )
  }
]);

export default router;
