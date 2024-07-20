
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
import Home from './components/Home/Home';
import NewSpotForm from './components/NewSpotForm/NewSpotForm';
import UpdateSpotForm from './components/UpdateSpotForm/UpdateSpotForm';
import ManageSpots from './components/ManageSpots/ManageSpots';

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
        {isLoaded && <Outlet />}
    </>
  );
}



const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/spots/:id',
        element: <SpotDetails />
      },
      {
        path: '/spots/new',
        element: <NewSpotForm />
      },
      {
        path: '/spots/:id/update',
        element: <UpdateSpotForm />
      },
      {
        path: "/spots/current",
        element: <ManageSpots />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
