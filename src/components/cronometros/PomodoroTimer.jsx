import React, { useState } from 'react';
import { useTimer } from 'react-timer-hook';

const PomodoroTimer = () => {
  const [workMinutes, setWorkMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);
  const [isWorking, setIsWorking] = useState(true);
  const [expiryTimestamp, setExpiryTimestamp] = useState(null);

  const {
    seconds,
    minutes,
    isRunning,
    start,
    pause,
    restart,
  } = useTimer({ expiryTimestamp, onExpire: handleExpire });

  function handleExpire() {
    if (isWorking) {
      alert("Time to take a break!");
      const time = new Date();
      time.setSeconds(time.getSeconds() + breakMinutes * 60);
      setExpiryTimestamp(time);
      setIsWorking(false);
      restart(time);
    } else {
      alert("Time to get back to work!");
      const time = new Date();
      time.setSeconds(time.getSeconds() + workMinutes * 60);
      setExpiryTimestamp(time);
      setIsWorking(true);
      restart(time);
    }
  }

  const handleStart = () => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + workMinutes * 60);
    setExpiryTimestamp(time);
    restart(time);
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-lg">
      <div className="flex space-x-2 mb-4">
        <input
          type="number"
          value={workMinutes}
          onChange={(e) => setWorkMinutes(Number(e.target.value))}
          className="w-16 p-2 border rounded"
          placeholder="Work (min)"
        />
        <input
          type="number"
          value={breakMinutes}
          onChange={(e) => setBreakMinutes(Number(e.target.value))}
          className="w-16 p-2 border rounded"
          placeholder="Break (min)"
        />
      </div>
      <div className="text-4xl font-mono mb-4">
        {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
      </div>
      <div className="space-x-4">
        <button
          onClick={handleStart}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Start
        </button>
        <button
          onClick={pause}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Pause
        </button>
        <button
          onClick={() => restart(null, false)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Reset
        </button>
      </div>
      <div className="mt-4">
        <span className="font-bold">{isWorking ? "Work Time" : "Break Time"}</span>
      </div>
    </div>
  );
};

export default PomodoroTimer;
