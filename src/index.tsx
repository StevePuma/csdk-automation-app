import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { SisenseContextProvider } from '@sisense/sdk-ui';
import { AiContextProvider } from '@sisense/sdk-ui/ai';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <SisenseContextProvider url={'https://YOUR-SERVER-URL.com'} token={'YOUR-API-TOKEN'}>
      <AiContextProvider>
    <App />
    </AiContextProvider>
    </SisenseContextProvider>
  </React.StrictMode>
);

reportWebVitals();
