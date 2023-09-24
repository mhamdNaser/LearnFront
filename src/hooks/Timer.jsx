import { useState, useEffect } from 'react';

const Timer = ({ time, handleAllAnswer }) => {
    const [minutes, setMinutes] = useState(time);
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(true); // Auto-start the timer

    useEffect(() => {
        let timerInterval;

        if (isRunning) {
            timerInterval = setInterval(() => {
                if (seconds > 0) {
                    setSeconds(seconds - 1);
                } else if (minutes > 0) {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                } else {
                    clearInterval(timerInterval);
                    setIsRunning(false);
                    handleAllAnswer()
                }
            }, 1000);
        } else {
            clearInterval(timerInterval);
        }

        return () => clearInterval(timerInterval);
    }, [isRunning, minutes, seconds]);

    const circumference = 314; // Circumference of a circle with radius 50 (2 * π * 50)
    const progress = ((minutes * 60 + seconds - 5) / (time * 60)) * circumference;

    return (
        <div className="circular-timer">
            <svg width="100" height="100" viewBox="0 0 100 100" className="timer-svg">
                <circle className="timer-background" cx="50" cy="50" r="45" />
                <circle className="timer-progress" cx="50" cy="50" r="45" strokeDasharray={circumference} strokeDashoffset={circumference - progress} />
            </svg>
            <div className="timer">
                <span>{minutes.toString().padStart(2, '0')}</span>:<span>{seconds.toString().padStart(2, '0')}</span>
            </div>
        </div>
    );
};

export default Timer;