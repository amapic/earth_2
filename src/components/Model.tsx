import React, { useEffect, useState, useRef } from "react";
import { useFrame, Canvas, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { Html } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter";
import { Object3D } from "three/src/core/Object3D"; //Object3D types
import { AnimationClip } from "three/src/animation/AnimationClip"; //Animation types
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { CameraControls } from "./CameraControls";
import { useSpring, animated, config } from "@react-spring/three";
import Tank2 from "./Tank";
import Yah from "./Prout";
import liste_position_cellule,{valideDeplacement} from "../fonction"

interface group {
  current: {
    rotation: {
      x: number;
      y: number;
    };
  };
}

interface actions {
  current: {
    idle: {
      play: () => void;
    };
  };
}

function Map(props) {
  const ref = useRef<THREE.Mesh>(null!);
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);

  const colorMap = useLoader(TextureLoader, "map.jpg");

  return (
    <mesh
      {...props}
      ref={ref}
    >
      <boxGeometry args={[200, 200, 0]} />
      <meshBasicMaterial map={colorMap} />
    </mesh>
  );
}

function Carre(props) {
  const ref = useRef<THREE.Mesh>(null!);
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);

  const colorMap = useLoader(TextureLoader, "map.jpg");

  return (
    <mesh
      {...props}
      ref={ref}
      onClick={(event) => {
        click(!clicked);
        props.click();
      }}
    >
      <boxGeometry args={[30, 30, 0]} />
      <meshBasicMaterial wireframe color={clicked ? "hotpink" : "orange"} />
    </mesh>
  );
}



function Main(): JSX.Element {
  const [posCar, setPoseCar] = useState([50, 50, 1]);
  const [posCarInit, setPoseCarInit] = useState([50, 50, 1]);

  function move() {
    let newPos = [-50, -50];
    setPoseCar(newPos);
    var tan = (newPos[1] - posCar[1]) / (newPos[0] - posCar[0]);
    var ang = Math.abs(Math.atan(tan));
    setPoseCar([-50, -50, ang]);
  }

  // useEffect(() => {
  //   if (posCar[0] == 50) {
  //     updateTankPos();
  //     setPoseCar([0, 0, 0]);
  //   }
  // }, []);

  function cellId(hh) {
    console.log(hh);
  }

  function valideDeplacement2(chemin){
    valideDeplacement(chemin,setPoseCar)
  }

  

  return (
    <>
      <div style={{ width: "100%", height: "800px" }}>
        <Canvas camera={{ fov: 45, position: [0, 0, 200] }}>
          <primitive position={[0, 0, 10]} object={new THREE.AxesHelper(40)} />

          <CameraControls />
          <Map />
          <Yah click={valideDeplacement2} />
          {/* <Carre click={updateTankPos} fonc={cellId} position={[0, 0, 1]} /> */}
          <Tank2
            yFinal={posCar[1]}
            xFinal={posCar[0]}
            angFinal={posCar[2]}
            cclick={valideDeplacement2}
          />
          {/* <Tank /> */}
        </Canvas>
      </div>
      <button onClick={move}>AAAA</button>
      {/* <Model/> */}
    </>
  );
}

export default Main;
