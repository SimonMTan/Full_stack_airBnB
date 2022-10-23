import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";

import Home from './components/Home'
import Getspot from './components/Spot'
import Navigation from "./components/Navigation";
import Newspot from "./components/Newspot";
import Account from "./components/Account";
import Editspot from "./components/Editspot";
import Deletespot from './components/Deletespot'
import Createreview from "./components/Review/Createreview_spot";
import SignupFormPage from "./components/SignupFormPage";
import LoginForm from "./components/LoginFormModal/LoginForm";

import * as sessionActions from "./store/session";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path='/' exact>
            <Home />
          </Route>
          <Route path='/spots/createspot'>
            <Newspot />
          </Route>
          <Route path='/account'>
            <Account />
          </Route>
          <Route path='/edit/spots/:spotId'>
            <Editspot />
          </Route>
          <Route path='/delete/spots/:spotId'>
            <Deletespot />
          </Route>
          <Route path='/spots/:spotId' exact>
            <Getspot />
          </Route>
          <Route path='/spots/:spotId/newreview' exact>
            <Createreview />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
