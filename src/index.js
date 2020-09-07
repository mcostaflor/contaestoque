import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from './routes';
import { BrowserRouter } from 'react-router-dom';
import NavbarComponent from './components/Navbar';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <NavbarComponent />
      <Routes />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);