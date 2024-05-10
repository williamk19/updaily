import Auth from 'pages/Auth';
import './App.css';
import Home from './pages/Home';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import useAuthStore from 'store/useAuthStore';

function App() {
  const { token, user } = useAuthStore((state) => ({
    token: state.token,
    user: state.user,
  }));

  // const router =
  //   token !== null && user !== null
  //     ? createBrowserRouter([
  //         {
  //           path: '/',
  //           element: <Home />,
  //         },
  //       ])
  //     : createBrowserRouter([
  //         {
  //           path: '/auth',
  //           element: <Auth />,
  //         },
  //       ]);
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/auth',
      element: <Auth />,
    },
  ]);

  return (
    <div className='App'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
