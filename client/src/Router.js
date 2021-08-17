import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "./components/screens/HomePage/HomePage";
import PlannerPage from "./components/screens/PlannerPage/PlannerPage";
import Navbar from "./components/utils/Navbar/Navbar";

export default function Router() {

  return (
    <div style={{ marginBottom: 100 }}>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/planner" component={PlannerPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}