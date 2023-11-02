import {useState, useEffect, useCallback} from 'react'

export const useTimer = ({
  initialSeconds = 0,
  initiallyRunning = false
} = {}) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [running, setRunning] = useState(initiallyRunning);

  const tick = useCallback(
    () => {
      return running ? setSeconds((seconds) => seconds + 1) : undefined
    },
    [running]
  );

  const start = () => setRunning(true);
  const pause = () => setRunning(false);
  const reset = () => {
    setRunning(true);
    setSeconds(0);
  }
  const stop = () => {
    pause();
    reset();
  };

  useEffect(() => {
    const id = setInterval(tick, 1000);

    return () => clearInterval(id);
  }, [tick]);

  return { pause, reset, running, seconds, start, stop, setSeconds };
};