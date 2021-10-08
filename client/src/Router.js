import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "./components/screens/HomePage/HomePage";
import PlannerPage from "./components/screens/PlannerPage/PlannerPage";
import ResourcesPage from "./components/screens/ResourcesPage/ResourcesPage";
import TeamPage from "./components/screens/TeamPage/TeamPage";
import AboutUsPage from "./components/screens/AboutUsPage/AboutUsPage";
import Navbar from "./components/utils/Navbar/Navbar";

export default function Router() {

  return (
    <div style={{ marginBottom: 100 }}>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/planner" component={PlannerPage} />
          <Route path="/resources" component={ResourcesPage} />
          <Route path="/team" component={TeamPage} />
          <Route path="/aboutus" component={AboutUsPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}