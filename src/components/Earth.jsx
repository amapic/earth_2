import React, { useRef, useEffect, useState } from "react";
import {
  Canvas,
  useFrame,
  useLoader,
  useThree,
  extend,
  // Canvas,
} from "@react-three/fiber";

import { OrbitControls, Stars, PerspectiveCamera } from "@react-three/drei";
import { CameraControls } from "./CameraControls";
import * as THREE from "three";

function createData() {
  var arrData = [];
  var centerX = 360;
  var centerY = 50;
  var r = 40;
  for (var z = 0; z < 20; z++) {
    arrData[z] = [];

    arrData[z].push(centerX - r + 3 * z);
    arrData[z].push(centerY - r + 3 * z);
    arrData[z].push(10);
  }
  return arrData;
}

// import EarthDayMap from "8k_earth_daymap.jpg";
// import EarthNormalMap from "../../assets/textures/8k_earth_normal_map.jpg";
// import EarthSpecularMap from "../../assets/textures/8k_earth_specular_map.jpg";
// import EarthCloudsMap from "../../assets/textures/8k_earth_clouds.jpg";

// import BigGreyMap from "../../assets/world-big-2-grey.jpg";
// import EarthCloud from "../../assets/earth_clouds_1024.png";
// import CameraControls from 'camera-controls';
// import { TextureLoader } from "three";
import { TextureLoader } from "three/src/loaders/TextureLoader";

import { Caca } from "./../js/densite";
import { AxesHelper } from "three";
import pos from "../fonction";
import { map } from "lodash-es";
const deg2rad = (degrees) => degrees * (Math.PI / 180);

function Carre(props) {
  const ref = useRef(null);
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);

  const colorMap = useLoader(TextureLoader, "map.jpg");

  return (
    <mesh {...props} ref={ref}>
      <boxGeometry args={[30, 30, 0]} />
      <meshBasicMaterial color={clicked ? "red" : "orange"} />
    </mesh>
  );
}

// function Print_cam_pos(camera){
//   console.log(camera.position);
//   return(
//     <></>
//   )
// }
export default function App(props) {
  var POS_X = 1800;
  var POS_Y = 2000;
  var POS_Z = 1800;

  // var POS_X = 100;
  // var POS_Y = 100;
  // var POS_Z = 100;
  var WIDTH = 1000;
  var HEIGHT = 600;

  var FOV = 45;
  var NEAR = 1;
  var FAR = 5000;
  // const camera = new THREE.PerspectiveCamera( 60, width / height, 0.01, 1000 );
  var camera = new THREE.PerspectiveCamera(FOV, WIDTH / HEIGHT, NEAR, FAR);
  camera.position.set(POS_X, POS_Y, POS_Z);
  camera.lookAt(new THREE.Vector3(1900, 0, 1900));

  // useEffect(() => {
  //   console.log(camera.position);
  // }, [camera]);

  // useFrame((state, delta) => (console.log(ref.current.position)))

  const ref = useRef()
  return (
    <React.StrictMode>
      <Canvas camera={camera} style={{ width: "100%", height: "300px" }}>
        {/* <Print_cam_pos camera={camera} /> */}
        <CameraControls ref={ref} camera={camera} />
        <Carre />
        <Scene />
        {/* <OrbitControls target={[10, 0, 0]} /> */}
        {/* <CameraControls /> */}
        {/* <PerspectiveCamera makeDefault /> */}
      </Canvas>
    </React.StrictMode>
  );
}
function Scene(props) {
  const [colorMap, normalMap,gg] = useLoader(TextureLoader, [
    "textures/8k_earth_daymap.jpg",
    "textures/8k_earth_normal_map.jpg",
    "world-big-2-grey.jpg",
    //   EarthNormalMap,
    //   EarthSpecularMap,
    //   EarthCloudsMap,
    //   BigGreyMap,
    //   EarthCloud,
  ]);

  // console.log(colorMap);

  const earthRef = useRef();
  const cloudsRef = useRef();

  function Print_cam() {
    useThree((camera) => {
      console.log(camera.position);
    });
    return <></>;
  }

  function Terre2({ position }) {
    // useThree(() => {
    //   // camera.lookAt(new THREE.Vector3(0, 500, 0));
    //   var planetTexture = THREE.ImageUtils.loadTexture("assets/world-big-2-grey.jpg");
    // });

    return (
      <mesh rotation={[0, 0, 0]} position={position}>
        <sphereGeometry args={[600, 50, 50]} />
        <meshPhongMaterial
          map={gg}
          // normalMap={normalMap}
          // color={"#555"}
          // metalness={0.4}
          // roughness={0.7}
          perPixel={false}
          shininess={0.2}
        />
      </mesh>
    );
  }

  return (
    <>
      {/* <Text3D {...textOptions}>
        Hello world!
        <meshNormalMaterial />
      </Text3D> */}
      {/* <Text  characters="abcdefghijklmnopqrstuvwxyz0123456789!">
        hello world!
      </Text> */}
      <Terre2 position={[0, 500, 0]} />
      <Caca />
      {/* <Print_cam /> */}
      <primitive position={[0, 500, 0]} object={new THREE.AxesHelper(2000)} />
      {/* <AddEarth /> */}
      {/* <Caca position={[0.8, 0, 0]} /> */}
      {/* <AxesHelper position /> */}
    </>
  );
}
