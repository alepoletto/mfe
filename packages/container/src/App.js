import React, { lazy, Suspense, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core';

import Header from './components/Header';
import Progress from './components/Progress';
const MarketingAppLazy = lazy(() => import('./components/MarketingApp'));
const AuthAppLazy = lazy(() => import('./components/AuthApp'));
const generateClassName = createGenerateClassName({ productionPrefix: 'co' });

const App = () => {
  const [isSignIn, setIsSignedIn] = useState(false);
  //tamo junto
  return (
    <BrowserRouter>
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
              <Route path="/" component={MarketingAppLazy} />
            </Switch>
          </Suspense>
        </div>
      </StylesProvider>
    </BrowserRouter>
  );
};

export default App;
