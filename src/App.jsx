import { useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Shapes from "./components/Shapes";
import DelayedAnimation from "./components/DelayedAnimation";
import StateDependentAnimation from "./components/StateDependentAnimation";
import MouseAnimation from "./components/MouseAnimation";

gsap.registerPlugin(useGSAP);

function App() {
  const [count, setCount] = useState(0);
  const timelineContainer = useRef();

  useGSAP(
    () => {
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
    },
    { scope: timelineContainer }
  );

  return (
    <>
      <div ref={timelineContainer}>
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
      <section>
        <h2>Shapes Animation with GSAP's safe context</h2>
        <Shapes />
      </section>
      <section>
        <h2>Delayed Animation</h2>
        <DelayedAnimation />
      </section>
      <section>
        <h2>State dependent animation</h2>
        <StateDependentAnimation />
      </section>
      <section>
        <h2>Animate on mouse move</h2>
        <MouseAnimation />
      </section>
    </>
  );
}

export default App;
