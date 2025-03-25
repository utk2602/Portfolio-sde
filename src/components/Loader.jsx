import { Html, useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";

const CanvasLoader = () => {
  const { progress, loaded, total } = useProgress();
  const [showLoader, setShowLoader] = useState(true);
  
  
  useEffect(() => {
    if (progress >= 100) {
      const timeout = setTimeout(() => {
        setShowLoader(false);
      }, 500);
      
      return () => clearTimeout(timeout);
    }
  }, [progress]);
  
  if (!showLoader) return null;
  
  return (
    <Html
      as="div"
      center
      className="canvas-loader-container"
    >
      <div className="relative">
        <div className="loader-pulse"></div>
        <div className="loader-ring"></div>
      </div>
      
      <div className="loader-progress-bar">
        <div 
          className="loader-progress-value"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <div className="loader-text">
        {loaded} / {total} assets loaded
      </div>
      
      <div className="loader-text font-medium">
        {progress.toFixed(0)}%
      </div>
    </Html>
  );
};

export default CanvasLoader;