import React, { useEffect, useRef, useState } from 'react'

export default function StopWatch() {
    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const intervalIdRef = useRef(null);
    const startTimeRef = useRef(0);

    useEffect(() => {
        if (isRunning) {
            intervalIdRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTimeRef.current)
            }, 10);
        }

        return () => {
            clearInterval(intervalIdRef.current);
        }
    }, [isRunning]);

    const start = () => {
        setIsRunning(true);
        startTimeRef.current = Date.now() - elapsedTime;
    }

    const stop = () => {
        setIsRunning(false);
    }


    const reset = () => {
        setElapsedTime(0);
        setIsRunning(false);
    }


    const formatTime = () => {
        let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
        let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
        let seconds = Math.floor(elapsedTime / 1000 % 60);
        let miliseconds = Math.floor(elapsedTime % 1000 / 10);
        return `${hours}:${minutes}:${seconds}:${miliseconds}`;
    }

    return (
        <>
            <div className="stopwatch bg-white p-8 rounded-lg shadow-lg text-center space-y-6">
                <div className="display text-5xl font-mono font-semibold text-gray-800">
                    {formatTime()}
                </div>
                <div className="controls flex justify-center space-x-4">
                    <button
                        onClick={start}
                        className="start-btn bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-lg transition-all duration-200 ease-in-out"
                    >
                        Start
                    </button>
                    <button
                        onClick={stop}
                        className="stop-btn bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-lg transition-all duration-200 ease-in-out"
                    >
                        Stop
                    </button>
                    <button
                        onClick={reset}
                        className="reset-btn bg-gray-500 hover:bg-gray-600 text-white py-2 px-6 rounded-lg transition-all duration-200 ease-in-out"
                    >
                        Reset
                    </button>
                </div>
            </div>
        </>
    )
}
