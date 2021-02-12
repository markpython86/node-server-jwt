import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login'
import Dash from './pages/Dash'
import AuthComponent from './services/AuthComponent'
import { MainContextProvider } from "./contexts/MainContext";
import { BrowserRouter as Router } from 'react-router-dom';
const App = () => {
  return (
    <>
      <MainContextProvider>
        <Router>
          <Switch>
            <Route exact path='/'>
              <Login />
            </Route>
            <Route path='/home'>
              <AuthComponent>
                <Dash />
              </AuthComponent>
            </Route>
          </Switch>
        </Router>
      </MainContextProvider>
    </>
  );
}

export default App;
