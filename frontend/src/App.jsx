
import Navigation from './components/Navigation/Navigation';
// frontend/src/App.jsx

import "./App.css";

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
//import Navigation from './components/Navigation';
import * as sessionActions from './store/session';

// ----
// Lets put Components here
import SpotDetails from './components/Spots/SpotsDetails/SpotDetails';

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <div id='body'>
        {isLoaded && <Outlet />}
      </div>
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <h1>Welcome!</h1>
      },
      {
        path: '/spots/:id',
        element: <SpotDetails />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
