import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";

import SignupFormPage from "./components/SignupFormPage";
import Home from './components/Home'
import Getspot from './components/Spot'
import Navigation from "./components/Navigation";
import Newspot from "./components/Newspot";
import Account from "./components/Account";
import Editspot from "./components/Editspot";
import Deletespot from './components/Deletespot'

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
          <Route path="/signup" exact>
            <SignupFormPage />
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
          <Route path='/spots/:spotId'>
            <Getspot />
          </Route>
          {/* <Route>
            Sorry! Page not found
          </Route> */}
        </Switch>
      )}
    </>
  );
}

export default App;

// import React, { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { Route, Switch } from "react-router-dom";

// import SignupFormPage from "./components/SignupFormPage";
// import Home from './components/Home'
// import Getspot from './components/Spot'
// import * as sessionActions from "./store/session";
// import Navigation from "./components/Navigation";
// import Createspot from './components/createspot'

// function App() {
//   const dispatch = useDispatch();
//   const [isLoaded, setIsLoaded] = useState(false);
//   useEffect(() => {
//     dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
//   }, [dispatch]);
//   return (
//     <>
//       <Navigation isLoaded={isLoaded} />
//       {isLoaded && (
//         <Switch>
//           <Route path='/' exact>
//             <Home />
//           </Route>
//           <Route path="/signup">
//             <SignupFormPage />
//           </Route>
//           <Route path={'/spots/createspot'}>
//             <Createspot />
//           </Route>
//           <Route path={'/spots/:spotId'}>
//             <Getspot />
//           </Route>
//         </Switch>
//       )}
//     </>
//   );
// }

// export default App;
