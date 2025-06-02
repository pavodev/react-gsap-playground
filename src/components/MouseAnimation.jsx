import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import "./MouseAnimation.css";

const MouseAnimation = () => {
  // Refs
  const xToRef = useRef();
  const yToRef = useRef();
  const mouseContainerRef = useRef();
  const flairRef = useRef();

  // State
  const [isMouseInside, setIsMouseInside] = useState(false);

  const { contextSafe } = useGSAP(
    () => {
      (xToRef.current = gsap.quickTo(".flair", "x", {
        duration: 0.8,
        ease: "power3",
      })),
        (yToRef.current = gsap.quickTo(".flair", "y", {
          duration: 0.8,
          ease: "power3",
        }));
    },
    { scope: mouseContainerRef }
  );

  const moveShape = contextSafe((e) => {
    if (isMouseInside && mouseContainerRef && flairRef) {
      const rect = mouseContainerRef.current.getBoundingClientRect();
      const flairRect = flairRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - flairRect.width / 2;
      const y = e.clientY - rect.top - flairRect.height / 2;

      xToRef.current(x);
      yToRef.current(y);
    }
  });

  return (
    <div
      className="mouse-container"
      ref={mouseContainerRef}
      onMouseMove={(e) => moveShape(e)}
      onMouseEnter={() => setIsMouseInside(true)}
      onMouseLeave={() => setIsMouseInside(false)}
    >
      <p>Move your inside the black box</p>
      <div className="flair" ref={flairRef} />
    </div>
  );
};

export default MouseAnimation;
