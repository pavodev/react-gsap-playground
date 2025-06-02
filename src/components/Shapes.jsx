import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Box from "./Box";
import Circle from "./Circle";

const Shapes = () => {
  const tl = useRef();
  const shapesContainer = useRef();

  const { contextSafe } = useGSAP(() => {
    tl.current = gsap
      .timeline()
      .to(".box", {
        rotate: 360,
      })
      .to(".circle", {
        x: 100,
      });
  }, {scope: shapesContainer});

  const toggleTimeline = contextSafe(() => {
    tl.current.reversed(!tl.current.reversed());
  });

  return (
    <div className="timeline-container" ref={shapesContainer}>
      <button onClick={toggleTimeline}>Toggle</button>
      <Box />
      <Circle />
    </div>
  );
};

export default Shapes;
