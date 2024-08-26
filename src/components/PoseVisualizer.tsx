// src/PoseVisualizer.js
import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// Component to render each body part
const BodyPart = ({ position, color }) => {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.05, 16, 16]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

// Main PoseVisualizer component
const PoseVisualizer = ({ poseData }) => {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} />
      <OrbitControls />
      {poseData.map((part, index) => (
        <BodyPart
          key={index}
          position={[part.x / 100, part.y / 100, part.z / 100]} // Adjust scaling as needed
          color="orange"
        />
      ))}
    </Canvas>
  );
};

export default PoseVisualizer;
