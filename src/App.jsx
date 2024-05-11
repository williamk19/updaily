import Auth from 'pages/Auth';
import './App.css';
import Home from './pages/Home';
import {
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';

function App() {
  const authorizedRouter = createBrowserRouter([
    {
      path: '/auth',
      element: <Auth />,
    },
    {
      path: '/',
      element: <Home />,
    },
  ]);

  return (
    <div className='App'>
      <RouterProvider router={authorizedRouter} />
    </div>
  );
}

export default App;
