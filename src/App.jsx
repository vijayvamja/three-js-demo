import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import Test from "./components/Test";

function App() {
  // return <Test/>
  return (
    <Canvas shadows camera={{ position: [0, 2, 5], fov: 30 }}>
      <color attach="background" args={["#ececec"]} />
      <Experience />
    </Canvas>
  );
}

export default App;
