import {
  PublicClientApplication,
  EventType,
  AccountInfo,
  Configuration,
} from '@azure/msal-browser';

const instances: Record<string, PublicClientApplication> = {};

export function createMsalInstances(
  msalConfigs: Record<string, Configuration>,
) {
  for (let key in msalConfigs) {
    if (instances[key]) continue;
    const instance = createInstance(msalConfigs[key]);
    instances[key] = instance;
  }
}

export function getMsalInstance(key: string) {
  return instances[key];
}

function createInstance(msalConfig: Configuration) {
  /**
   * MSAL should be instantiated outside of the component tree to prevent it from being re-instantiated on re-renders.
   * For more, visit: https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/getting-started.md
   */
  const instance = new PublicClientApplication(msalConfig);
  // Default to using the first account if no account is active on page load
  if (!instance.getActiveAccount() && instance.getAllAccounts().length > 0) {
    // Account selection logic is app dependent. Adjust as needed for different use cases.
    instance.setActiveAccount(instance.getAllAccounts()[0]);
  }

  // Optional - This will update account state if a user signs in from another tab or window
  instance.enableAccountStorageEvents();

  // Listen for sign-in event and set active account
  instance.addEventCallback((event) => {
    if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
      const account = event.payload;
      instance.setActiveAccount(account as AccountInfo);
    }
  });
  return instance;
}
