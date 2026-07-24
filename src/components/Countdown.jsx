import { useEffect, useState } from "react";

function getTimeLeft(target) {
  const diff = Math.max(0, target.getTime() - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function Countdown({ target }) {
  const [time, setTime] = useState(() => getTimeLeft(target));

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const units = [
    { label: "Days", value: time.days },
    { label: "Hours", value: time.hours },
    { label: "Minutes", value: time.minutes },
    { label: "Seconds", value: time.seconds },
  ];

  return (
    <div className="countdown" role="timer" aria-label="Countdown to the wedding">
      {units.map((u) => (
        <div className="countdown__unit" key={u.label}>
          <span className="countdown__value">{String(u.value).padStart(2, "0")}</span>
          <span className="countdown__label">{u.label}</span>
        </div>
      ))}
    </div>
  );
}
