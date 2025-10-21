function Line({ className = "", d = "M8 0h0.5v16H8V0z" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      className={className}
    >
      <path
        fill="currentColor" // Uses color from className (e.g. text-white)
        d={d}
      />
    </svg>
  );
}

export default Line;