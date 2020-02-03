import React from 'react';
import HomePage from './components/pages/HomePage';
import lunchbox from './theme/lunchbox';
import { ThemeProvider } from 'styled-components';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={lunchbox}>
      <HomePage/>
    </ThemeProvider>
  );
}

export default App;
