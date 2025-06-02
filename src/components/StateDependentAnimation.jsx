import { useRef, useState } from "react";
import gsap from 'gsap';
import { useGSAP } from "@gsap/react";

const randomX = gsap.utils.random(-200, 200, 1, true);

function StateDependentAnimation() {
  const [endX, setEndX] = useState(0);
  
  const boxRef = useRef();
  const container = useRef();

  useGSAP(() => {
    gsap.to(".box", {
      x: endX,
      duration: 1
    });
  }, { dependencies: [endX], scope: container});
    
  return (
    <div ref={container} className="app">
      <button onClick={() => setEndX(randomX())}>Pass in a randomized value</button>
      <div className="flex-row">
      <div className="box gradient-blue" ref={boxRef}>{endX}</div>
      </div>
    </div>
  );
}

export default StateDependentAnimation;