import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "./DelayedAnimation.css";

const DelayedAnimation = () => {
  // Refs
  const delayedContainer = useRef();
  const box1 = useRef();
  const box2 = useRef();
  const box3 = useRef();

  //State
  const [count, setCount] = useState(0);
  const [delayedCount, setDelayedCount] = useState(0);

  // only runs on first render
  useGSAP(
    () => {
      gsap.to(box1.current, { rotation: "+=360" });
    },
    { scope: delayedContainer }
  );

  // runs on first render and every time delayedCount changes
  useGSAP(
    () => {
      gsap.to(box2.current, {
        rotation: "+=360",
      });
    },
    { scope: delayedContainer, dependencies: [delayedCount] }
  );

  // passing in null to use no dependancy array in the internal useEffect
  // runs on every render
  useGSAP(
    () => {
      gsap.to(box3.current, { rotation: "+=360" });
    },
    { scope: delayedContainer, dependencies: [delayedCount] }
  );

  useEffect(() => {
    const timer = setTimeout(() => setDelayedCount(count), 500);

    return () => clearTimeout(timer);
  }, [count]);

  return (
    <div ref={delayedContainer}>
      <div>
        <button onClick={() => setCount(count + 1)}>
          Click to trigger a render
        </button>
      </div>
      <p>Count: {count}</p>
      <p>Delayed Count: {delayedCount}</p>
      <p>Renders: {1 + delayedCount + count}</p>
      <div className="flex-row">
        <div ref={box1} className="box gradient-purple">
          First render
        </div>
        <div ref={box2} className="box gradient-blue">
          First render & delayed count change
        </div>
        <div ref={box3} className="box gradient-red">
          Every render
        </div>
      </div>
    </div>
  );
};

export default DelayedAnimation;
