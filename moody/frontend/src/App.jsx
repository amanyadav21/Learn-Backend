import React from "react";
import FacialExpression from "./components/FacialExpression";
import Songs from "./components/songs";
import "./App.css";

function App() {
  return (
    <div className="App">
      <FacialExpression />
      <Songs />
    </div>
  );
}

export default App;
