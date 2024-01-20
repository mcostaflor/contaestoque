import React from 'react';

import { createRoot } from 'react-dom/client'
import ContaEstoque from './pages/ContaEstoque';

const root = createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <ContaEstoque />
  </React.StrictMode>
)
 