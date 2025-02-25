<<<<<<< HEAD
// import React from "react";
// import ReactDOM from "react-dom";
// import { BrowserRouter } from "react-router-dom";
// import App from "./App";

// ReactDOM.render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>,
//   document.getElementById("root")
// );

import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
=======

import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// import './index.css'
>>>>>>> 90302d1 (my intrest updated)

import App from './App';

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
   
      <App />
   
  </StrictMode>
);
