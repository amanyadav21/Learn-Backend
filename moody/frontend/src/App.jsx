import React, { useState } from "react";
import FacialExpression from "./components/FacialExpression";
import Songs from "./components/songs";
import "./App.css";

function App() {
  const [fetchedSongs, setFetchedSongs] = useState([]);
  const [currentMood, setCurrentMood] = useState("");

  return (
    <div className="App">
      <FacialExpression 
        onMoodDetected={setCurrentMood}
        onSongsFetched={setFetchedSongs}
      />
      <Songs 
        songs={fetchedSongs}
        mood={currentMood}
      />
    </div>
  );
}

export default App;
