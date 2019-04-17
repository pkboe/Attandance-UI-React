import { CssBaseline } from '@material-ui/core';
import React from 'react';
import { UserProvider } from './Hooks/UseUser';
import Home from './Views/Home';

function App() {
  return (
    <div>
      <CssBaseline />
      <UserProvider>
        <Home />
      </UserProvider>
    </div>
  );
}

export default App;
