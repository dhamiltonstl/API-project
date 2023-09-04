import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import SpotDetailsPage from "./components/SpotDetailsPage";
import CreateSpotPage from "./components/CreatSpotPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Switch></Switch>}
      <switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route exact path="/spot/:spotId">
          <SpotDetailsPage />
        </Route>
        <Route exact path="/new-spot">
          <CreateSpotPage />
        </Route>
      </switch>
    </>
  );
}

export default App;
