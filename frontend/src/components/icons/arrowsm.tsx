import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

function ArrowCurve2() {
  const pathRef = useRef(null);

  useGSAP(() => {
    const length = pathRef.current.getTotalLength();

    gsap.fromTo(
      pathRef.current,
      {
        strokeDasharray: length,
        strokeDashoffset: length,
      },
      {
        strokeDashoffset: 0,
        duration: 2,
        ease: "power2.inOut",
      }
    );
  }, []);

  return (
    <svg
      className="h-[230px] w-96 md:w-[800px] md:h-[300px]"
      viewBox="0 0 286 268"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        ref={pathRef}
        d="M277.262 267.175C277.635 267.583 278.267 267.61 278.675 267.237L285.311 261.158C285.718 260.785 285.746 260.152 285.373 259.745C285 259.338 284.367 259.31 283.96 259.683L278.061 265.087L272.657 259.188C272.284 258.781 271.651 258.753 271.244 259.127C270.837 259.5 270.809 260.132 271.182 260.539L277.262 267.175ZM1 2.99995L1.05421 3.99848C110.209 -1.92694 181.525 7.50215 224.387 46.3016C267.22 85.0743 281.944 153.471 277 266.456L277.999 266.5L278.998 266.544C283.943 153.538 269.301 84.2606 225.729 44.8189C182.187 5.40387 110.058 -3.92169 0.945799 2.00142L1 2.99995Z"
        stroke="#2E2E2E"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  );
}

export default ArrowCurve2;