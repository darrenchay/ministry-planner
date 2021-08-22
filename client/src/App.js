import React from "react";
import "./App.css";
import Footer from "./components/utils/Footer/Footer";
import Router from "./Router";
import { StylesProvider } from '@material-ui/core/styles';
require('dotenv').config();

function App() {
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