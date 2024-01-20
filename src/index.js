import React from 'react';

import './global-styles.css';

import { createRoot } from 'react-dom/client'
import ContaEstoque from './pages/ContaEstoque';

const root = createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <ContaEstoque />
  </React.StrictMode>
)
 