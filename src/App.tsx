import React, { FC } from 'react';
import GlobalStyle from './Styles/Global';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';

const App: FC = () => (
  <>
    <SignIn />
    <GlobalStyle />
  </>
);

export default App;
