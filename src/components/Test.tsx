// src/App.js
import React, { useState, useEffect } from "react";
import PoseVisualizer from "./PoseVisualizer";

const Test = () => {
  const [poseData, setPoseData] = useState<any>([]);

  useEffect(() => {
    // Simulate fetching pose data from an external library or API
    const fetchPoseData = async () => {
      // Example of pose data
      const simulatedData = [
        {
          classId: 0,
          classLabel: "nose",
          confidence: 0.993,
          x: 702.737,
          y: 244.783,
          z: -704.819,
        },
        {
          classId: 1,
          classLabel: "left eye (inner)",
          confidence: 0.984,
          x: 714.614,
          y: 213.191,
          z: -683.794,
        },
        {
          classId: 2,
          classLabel: "left eye",
          confidence: 0.987,
          x: 724.291,
          y: 212.591,
          z: -684.466,
        },
        {
          classId: 3,
          classLabel: "left eye (outer)",
          confidence: 0.983,
          x: 734.155,
          y: 212.767,
          z: -684.514,
        },
        // Add more objects as needed
      ];
      setPoseData(simulatedData);
    };

    fetchPoseData();
  }, []);

  return (
    <div style={{ height: "100vh" }}>
      <PoseVisualizer poseData={poseData} />
    </div>
  );
};

export default Test;
