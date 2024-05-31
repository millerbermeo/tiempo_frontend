import React, { useState, useEffect } from 'react';
import { useTimer } from 'react-timer-hook';

const CountdownTimer = () => {
  const [inputHours, setInputHours] = useState(0);
  const [inputMinutes, setInputMinutes] = useState(0);
  const [inputSeconds, setInputSeconds] = useState(0);
  const [expiryTimestamp, setExpiryTimestamp] = useState(null);
  const [recordedTime, setRecordedTime] = useState(null);
  const [repetitionCount, setRepetitionCount] = useState(0);

  const {
    seconds,
    minutes,
    hours,
    isRunning,
    start,
    pause,
    restart,
  } = useTimer({ expiryTimestamp, onExpire: () => console.warn('Time expired') });

  const handleStart = () => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + inputSeconds + inputMinutes * 60 + inputHours * 3600);
    setExpiryTimestamp(time);
    restart(time);
    setRepetitionCount(0); // Reset repetition count when starting
  };

  const handlePause = () => {
    pause();
    const time = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    setRecordedTime(time);
  };

  const handleIncrementRepetitions = () => {
    setRepetitionCount(prevCount => prevCount + 1);
  };

//   useEffect(() => {
//     if (isRunning) {
//       const interval = setInterval(() => {
//         setRepetitionCount(prevCount => prevCount + 1);
//       }, 1000); // Increment repetition count every second

//       return () => clearInterval(interval);
//     }
//   }, [isRunning]);

  useEffect(() => {
    if (recordedTime) {
      console.log(`Recorded Time: ${recordedTime}`);
    }
  }, [recordedTime]);

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-lg">
      <div className="flex space-x-2 mb-4">
        <input
          type="number"
          value={inputHours}
          onChange={(e) => setInputHours(Number(e.target.value))}
          className="w-16 p-2 border rounded"
          placeholder="HH"
        />
        <input
          type="number"
          value={inputMinutes}
          onChange={(e) => setInputMinutes(Number(e.target.value))}
          className="w-16 p-2 border rounded"
          placeholder="MM"
        />
        <input
          type="number"
          value={inputSeconds}
          onChange={(e) => setInputSeconds(Number(e.target.value))}
          className="w-16 p-2 border rounded"
          placeholder="SS"
        />
      </div>
      <div className="text-4xl font-mono mb-4">
        {hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
      </div>
      <div className="text-2xl font-mono mb-4">
        Repeticiones: {repetitionCount}
      </div>
      <div className="space-x-4">
        <button
          onClick={handleStart}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Start
        </button>
        <button
          onClick={handlePause}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Pause
        </button>
        <button
          onClick={() => restart(expiryTimestamp, false)}
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
    </div>
  );
};

export default CountdownTimer;
