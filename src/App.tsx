import {
  useCallback,
  useEffect,
  useRef,
  type KeyboardEventHandler,
} from "react";
import "./App.css";

const AUDIO_FILEPATH = "/ding.mp3";

function App() {
  const audioContextRef = useRef<AudioContext>(new AudioContext());
  const audioBufferRef = useRef<null | AudioBuffer>(null);

  const play = useCallback(async () => {
    if (audioContextRef.current.state === "suspended") {
      await audioContextRef.current.resume();
    }

    const source = audioContextRef.current.createBufferSource();
    source.buffer = audioBufferRef.current;
    source.connect(audioContextRef.current.destination);
    source.start(0);
  }, [audioContextRef]);

  const onKeyDown = useCallback(
    (key: KeyboardEvent) => {
      if (key.code === "Space") {
        play();
      }
    },
    [play]
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);

    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  useEffect(() => {
    fetch(AUDIO_FILEPATH)
      .then((res) => res.arrayBuffer())
      .then((data) => audioContextRef.current.decodeAudioData(data))
      .then((buffer) => (audioBufferRef.current = buffer));
  }, []);

  return (
    <div id="tap-surface" onClick={play}>
      <div className="tap-icon">🛎️</div>
    </div>
  );
}

export default App;
