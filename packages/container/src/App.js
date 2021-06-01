import React, { lazy, Suspense, useState, useEffect } from 'react';
import {
  Router,
  BrowserRouter,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { StylesProvider, createGenerateClassName } from '@material-ui/core';

import Header from './components/Header';
import Progress from './components/Progress';
const MarketingAppLazy = lazy(() => import('./components/MarketingApp'));
const AuthAppLazy = lazy(() => import('./components/AuthApp'));
const DashboardAppLazy = lazy(() => import('./components/DashboardApp'));
const generateClassName = createGenerateClassName({ productionPrefix: 'co' });

const history = createBrowserHistory();

const App = () => {
  const [isSignIn, setIsSignedIn] = useState(false);
  //tamo junto
  useEffect(() => {
    if (isSignIn) {
      history.push('/dashboard');
    }
  }, [isSignIn]);
  return (
    <Router history={history}>
      <StylesProvider generateClassName={generateClassName}>
        <div>
          <Header
            onSignOut={() => {
              setIsSignedIn(false);
            }}
            isSignIn={isSignIn}
          />
          <Suspense fallback={<Progress />}>
            <Switch>
              <Route path="/auth">
                <AuthAppLazy onSignIn={() => setIsSignedIn(true)} />
              </Route>
              <Route path="/dashboard">
                {!isSignIn && <Redirect to="/" />}
                <DashboardAppLazy />
              </Route>
              <Route path="/" component={MarketingAppLazy} />
            </Switch>
          </Suspense>
        </div>
      </StylesProvider>
    </Router>
  );
};

export default App;
