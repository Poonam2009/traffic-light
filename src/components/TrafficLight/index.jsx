import { useEffect, useState } from "react";
import "./TrafficLight.css";

const TrafficLight = () => {
  const colors = ["red", "yellow", "green"];
  const [activeColor, setActiveColor] = useState("red");
  const [isRunning, setIsRunning] = useState(true);

  const lightTimings = {
    red: 4000,
    yellow: 3000,
    green: 2000,
  };

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setTimeout(() => {
        const currentColor = colors.indexOf(activeColor);
        const nextIndex = (currentColor + 1) % colors.length;
        setActiveColor(colors[nextIndex]);
      }, lightTimings[activeColor]);

      return () => clearTimeout(timer);
    }
  }, [isRunning, activeColor]);

  // Function to toggle the traffic light on/off
  const toggleTrafficLight = () => {
    setIsRunning(!isRunning);
  };

  // Function to manually change the light
  const changeLightManually = (color) => {
    if (!isRunning) {
      setActiveColor(color);
    }
  };

  return (
    <div className="traffic-light-container">
      <h1>Traffic Light Simulator</h1>
      <div className="traffic-light">
        {colors.map((color) => (
          <div
            key={color}
            className={`light ${color} ${
              activeColor === color ? "active" : ""
            }`}
            onClick={() => changeLightManually(color)}
          ></div>
        ))}
      </div>
      <button onClick={toggleTrafficLight} className="control-button">
        {isRunning ? "Stop" : "Start"}
      </button>

      <div className="status">
        Current light: <span className="current-light">{activeColor}</span>
      </div>
    </div>
  );
};

export default TrafficLight;
