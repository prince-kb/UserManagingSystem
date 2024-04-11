import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import App from './App';
import Users from './components/Users/Users'
import Teams from './components/Teams/Teams';
// import { store } from './redux/store';
// import {Provider} from 'react-redux'

const router = createBrowserRouter([
  {
    path : "",
    element : <App/>,
    children : [
      {
        path : "/",
        element : <Users/>,
      },
      {
        path : "users",
        element : <Users/>
      },
      {
        path : "teams",
        element : <Teams/>
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
    <RouterProvider router={router}/>
    {/* </Provider> */}
  </React.StrictMode>
);

reportWebVitals();
