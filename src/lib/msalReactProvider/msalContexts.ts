import * as React from 'react';
import {
  stubbedPublicClientApplication,
  Logger,
  InteractionStatus,
} from '@azure/msal-browser';
import { IMsalContext } from '@azure/msal-react';
import { Consumer } from 'react';

export const MsalContexts = new Map<string, React.Context<IMsalContext>>();
export const MsalConsumers = new Map<string, Consumer<IMsalContext>>();

export function createMsalContexts(keys: Set<string>) {
  for (const key of keys) {
    const defaultMsalContext: IMsalContext = {
      instance: stubbedPublicClientApplication,
      inProgress: InteractionStatus.None,
      accounts: [],
      logger: new Logger({}),
    };
    const MsalContext = React.createContext<IMsalContext>(defaultMsalContext);
    MsalContexts.set(key, MsalContext);
    MsalConsumers.set(key, MsalContext.Consumer);
  }
}
