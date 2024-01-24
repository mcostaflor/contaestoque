import React from 'react';

import './global-styles.css';

import { createRoot } from 'react-dom/client'
import ContaEstoque from './pages/ContaEstoque';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const root = createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <ContaEstoque />
  </React.StrictMode>
)

serviceWorkerRegistration.register();