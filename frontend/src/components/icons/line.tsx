function Line({ className = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      className={className}
    >
      <path fill="currentColor" d="M8 0h1v16H8V0z"></path>
    </svg>
  );
}

export default Line;
