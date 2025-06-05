import React from 'react';
import { MsalProvider } from '@azure/msal-react';
import { Configuration } from '@azure/msal-browser';

import { createMsalInstances, msalInstances } from './msalInstances';
import { createMsalContexts } from './msalContexts';

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
      <MsalProvider instance={msalInstances[key]} key={key}>
        {nestedProviders}
      </MsalProvider>
    );
  }
  return <>{nestedProviders}</>;
}
