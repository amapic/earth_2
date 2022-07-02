// import './App.css';
import React, { useRef } from "react";
import ReactDOM from 'react-dom';
import { Canvas, useFrame } from "@react-three/fiber";

function App() {

  function scrollPage() {
    console.log('Heelo');
  }

  const Star = ({position, color}) => {
    const mesh = useRef(null);
    useFrame(() => (mesh.current.rotation.x += 0.01));
    return(
      <>
        <mesh position={position}  ref={mesh}>
          <sphereBufferGeometry attach='geometry' args={[0.5,500, 500]} />
          <meshStandardMaterial attach='material' color={color}/>
        </mesh>
      </>
    );
  }

  function createStars() {
    let stars = []
    for (var i = 0; i < 10; i++) {
      var x = Math.floor(Math.random() * 10);
      var y = Math.floor(Math.random() * 10);
      var z = Math.floor(Math.random() * 10);
      stars[i] = [x, y, z]
    }
    return stars
  }

  const stars = createStars().map((cords, i) =>
    (<Star key={i} position={cords} color='black' />)
  )

  return (
    <>
      <Canvas id="canvas">
      <ambientLight intensity={1} />
      {stars}
      </Canvas>
    </>
  );
}



export default App;