import React from 'react'
import { createRoot } from 'react-dom/client'

import App from './App'

//import { MSALReactProvider} from '@bippo-libs/msal-react-provider';

import { MSALReactProvider } from '../../dist'

// Wrap app rendering so we can wait for the mock API to initialize
async function start() {
  const root = createRoot(document.getElementById('root')!)
  const msalConfig = {
    auth: {
        clientId: 'Enter_the_Application_Id_Here', // This is the ONLY mandatory field that you need to supply.
        authority: 'https://Enter_the_Tenant_Subdomain_Here.ciamlogin.com/', // Replace the placeholder with your tenant subdomain
        redirectUri: '/', // You must register this URI on Microsoft Entra admin center/App Registration. Defaults to window.location.origin
        postLogoutRedirectUri: '/', // Indicates the page to navigate after logout.
    },
};
  const input = {internal: msalConfig}
  root.render(
    <React.StrictMode>
      <App />
      <MSALReactProvider msalConfigs={input} >
      </MSALReactProvider>
    </React.StrictMode>,
  )
}
start()
