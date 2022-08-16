import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));

const domain = process.env.ISSUER_BASE_URL;
const clientId = process.env.CLIENT_ID;
const redirectUri = process.env.CALLBACK_URL;

root.render(
  <BrowserRouter>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={redirectUri}
    >
      <App />
    </Auth0Provider>
  </BrowserRouter>
);
