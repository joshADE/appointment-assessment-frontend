import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { setupListeners } from '@reduxjs/toolkit/query';
import { appointmentManagementApi } from './services/api/api';

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [appointmentManagementApi.reducerPath]: appointmentManagementApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger, appointmentManagementApi.middleware),
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)