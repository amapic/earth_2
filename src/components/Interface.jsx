import React, { useRef, useEffect, useState } from "react";
import {
  Canvas,
  useFrame,
  useLoader,
  useThree,
  extend,
  // Canvas,
} from "@react-three/fiber";
// import ff from "fonts"

import {
  OrbitControls,
  Stars,
  PerspectiveCamera,
  Text,
  Ring,
} from "@react-three/drei";
import { CameraControls } from "./CameraControls";
import * as THREE from "three";
import { EllipseCurve } from "three";
import RoundedRectangle from "../js/roundedRectangle";

function Carre(props) {
  const ref = useRef(null);
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);

  // const colorMap = useLoader(TextureLoader, "map.jpg");

  return (
    <mesh {...props} ref={ref}>
      <boxGeometry args={[100, 100, 0]} />
      <meshBasicMaterial color={clicked ? "red" : "orange"} />
    </mesh>
  );
}

function Fform() {
  return (
    <group>
      <mesh>
        <boxGeometry args={[100, 100, 0]} />
        <meshBasicMaterial color={ "blue"} />
      </mesh>
      <mesh>
        <sphereGeometry args={[100, 100, 0]} />
        <meshBasicMaterial color={"red" } />
        
      </mesh>
    </group>
  );
}

function Ringu({ nSegment, espace, i }) {
  return (
    <mesh key={i}>
      {/* <ringGeometry args={[195, 200, 100,2, 0 + 3.14*i,2*3.14/nSegment]} /> */}
      <ringGeometry
        args={[
          195,
          200,
          100,
          2,
          i * ((2 * 3.14 - nSegment * espace) / nSegment) + i * espace,
          (2 * 3.14 - nSegment * espace) / nSegment,
        ]}
      />
      <meshBasicMaterial color={"blue"} />
      {/* i*(nSegment) + i*(2*3.14-espace*nSegment)/nSegment */}
    </mesh>
  );
}

function Gg() {
  const mesh = useRef();
  const array = Array(20) // array size is 10
    .fill()
    .map(() => 50 * Math.random());
  // useFrame((state, delta) => (console.log(ref.current.position)))
  const sdg = array.map((data, i) => (
    //  CubeDataLoop(gg,i
    <Ringu key={i} nSegment={array.length} i={i} espace={0.1} />
  ));
  useFrame(() => (mesh.current.rotation.z += 0.01));
  return <mesh ref={mesh}>{sdg}</mesh>;
}

export default function App(props) {
  var POS_X = 0;
  var POS_Y = 0;
  var POS_Z = 1800;

  // var POS_X = 100;
  // var POS_Y = 100;
  // var POS_Z = 100;
  var WIDTH = 1000;
  var HEIGHT = 600;

  var FOV = 45;
  var NEAR = 1;
  var FAR = 10000;
  // const camera = new THREE.PerspectiveCamera( 60, width / height, 0.01, 1000 );
  var camera = new THREE.OrthographicCamera(FOV, WIDTH / HEIGHT, NEAR, FAR);
  // var camera = new THREE.PerspectiveCamera(FOV, WIDTH / HEIGHT, NEAR, FAR);
  camera.position.set(POS_X, POS_Y, POS_Z);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  // useEffect(() => {
  //   console.log(camera.position);
  // }, [camera]);
  // const array = Array(20) // array size is 10
  //   .fill()
  //   .map(() => 50 * Math.random());
  // // useFrame((state, delta) => (console.log(ref.current.position)))
  // const sdg = array.map((data, i) => (
  //   //  CubeDataLoop(gg,i
  //   <Ringu key={i} nSegment={array.length} i={i} espace={0.1} />
  // ));
  // console.log(sdg);
  const ref = useRef();
  return (
    <React.StrictMode>
      <Canvas camera={camera} style={{ width: "100%", height: "500px" }}>
        {/* <Print_cam_pos camera={camera} /> */}
        <CameraControls ref={ref} camera={camera} />
        {/* <Fond position={[0, 0, -1000]} height={4000} width={4000} /> */}
        {/* <Carre /> */}
        <Gg />
        <Fform />
        {/* <RoundedRectangle w={50} h={50} r={4} s={0.5}/> */}
        {/* {sdg} */}
        {/* <Ringu i={0.5} /> */}
        {/* <Ringu nSegment={4}/> */}
        {/* <mesh {...props} ref={ref}>
          <EllipseCurve args={[0, 0, 10,10,0,2*Math.PI,false,0]} />
          <meshBasicMaterial color={"orange"} />
        </mesh> */}
        {/* <Scene /> */}
        {/* <pointLight position={[10, 10, 10]} /> */}
        {/* <OrbitControls target={[10, 0, 0]} /> */}
        {/* <CameraControls /> */}
        {/* <PerspectiveCamera makeDefault /> */}
        <Text
          position={[-1000, 0, 0]}
          fontSize={5}
          // font={"fonts/helvetiker_regular.typeface.json"}
          scale={[20, 20, 20]}
          color="black"
          anchorX="center"
          anchorY="middle"
          shininess={0}
        >
          Official nasa pâté data
          <meshNormalMaterial />
        </Text>

        {/* <Ring>
          <meshBasicMaterial color="hotpink" />
        </Ring> */}
        <primitive position={[0, 0, 0]} object={new THREE.AxesHelper(2000)} />
        {/* <Stars radius={600} depth={50} count={5000} factor={2} saturation={0} fade speed={1} /> */}
      </Canvas>
      {/* <Canvas>
        
        </Canvas> */}
    </React.StrictMode>
  );
}
