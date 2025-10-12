
function AsteriskStar({ size = 100, stroke = '#2E2E2E', strokeWidth = 2, className = '' }) {
  const center = size / 2;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g stroke={stroke} strokeWidth={strokeWidth}>
        <line x1={center} y1={0} x2={center} y2={size} />
        <line x1={0} y1={center} x2={size} y2={center} />
        <line x1={center * 0.3} y1={center * 0.3} x2={center * 1.7} y2={center * 1.7} />
        <line x1={center * 1.7} y1={center * 0.3} x2={center * 0.3} y2={center * 1.7} />
      </g>
    </svg>
  );
}

export default AsteriskStar;