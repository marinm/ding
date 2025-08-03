import { useEffect, useRef, type KeyboardEventHandler } from "react";
import "./App.css";

const AUDIO_FILEPATH = "/ding.mp3";

function App() {
  const audioContextRef = useRef<AudioContext>(new AudioContext());
  const audioBufferRef = useRef<null | AudioBuffer>(null);

  useEffect(() => {
    fetch(AUDIO_FILEPATH)
      .then((res) => res.arrayBuffer())
      .then((data) => audioContextRef.current.decodeAudioData(data))
      .then((buffer) => (audioBufferRef.current = buffer));
  }, []);

  const play = async () => {
    if (audioContextRef.current.state === "suspended") {
      await audioContextRef.current.resume();
    }

    const source = audioContextRef.current.createBufferSource();
    source.buffer = audioBufferRef.current;
    source.connect(audioContextRef.current.destination);
    source.start(0);
  };

  const onKeyDown: KeyboardEventHandler<HTMLDivElement> = (key) => {
    if (key.code === "space") {
      play();
    }
  };

  return (
    <div id="tap-surface" onClick={play} onKeyDown={onKeyDown}>
      <div className="tap-icon">🛎️</div>
    </div>
  );
}

export default App;
