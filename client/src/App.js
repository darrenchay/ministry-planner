import React from "react";
import "./App.css";
import Footer from "./components/utils/Footer/Footer";
import Router from "./Router";
import { StylesProvider } from '@material-ui/core/styles';

function App() {
    document.title = "Ministry Planner";
    return (
        <StylesProvider injectFirst>
            <div className="App">
                <Router />
                <Footer />
            </div>
        </StylesProvider>
    );
}

export default App;