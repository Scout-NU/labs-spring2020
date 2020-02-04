import React from 'react';
import HomePage from './components/pages/HomePage';
import lunchbox from './theme/lunchbox';
import { ThemeProvider } from 'styled-components';
import { Header } from './components/molecules/Header';
import Footer from './components/molecules/Footer';
import styled from './theme/Theme';

const Site = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;

`

const Content = styled.div`
  flex: 1 0 auto;
  width: 100%;

  &:after {
    content: '\00a0';
    display: block;
    height: 0;
    visibility: hidden;
  }
`

const App: React.FC = () => {
  return (
    <ThemeProvider theme={lunchbox}>
      <Site>
        <Content>

        <Header/>
        <HomePage/>
        </Content>
        <Footer/>
      </Site>
    </ThemeProvider>
  );
}

export default App;
