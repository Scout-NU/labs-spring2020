import React from 'react';
import GlobalStyles from './components/theme/Global';
import { HomePage } from './components/pages/HomePage';

const App: React.FC = () => {
  return (
    <>
      <GlobalStyles/>
      <HomePage/>
    </>
  );
}

export default App;
