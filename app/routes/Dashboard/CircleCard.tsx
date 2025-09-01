"use client";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function ProgressCircle({percentage}) {
  percentage /= 10;
  return (
    <div style={{ width: 150, height: 150 }}>
      <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        styles={buildStyles({
          textColor: "#111827",
          pathColor: "#3b82f6",
          trailColor: "#e5e7eb",
          textSize: "16px",
        })}
      />
    </div>
  );
}
