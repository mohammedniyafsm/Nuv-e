
function Package({ className = '', svgClass = '', fillColor = '#2E2E2E' }) {
  return (
    <div className={className}>
      <svg
        className={svgClass}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.7764 1.55279C11.9172 1.4824 12.0828 1.4824 12.2236 1.55279L22.2236 6.55279C22.393 6.63748 22.5 6.81061 22.5 7C22.5 7.18939 22.393 7.36252 22.2236 7.44721L12.2236 12.4472C12.0828 12.5176 11.9172 12.5176 11.7764 12.4472L1.77639 7.44721C1.607 7.36252 1.5 7.18939 1.5 7C1.5 6.81061 1.607 6.63748 1.77639 6.55279L11.7764 1.55279ZM3.11803 7L12 11.441L20.882 7L12 2.55902L3.11803 7Z"
          fill={fillColor}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16.2764 9.94716L6.27637 4.94716L6.72358 4.05273L16.7236 9.05273L16.2764 9.94716Z"
          fill={fillColor}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2.5 16.7794V7H1.5V17.0909C1.5 17.2816 1.60848 17.4557 1.77966 17.5397L11.7797 22.4488C11.9186 22.5171 12.0814 22.5171 12.2203 22.4488L22.2203 17.5397C22.3915 17.4557 22.5 17.2816 22.5 17.0909V7H21.5V16.7794L12 21.443L2.5 16.7794Z"
          fill={fillColor}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M19.22 16.0305L17.22 17.0123L16.7793 16.1146L18.7793 15.1328L19.22 16.0305Z"
          fill={fillColor}
        />
      </svg>
    </div>
  );
}

export default Package;