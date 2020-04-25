import React from 'react';
import HomePage from './connectors/pages/ConnectedHomePage';
import lunchbox from './styles/theme/lunchbox';
import { ThemeProvider } from 'styled-components';
import { Header } from './components/organisms/Header';
import ProfilePage from './connectors/pages/ConnectedProfilePage';
import Footer from './components/organisms/Footer';
import styled from './styles/theme/Theme';
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import SearchPage from './connectors/pages/ConnectedSearchPage';
import NotFoundPage from './components/pages/404';
import { homePageRoute, homeRedirectRoute, searchPageRoute, profileRoute, faqPageRoute, conversationGuideRoute } from './var/routes';
import FAQPage from './connectors/pages/ConnectedFAQPage';
import ConversationGuide from './connectors/pages/ConnectedConversationGuide';


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
    <Router>
      <ThemeProvider theme={lunchbox}>
        <Site>
          <Content>
            <Header/>
            <Switch>
              <Route path={`${profileRoute}/:id`} component={ProfilePage}/>
              <Route path={searchPageRoute} component={SearchPage}/>
              <Route exact path={homePageRoute} component={HomePage}/>
              <Route exact path={homeRedirectRoute}>
                <Redirect to={homePageRoute}/>
              </Route>
              <Route exact path={faqPageRoute} component={FAQPage}/>
              <Route exact path={conversationGuideRoute} component={ConversationGuide}/>
              <Route path="*" component={NotFoundPage}/>
            </Switch>
          </Content>
          <Footer/>
        </Site>
      </ThemeProvider>
    </Router>
  );
}

export default App;
