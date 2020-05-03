import React, { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';

import GlobalStyle from './Styles/Global';
import Routes from './Routes';

import AppProvider from './Hooks';

const App: FC = () => (
  <BrowserRouter>
    <AppProvider>
      <Routes />
    </AppProvider>

    <GlobalStyle />
  </BrowserRouter>
);

export default App;
