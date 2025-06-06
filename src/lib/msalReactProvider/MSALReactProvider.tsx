import React, { PropsWithChildren } from 'react';
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
}: PropsWithChildren<MSALReactProviderProps>) {
  createMsalInstances(msalConfigs);
  createMsalContexts(new Set(Object.keys(msalConfigs)));
  // Nest MsalProviders hierarchically, children is innermost
  let nestedProviders = <>{children}</>;
  for (let key in msalConfigs) {
    const instance = msalInstances.get(key);
    if (!instance) {
      throw new Error(`MSAL instance for key "${key}" not found.`);
    }
    nestedProviders = (
      <MsalProvider instance={instance} key={key}>
        {nestedProviders}
      </MsalProvider>
    );
  }
  return <>{nestedProviders}</>;
}
