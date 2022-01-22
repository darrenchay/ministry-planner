import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "./components/screens/HomePage/HomePage";
import PlannerPage from "./components/screens/PlannerPage/PlannerPage";
import LoginPage from "./components/screens/Login/Login";
import ResourcesPage from "./components/screens/ResourcesPage/ResourcesPage";
import TeamPage from "./components/screens/TeamPage/TeamPage";
import AboutUsPage from "./components/screens/AboutUsPage/AboutUsPage";
import ProfilePage from "./components/screens/ProfilePage/ProfilePage";
import Navbar from "./components/utils/Navbar/Navbar";
import Auth0ProviderWithHistory from "./components/utils/Auth/Auth";
import ProtectedRoute from "./components/utils/Auth/ProtectedRoute";

export default function Router() {

    return (
        <div>
            <BrowserRouter>
                <Auth0ProviderWithHistory>
                    <Navbar />
                    <Switch>
                        <Route path="/" exact component={LoginPage} />
                        <ProtectedRoute path="/home" exact component={HomePage} />
                        <ProtectedRoute path="/planner" component={PlannerPage} />
                        <ProtectedRoute path="/resources" component={ResourcesPage} />
                        <ProtectedRoute path="/team" component={TeamPage} />
                        <ProtectedRoute path="/aboutus" component={AboutUsPage} />
                        <ProtectedRoute path="/profile" component={ProfilePage} />
                    </Switch>
                </Auth0ProviderWithHistory>

            </BrowserRouter>
        </div>
    );
}