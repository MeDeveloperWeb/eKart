import { createBrowserRouter } from 'react-router-dom';
import Layout from './routes/Layout';
import App from './routes/App';
import ErrorPage from './routes/ErrorPage';
import Store from './routes/store';
import ProductDescription from './routes/store/[productId]';

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
        path: 'store/',
        children: [
          {
            index: true,
            element: <Store />
          },
          {
            path: ':productId',
            element: <ProductDescription />
          }
        ]
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
