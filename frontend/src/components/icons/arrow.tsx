import {  useRef } from "react";
import { gsap } from "gsap";
import {useGSAP } from "@gsap/react";


function ArrowCurve() {
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
    <svg className="h-[230px] w-96 md:w-[800px] md:h-[300px] "  viewBox="0 0 924 362" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        ref={pathRef}
        d="M919.74 361.965C920.273 362.109 920.822 361.793 920.965 361.26L923.304 352.569C923.448 352.036 923.132 351.487 922.599 351.343C922.065 351.2 921.517 351.516 921.373 352.049L919.294 359.774L911.569 357.695C911.036 357.552 910.487 357.868 910.343 358.401C910.2 358.934 910.516 359.483 911.049 359.627L919.74 361.965ZM0.999778 55.9998L1.35905 56.933C433.293 -109.348 790.317 137.818 919.133 361.499L920 361L920.866 360.501C791.683 136.182 433.707 -111.651 0.640511 55.0666L0.999778 55.9998Z"
        stroke="#2E2E2E"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  );
}

export default ArrowCurve;
