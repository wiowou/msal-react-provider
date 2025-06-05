import React, { useContext } from 'react';

import { IMsalContext } from '@azure/msal-react';
import { MsalContexts } from '../msalContexts';

export function useMsalContext(key: string): IMsalContext {
  const context = MsalContexts.get(key);
  if (!context) {
    throw new Error(
      `MsalContext for key "${key}" not found. Ensure that the MSALReactProvider is configured with this key.`,
    );
  }
  return useContext(context);
}
