import React, { useEffect } from "react";
import { useState } from "react";

function Timer({ time, type }) {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  let countDownDate = new Date(time).getTime();

  const styleCountdown = (type) => {
    switch (type) {
      case "admin":
        return {
          countdown: "bg-primary",
          colon: "text-primary",
        };
      case "user":
        return {
          countdown: "bg-danger",
          colon: "text-danger",
        };
      default:
        return null;
    }
  };

  const styleType = styleCountdown(type);
  // Update the count down every 1 second

  useEffect(() => {
    let x = setInterval(() => {
      // Get today's date and time
      let now = new Date().getTime();

      // Find the distance between now and the count down date
      let distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      setDays(Math.floor(distance / (1000 * 60 * 60 * 24)));
      setHours(
        Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      );
      setMinutes(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
      setSeconds(Math.floor((distance % (1000 * 60)) / 1000));

      // Display the result in the element with id="demo"

      // If the count down is finished, write some text
      if (distance < 0) {
        clearInterval(x);
        document.getElementById("demo").innerHTML = "EXPIRED";
      }
    }, 1000);
    return () => {};
  }, []);

  return (
    <div className="grid grid-flow-col gap-2 text-center auto-cols-max">
      <div
        className={`flex flex-col p-2 rounded-lg text-white ${styleType.countdown}`}
      >
        <span className="countdown font-mono text-xl">
          <span style={{ "--value": days }}></span>
        </span>
      </div>
      <span className={`font-bold flex items-center ${styleType.colon}`}>
        hari
      </span>
      <div
        className={`flex flex-col p-2 rounded-lg text-white ${styleType.countdown}`}
      >
        <span className="countdown font-mono text-xl">
          <span style={{ "--value": hours }}></span>
        </span>
      </div>
      <span className={`font-bold flex items-center ${styleType.colon}`}>
        jam
      </span>
      <div
        className={`flex flex-col p-2 rounded-lg text-white ${styleType.countdown}`}
      >
        <span className="countdown font-mono text-xl">
          <span style={{ "--value": minutes }}></span>
        </span>
      </div>
      <span className={`font-bold flex items-center ${styleType.colon}`}>
        menit
      </span>
      <div
        className={`flex flex-col p-2 rounded-lg text-white ${styleType.countdown}`}
      >
        <span className="countdown font-mono text-xl">
          <span style={{ "--value": seconds }}></span>
        </span>
      </div>
      <span className={`font-bold flex items-center ${styleType.colon}`}>
        detik
      </span>
    </div>
  );
}

export default Timer;
