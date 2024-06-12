import React, { useState, useEffect } from 'react';

function Countdown({D,H,M,S}) {
  const [days, setDays] = useState(D);
  const [hours, setHours] = useState(H);
  const [minutes, setMinutes] = useState(M);
  const [seconds, setSeconds] = useState(S);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds === 0) {
        if (minutes === 0) {
          if (hours === 0) {
            if (days === 0) {
              clearInterval(interval);
              // Handle countdown completion
            } else {
              setDays(days - 1);
              setHours(23);
              setMinutes(59);
              setSeconds(59);
            }
          } else {
            setHours(hours - 1);
            setMinutes(59);
            setSeconds(59);
          }
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      } else {
        setSeconds(seconds - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [days, hours, minutes, seconds]);

  return (
    <div className="flex justify-between font-bold text-4xl">
      <p>{String(days).padStart(2, '0')}</p>
      <img src="/Icons/aa.svg" alt="" />
      <p>{String(hours).padStart(2, '0')}</p>
      <img src="/Icons/aa.svg" alt="" />
      <p>{String(minutes).padStart(2, '0')}</p>
      <img src="/Icons/aa.svg" alt="" />
      <p>{String(seconds).padStart(2, '0')}</p>
    </div>
  );
}

export default Countdown;
