import React from 'react';
import { MsalProvider } from '@azure/msal-react';
import { Configuration } from '@azure/msal-browser';

import { createMsalInstances, getMsalInstance } from './msalInstance';
import { createMsalContexts } from './msalContext';

export interface MSALReactProviderProps {
  msalConfigs: Record<string, Configuration>;
}

export function MSALReactProvider({
  msalConfigs,
  children,
}: React.PropsWithChildren<MSALReactProviderProps>): React.ReactElement {
  createMsalInstances(msalConfigs);
  createMsalContexts(new Set(Object.keys(msalConfigs)));
  // Nest MsalProviders hierarchically, children is innermost
  let nestedProviders = children;
  for (let key in msalConfigs) {
    nestedProviders = (
      <MsalProvider instance={getMsalInstance(key)} key={key}>
        {nestedProviders}
      </MsalProvider>
    );
  }
  return <>{nestedProviders}</>;
}
