import { useState, useEffect } from "react";

export default function ClockApp() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");
  const seconds = time.getSeconds().toString().padStart(2, "0");

  const dateStr = time.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const analogAngle = (val: number, max: number) => (val / max) * 360;

  return (
    <div className="h-full flex flex-col items-center justify-center bg-[#ececec] p-6 gap-6">
      {/* Analog clock */}
      <div className="relative w-[180px] h-[180px]">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          {/* Face */}
          <circle cx="100" cy="100" r="95" fill="white" stroke="#808080" strokeWidth="2" />
          <circle cx="100" cy="100" r="90" fill="white" stroke="#d0d0d0" strokeWidth="1" />

          {/* Hour markers */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            const x1 = 100 + 78 * Math.sin(angle);
            const y1 = 100 - 78 * Math.cos(angle);
            const x2 = 100 + 85 * Math.sin(angle);
            const y2 = 100 - 85 * Math.cos(angle);
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#333" strokeWidth="2" />;
          })}

          {/* Minute markers */}
          {Array.from({ length: 60 }).map((_, i) => {
            if (i % 5 === 0) return null;
            const angle = (i * 6 * Math.PI) / 180;
            const x1 = 100 + 82 * Math.sin(angle);
            const y1 = 100 - 82 * Math.cos(angle);
            const x2 = 100 + 85 * Math.sin(angle);
            const y2 = 100 - 85 * Math.cos(angle);
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#aaa" strokeWidth="0.8" />;
          })}

          {/* Hour numbers */}
          {[12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            const x = 100 + 68 * Math.sin(angle);
            const y = 100 - 68 * Math.cos(angle) + 4;
            return (
              <text key={num} x={x} y={y} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#333">
                {num}
              </text>
            );
          })}

          {/* Hour hand */}
          <line
            x1="100"
            y1="100"
            x2={100 + 45 * Math.sin(((time.getHours() % 12) * 30 + time.getMinutes() * 0.5) * Math.PI / 180)}
            y2={100 - 45 * Math.cos(((time.getHours() % 12) * 30 + time.getMinutes() * 0.5) * Math.PI / 180)}
            stroke="#333"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Minute hand */}
          <line
            x1="100"
            y1="100"
            x2={100 + 65 * Math.sin((time.getMinutes() * 6 + time.getSeconds() * 0.1) * Math.PI / 180)}
            y2={100 - 65 * Math.cos((time.getMinutes() * 6 + time.getSeconds() * 0.1) * Math.PI / 180)}
            stroke="#333"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Second hand */}
          <line
            x1="100"
            y1="100"
            x2={100 + 70 * Math.sin(time.getSeconds() * 6 * Math.PI / 180)}
            y2={100 - 70 * Math.cos(time.getSeconds() * 6 * Math.PI / 180)}
            stroke="#cc0000"
            strokeWidth="1"
            strokeLinecap="round"
          />

          {/* Center dot */}
          <circle cx="100" cy="100" r="4" fill="#333" />
          <circle cx="100" cy="100" r="2" fill="#cc0000" />
        </svg>
      </div>

      {/* Digital time */}
      <div className="text-center">
        <div
          className="text-[36px] font-bold text-[#333] tracking-wider tabular-nums"
          style={{ fontFamily: "'DejaVu Sans Mono', monospace" }}
        >
          {hours}:{minutes}:{seconds}
        </div>
        <div className="text-[12px] text-[#666] mt-1">{dateStr}</div>
      </div>
    </div>
  );
}
