const doodleIcons = ["brackets", "plus", "angle", "terminal", "code", "bulb", "chart", "target", "rocket", "person", "message", "wifi"];
const doodles = Array.from({ length: 128 }, (_, index) => {
  const size = 0.9 + (index % 4) * 0.16;

  return {
    x: 1 + ((index * 37) % 97),
    y: 2 + ((index * 61 + (index % 5) * 7) % 95),
    w: size,
    h: size,
    icon: doodleIcons[(index * 3) % doodleIcons.length],
  };
});

function IconGlyph({ type, w, h }: { type: string; w: number; h: number }) {
  const shared = {
    strokeWidth: 1.1,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (type) {
    case "brackets":
      return (
        <g fill="none" stroke="rgba(61, 61, 57, 0.28)" {...shared}>
          <path d={`M ${w * 0.24} ${h * 0.2} L ${w * 0.08} ${h / 2} L ${w * 0.24} ${h * 0.8}`} />
          <path d={`M ${w * 0.76} ${h * 0.2} L ${w * 0.92} ${h / 2} L ${w * 0.76} ${h * 0.8}`} />
        </g>
      );
    case "angle":
      return (
        <g fill="none" stroke="rgba(61, 61, 57, 0.28)" {...shared}>
          <path d={`M ${w * 0.24} ${h * 0.22} L ${w * 0.72} ${h / 2} L ${w * 0.24} ${h * 0.78}`} />
        </g>
      );
    case "terminal":
      return (
        <g fill="none" stroke="rgba(61, 61, 57, 0.28)" {...shared}>
          <rect x={w * 0.12} y={h * 0.16} width={w * 0.76} height={h * 0.68} rx={2.4} />
          <path d={`M ${w * 0.28} ${h * 0.48} L ${w * 0.46} ${h * 0.48}`} />
          <path d={`M ${w * 0.48} ${h * 0.48} L ${w * 0.7} ${h * 0.34}`} />
          <path d={`M ${w * 0.34} ${h * 0.62} H ${w * 0.74}`} />
        </g>
      );
    case "code":
      return (
        <g fill="none" stroke="rgba(61, 61, 57, 0.28)" {...shared}>
          <path d={`M ${w * 0.32} ${h * 0.28} L ${w * 0.16} ${h / 2} L ${w * 0.32} ${h * 0.72}`} />
          <path d={`M ${w * 0.68} ${h * 0.28} L ${w * 0.84} ${h / 2} L ${w * 0.68} ${h * 0.72}`} />
          <path d={`M ${w * 0.52} ${h * 0.18} L ${w * 0.48} ${h * 0.82}`} />
        </g>
      );
    case "plus":
      return (
        <g fill="none" stroke="rgba(61, 61, 57, 0.28)" {...shared}>
          <path d={`M ${w / 2} ${h * 0.18} L ${w / 2} ${h * 0.82}`} />
          <path d={`M ${w * 0.18} ${h / 2} L ${w * 0.82} ${h / 2}`} />
        </g>
      );
    case "bulb":
      return (
        <g fill="none" stroke="rgba(61, 61, 57, 0.28)" {...shared}>
          <path d={`M ${w * 0.5} ${h * 0.12} C ${w * 0.2} ${h * 0.12}, ${w * 0.12} ${h * 0.5}, ${w * 0.36} ${h * 0.66} L ${w * 0.4} ${h * 0.78} H ${w * 0.6} L ${w * 0.64} ${h * 0.66} C ${w * 0.88} ${h * 0.5}, ${w * 0.8} ${h * 0.12}, ${w * 0.5} ${h * 0.12}`} />
          <path d={`M ${w * 0.4} ${h * 0.86} H ${w * 0.6}`} />
          <path d={`M ${w * 0.32} ${h * 0.03} L ${w * 0.24} ${h * -0.08}`} />
          <path d={`M ${w * 0.68} ${h * 0.03} L ${w * 0.76} ${h * -0.08}`} />
        </g>
      );
    case "chart":
      return (
        <g fill="none" stroke="rgba(61, 61, 57, 0.28)" {...shared}>
          <path d={`M ${w * 0.14} ${h * 0.82} H ${w * 0.88} M ${w * 0.18} ${h * 0.78} V ${h * 0.18}`} />
          <path d={`M ${w * 0.22} ${h * 0.66} L ${w * 0.4} ${h * 0.5} L ${w * 0.55} ${h * 0.58} L ${w * 0.82} ${h * 0.26}`} />
        </g>
      );
    case "target":
      return (
        <g fill="none" stroke="rgba(61, 61, 57, 0.28)" {...shared}>
          <circle cx={w * 0.5} cy={h * 0.5} r={w * 0.34} />
          <circle cx={w * 0.5} cy={h * 0.5} r={w * 0.16} />
          <path d={`M ${w * 0.72} ${h * 0.18} L ${w * 0.88} ${h * 0.12} L ${w * 0.82} ${h * 0.3} M ${w * 0.72} ${h * 0.18} L ${w * 0.5} ${h * 0.5}`} />
        </g>
      );
    case "rocket":
      return (
        <g fill="none" stroke="rgba(61, 61, 57, 0.28)" {...shared}>
          <path d={`M ${w * 0.28} ${h * 0.72} C ${w * 0.24} ${h * 0.38}, ${w * 0.52} ${h * 0.12}, ${w * 0.8} ${h * 0.1} C ${w * 0.78} ${h * 0.4}, ${w * 0.58} ${h * 0.7}, ${w * 0.28} ${h * 0.72}`} />
          <circle cx={w * 0.58} cy={h * 0.3} r={w * 0.07} />
          <path d={`M ${w * 0.34} ${h * 0.64} L ${w * 0.12} ${h * 0.86} M ${w * 0.42} ${h * 0.7} L ${w * 0.34} ${h * 0.9}`} />
        </g>
      );
    case "person":
      return (
        <g fill="none" stroke="rgba(61, 61, 57, 0.28)" {...shared}>
          <circle cx={w * 0.5} cy={h * 0.28} r={w * 0.14} />
          <path d={`M ${w * 0.24} ${h * 0.84} C ${w * 0.26} ${h * 0.56}, ${w * 0.74} ${h * 0.56}, ${w * 0.76} ${h * 0.84} M ${w * 0.5} ${h * 0.43} V ${h * 0.7}`} />
        </g>
      );
    case "message":
      return (
        <g fill="none" stroke="rgba(61, 61, 57, 0.28)" {...shared}>
          <path d={`M ${w * 0.14} ${h * 0.2} H ${w * 0.86} V ${h * 0.68} H ${w * 0.42} L ${w * 0.22} ${h * 0.86} V ${h * 0.68} H ${w * 0.14} Z`} />
          <path d={`M ${w * 0.3} ${h * 0.42} H ${w * 0.7} M ${w * 0.3} ${h * 0.55} H ${w * 0.58}`} />
        </g>
      );
    case "wifi":
      return (
        <g fill="none" stroke="rgba(61, 61, 57, 0.28)" {...shared}>
          <path d={`M ${w * 0.12} ${h * 0.38} C ${w * 0.34} ${h * 0.12}, ${w * 0.66} ${h * 0.12}, ${w * 0.88} ${h * 0.38}`} />
          <path d={`M ${w * 0.28} ${h * 0.58} C ${w * 0.4} ${h * 0.44}, ${w * 0.6} ${h * 0.44}, ${w * 0.72} ${h * 0.58}`} />
          <circle cx={w * 0.5} cy={h * 0.78} r={w * 0.06} fill="rgba(61, 61, 57, 0.28)" />
        </g>
      );
    default:
      return null;
  }
}

export default function Doodles() {
  return (
    <div className="sv-doodles" aria-hidden="true">
      <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        <g opacity="1">
          {doodles.map((doodle, index) => (
            <g key={`doodle-${index}`} transform={`translate(${doodle.x} ${doodle.y})`}>
              <IconGlyph type={doodle.icon} w={doodle.w} h={doodle.h} />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
