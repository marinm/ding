import { useState, useRef } from "react";
import audiofile from "./assets/ding.mp3";
import "./App.css";

function App() {
  const audio = useRef<HTMLAudioElement>(null);
  const [count, setCount] = useState(0);

  function play() {
    if (!audio.current) {
      return;
    }
    audio.current.pause();
    audio.current.currentTime = 0;
    audio.current.play();
  }

  function ding() {
    setCount(count + 1);
    console.log(count + 1);
    play();
  }

  return (
    <div id="tap-surface" onClick={ding}>
      <audio src={audiofile} className="hidden" controls ref={audio}></audio>
      <div className="tap-icon">🛎️</div>
    </div>
  );
}

export default App;
