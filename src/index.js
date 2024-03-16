import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter,RouterProvider} from "react-router-dom";
import { Provider } from 'react-redux';
import store from './app/app';

import HomePage from './Component/Page/HomePage';
import Fleet from './Component/Page/Fleet';
import AccountsPage from './Component/Page/AccountsPage';
import AboutPage from './Component/Page/AboutPage';
import ContactPage from './Component/Page/ContactPage';
import BookingPage from './Component/Page/BookingPage';
import Login from './Component/Page/Login';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/fleet",
    element: <Fleet />,
  },
  {
    path: '/booking',
    element: <BookingPage/>
  },
  {
    path: '/Accounts',
    element: <AccountsPage />
  },
  {
    path: '/About',
    element: <AboutPage />
  },
  {
    path: '/Contacts',
    element: <ContactPage />
  },
  {
    path: '/LogIn',
    element: <Login />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <NavBar/> */}
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
