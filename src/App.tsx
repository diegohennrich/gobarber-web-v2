import React, { FC } from 'react';
import GlobalStyle from './Styles/Global';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';

import { AuthProvider } from './Hooks/AuthContext';

const App: FC = () => (
  <>
    <AuthProvider>
      <SignIn />
    </AuthProvider>
    <GlobalStyle />
  </>
);

export default App;
