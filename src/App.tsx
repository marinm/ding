import { useCallback, useEffect, useState } from "react";
import "./App.css";
import { useAudioFile } from "./hooks/useAudioFile";

const SHAKE_DURATION = 600;

function App() {
  const { audioBufferRef, audioContextRef } = useAudioFile();
  const [shakeTimeout, setShakeTimeout] = useState<null | number>(null);
  const [shaking, setShaking] = useState(false);
  const [ready, setReady] = useState(false);

  const shake = useCallback(() => {
    setShaking(true);
    if (shakeTimeout) {
      clearTimeout(shakeTimeout);
    }
    const newShakeTimeout = setTimeout(() => setShaking(false), SHAKE_DURATION);
    setShakeTimeout(newShakeTimeout);
  }, [shakeTimeout]);

  const play = useCallback(async () => {
    if (audioContextRef.current.state === "suspended") {
      await audioContextRef.current.resume();
      setReady(true);
    }

    const source = audioContextRef.current.createBufferSource();
    source.buffer = audioBufferRef.current;
    source.connect(audioContextRef.current.destination);
    source.start(0);
    shake();
  }, [audioContextRef, audioBufferRef, shake]);

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

  return (
    <div id="tap-surface" onPointerDown={play}>
      <div
        className={`tap-icon ${ready ? "" : "grayscale"} ${
          shaking ? "shaking" : ""
        }`}
      >
        🛎️
      </div>
    </div>
  );
}

export default App;
