import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { appStore, persistor } from './utils/appStore';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './components/HomePage';
import ModulePage from './components/ModulePage';
import PerformanceTiming from './components/PerformanceTiming';
import UseCaseDetails from './components/UseCaseDetails';

const root = ReactDOM.createRoot(document.getElementById('root'));
const bodyContainerRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      /*{
        path: "/compare",
        element: <ComparePage />,
      },*/
      {
        path: "/:moduleName",
        element: <ModulePage />, // Add the dynamic route
      },
      {
        path: "/:moduleName/performancetiming",
        element: <PerformanceTiming />, // Add the PerformanceTiming route with moduleName
      },
      {
        path: "/use-case-details",
        element: <UseCaseDetails />, // Add the UseCaseDetails
      }
    ],
  },
]);
root.render(
  <Provider store={appStore}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={bodyContainerRouter}>
        <App />
      </RouterProvider>
    </PersistGate>
  </Provider>
);
