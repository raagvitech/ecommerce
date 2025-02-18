// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

import React from "react";
import { createRoot } from 'react-dom/client'
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store.jsx";
import App from "./App.jsx";
import "./index.css";
import AppRoutes from "./routes/index.jsx";
import { PersistGate } from "redux-persist/integration/react";


createRoot(document.getElementById('root')).render(

  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>
        <AppRoutes />
      </React.StrictMode>
    </PersistGate>
  </Provider>
);

