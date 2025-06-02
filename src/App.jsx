import { useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Box from "./components/Box";
import Circle from "./components/Circle";

function App() {
  const [count, setCount] = useState(0);
  const container = useRef();
  const tl = useRef();

  const { contextSafe } = useGSAP(() => {
    gsap.to(".logo", {
      scale: 1,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
      stagger: {
        amount: 0.5,
        from: "start",
      },
    });

    tl.current = gsap
      .timeline()
      .to(".box", {
        rotate: 360,
      })
      .to(".circle", {
        x: 100,
      });
  });

  const toggleTimeline = contextSafe(() => {
    tl.current.reversed(!tl.current.reversed());
  });

  return (
    <>
      <div ref={container}>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div className="timeline-container">
        <button onClick={toggleTimeline}>Toggle</button>
        <Box />
        <Circle />
      </div>
    </>
  );
}

export default App;
