import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import SpotDetailsPage from "./components/SpotDetailsPage";
import CreateSpotPage from "./components/CreatSpotPage";
import ManageSpotsPage from "./components/ManageSpotsPage";
import UpdateSpotPage from "./components/UpdateSpotPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded &&
        <Switch>
          <Route exact path="/">
            <div className="landing-page">
              <div id="landing-page">
                <LandingPage />
              </div>
            </div>
          </Route>
          <Route exact path="/spots">
            <CreateSpotPage />
          </Route>
          <Route exact path="/spots/current">
            <div className="landing-page">
              <div id="landing-page">
                <ManageSpotsPage />
              </div>
            </div>
          </Route>
          <Route exact path="/spots/:spotId/edit">
            <UpdateSpotPage />
          </Route>
          <Route exact path="/spots/:spotId">
            <SpotDetailsPage />
          </Route>
        </Switch>}


    </>
  );
}

export default App;
