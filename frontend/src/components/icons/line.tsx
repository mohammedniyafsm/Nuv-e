function Line({ className = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      className={className}
    >
      <path
        fill="#ccc"         // Light gray color
        opacity="0.6"       // Slight transparency
        d="M8 0h0.5v16H8V0z" // Thinner vertical line
      />
    </svg>
  );
}

export default Line;