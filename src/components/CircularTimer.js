import React from "react";
import "./CircularTimer.css";

export default function CircularTimer({ total = 180, remaining }) {
  const normalized = Math.max(0, Math.min(remaining, total));
  const percent = (normalized / total) * 100;

  const minutes = Math.floor(normalized / 60);
  const seconds = (normalized % 60).toString().padStart(2, "0");

  // Daire için stroke hesaplama
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <div className="timer-wrapper">
      <svg className="timer-ring" width="150" height="150">
        <circle
          className="timer-ring__background"
          cx="75"
            cy="75"
            r={radius}
        />
        <circle
          className="timer-ring__progress"
          cx="75"
          cy="75"
          r={radius}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>
      <div className="timer-text">
        <div className="time">{minutes}:{seconds}</div>
        <div className="label">kaldı</div>
      </div>
    </div>
  );
}
