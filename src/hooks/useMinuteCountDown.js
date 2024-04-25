import { useEffect, useState } from "react";

/**
 * A custom React hook that implements a countdown timer in minutes.
 *
 * @param {number} initialMinutes - The initial countdown time in minutes.
 * @returns {object} An object containing the current minutes and seconds left in the countdown.
 *
 * @example
 * const { minutes, seconds } = useMinuteCountDown(5); // Initializes a 5 minute countdown
 */
const useMinuteCountDown = (initialMinutes) => {
  const [secondsLeft, setSecondsLeft] = useState(initialMinutes * 60);

  useEffect(() => {
    if (secondsLeft <= 0) return;

    const intervalId = setInterval(() => {
      setSecondsLeft(secondsLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [secondsLeft]);

   // Calcula los minutos y segundos restantes
  let minutes = Math.floor(secondsLeft / 60).toString();
  let seconds = (secondsLeft % 60).toString();

  if (minutes.length === 1) minutes = "0" + minutes
  if (seconds.length === 1 ) seconds = "0"+seconds

  const resetCountDown = () => {
    setSecondsLeft(initialMinutes*60);
  };

  return { minutes, seconds, resetCountDown };
}

export default useMinuteCountDown;