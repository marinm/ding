import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  function ding() {
    setCount(count + 1);
    console.log(count + 1);
  }

  return (
    <div id="tap-surface" onClick={ding}>
      <img src={reactLogo} className="logo react" alt="React logo" />
    </div>
  );
}

export default App;
