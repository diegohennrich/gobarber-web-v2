import React, { FC } from 'react';

import { ToastProvider } from './Toast';
import { AuthProvider } from './Auth';

const AppProvider: FC = ({ children }) => (
  <AuthProvider>
    <ToastProvider>{children}</ToastProvider>
  </AuthProvider>
);

export default AppProvider;
