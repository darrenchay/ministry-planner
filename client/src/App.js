import React from "react";
import "./App.css";
import Footer from "./components/utils/Footer/Footer";
import Router from "./Router";

function App() {
  return (
    <div className="App">
      <Router />
      <Footer />
    </div>
  );
}

export default App;