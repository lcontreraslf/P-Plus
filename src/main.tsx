import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';   // <-- añadido
import App from '@/App';
import '@/index.css';

const rootElement = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <HelmetProvider>          {/* <-- añadido */}
      <App />
    </HelmetProvider>
  </React.StrictMode>
);
