import { useEffect, useRef } from "react";

const AUDIO_FILEPATH = "/ding.mp3";

export function useAudioFile() {
  const audioContextRef = useRef<AudioContext>(new AudioContext());
  const audioBufferRef = useRef<null | AudioBuffer>(null);

  useEffect(() => {
    fetch(AUDIO_FILEPATH)
      .then((res) => res.arrayBuffer())
      .then((data) => audioContextRef.current.decodeAudioData(data))
      .then((buffer) => (audioBufferRef.current = buffer));
  }, []);

  return {
    audioContextRef,
    audioBufferRef,
  };
}
