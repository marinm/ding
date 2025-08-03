import { useCallback, useEffect } from "react";
import "./App.css";
import { useAudioFile } from "./hooks/useAudioFile";

function App() {
  const { audioBufferRef, audioContextRef } = useAudioFile();

  const play = useCallback(async () => {
    if (audioContextRef.current.state === "suspended") {
      await audioContextRef.current.resume();
    }

    const source = audioContextRef.current.createBufferSource();
    source.buffer = audioBufferRef.current;
    source.connect(audioContextRef.current.destination);
    source.start(0);
  }, [audioContextRef, audioBufferRef]);

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
    <div id="tap-surface" onClick={play}>
      <div className="tap-icon">🛎️</div>
    </div>
  );
}

export default App;
