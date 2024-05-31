import React, { useState, useEffect } from 'react';
import { useStopwatch } from 'react-timer-hook';

const Stopwatch = ({ maxMinutes = 60, maxSeconds = 0 }) => {
  const { seconds, minutes, hours, isRunning, start, pause, reset } = useStopwatch({ autoStart: false });
  const [recordedTime, setRecordedTime] = useState(null);
  const [repetitions, setRepetitions] = useState(0);

  const handlePause = () => {
    pause();
    const time = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    setRecordedTime(time);
  };

  const handleIncrementRepetitions = () => {
    if (isRunning) {
      setRepetitions(reps => reps + 1);
    }
  };

  useEffect(() => {
    if (recordedTime) {
      console.log(`Recorded Time: ${recordedTime}`);
    }
  }, [recordedTime]);

  useEffect(() => {
    console.log(`Repetitions: ${repetitions}`);
  }, [repetitions]);

  useEffect(() => {
    if (minutes >= maxMinutes && seconds >= maxSeconds) {
      handlePause();
    }
  }, [seconds, minutes, maxMinutes, maxSeconds]);

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-lg">
      <span>Parar Tiempo libre</span>
      <div className="text-4xl font-mono mb-4">
        {hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
      </div>
      <div className="space-x-4">
        <button
          onClick={start}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Start
        </button>
        <button
          onClick={handlePause}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Stop
        </button>
        <button
          onClick={() => reset(0, false)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Reset
        </button>
        <button
          onClick={handleIncrementRepetitions}
          disabled={!isRunning}
          className={`px-4 py-2 text-white rounded ${isRunning ? 'bg-purple-500 hover:bg-purple-600' : 'bg-gray-400'}`}
        >
          Increment Repetitions
        </button>
      </div>
      <div className="mt-4">
        <span className="font-bold">Repetitions: {repetitions}</span>
      </div>
    </div>
  );
};

export default Stopwatch;
