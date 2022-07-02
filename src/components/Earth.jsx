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
} from "@react-three/drei";
import { CameraControls } from "./CameraControls";
import * as THREE from "three";

// const [colorMap, normalMap,cloudMap,starMap] = useLoader(TextureLoader, [
//   // "textures/world-big-2-grey.jpg",
//   "textures/8k_earth_daymap.jpg",
//   "textures/8k_earth_normal_map.jpg",
//   "textures/8k_earth_clouds.jpg",
//   "textures/stars.jpg",
//   //   EarthNormalMap,
//   //   EarthSpecularMap,
//   //   EarthCloudsMap,
//   //   BigGreyMap,
//   //   EarthCloud,
// ]);

export function createData() {
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

// function CubeData({x,y,value2}) {

//   var position = latLongToVector3(y, x, 600, 2);
//   console.log(position);
//   return (
//     <>
//       <mesh position={position}>
//         <meshStandardMaterial
//           color="#f00"
//           opacity="1"
//           emissive="#ffffff"
//         />
//         <boxGeometry
//           // position={[2, 2, 0]}
//           // lookAt={[0, 0, 0]}
//           args={[5, 5,1000, 1, 1, 1]}
//         />

//       </mesh>

//     </>
//   );
// }

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

  // const colorMap = useLoader(TextureLoader, "map.jpg");

  return (
    <mesh {...props} ref={ref}>
      <boxGeometry args={[100, 100, 0]} />
      <meshBasicMaterial color={clicked ? "red" : "orange"} />
    </mesh>
  );
}

function Fond({ position, width, height }) {
  const ref = useRef(null);
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);

  const starMap = useLoader(TextureLoader, "/textures/stars.jpg");

  return (
    <mesh position={position} ref={ref}>
      <boxGeometry args={[width, height, 0]} />
      <meshBasicMaterial map={starMap} />
    </mesh>
  );
}

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
  var FAR = 120000;
  // const camera = new THREE.PerspectiveCamera( 60, width / height, 0.01, 1000 );
  var camera = new THREE.PerspectiveCamera(FOV, WIDTH / HEIGHT, NEAR, FAR);
  camera.position.set(POS_X, POS_Y, POS_Z);
  camera.lookAt(new THREE.Vector3(1900, 0, 1900));

  // useEffect(() => {
  //   console.log(camera.position);
  // }, [camera]);

  // useFrame((state, delta) => (console.log(ref.current.position)))

  const ref = useRef();
  return (
    <React.StrictMode>
      <Canvas camera={camera} style={{ width: "100%", height: "500px" }}>
        {/* <Print_cam_pos camera={camera} /> */}
        <CameraControls ref={ref} camera={camera} />
        <Fond position={[0, 0, -1000]} height={4000} width={4000} />
        <Carre />
        <Scene />
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
        {/* <Stars radius={600} depth={50} count={5000} factor={2} saturation={0} fade speed={1} /> */}
      </Canvas>
      {/* <Canvas>
      
      </Canvas> */}
    </React.StrictMode>
  );
}
function latLongToVector3(lat, lon, radius, heigth) {
  var phi = (lat * Math.PI) / 180;
  var theta = ((lon - 180) * Math.PI) / 180;

  var x = -(radius + heigth) * Math.cos(phi) * Math.cos(theta);
  var y = (radius + heigth) * Math.sin(phi);
  var z = (radius + heigth) * Math.cos(phi) * Math.sin(theta);

  return new THREE.Vector3(x, y, z);
}
function CubeData({ x, y, value2 }) {
  var position = latLongToVector3(y, x, 600, 2);
  console.log(position);
  return (
    <>
      <mesh position={position}>
        <meshStandardMaterial color="#f00" opacity="1" emissive="#ffffff" />
        <boxGeometry
          // position={[2, 2, 0]}
          // lookAt={[0, 0, 0]}
          args={[5, 5, 1000, 1, 1, 1]}
        />
      </mesh>
    </>
  );
}
function Scene(props) {
  const [colorMap, normalMap, cloudMap] = useLoader(TextureLoader, [
    // "textures/world-big-2-grey.jpg",
    "textures/8k_earth_daymap.jpg",
    "textures/8k_earth_normal_map.jpg",
    "textures/8k_earth_clouds.jpg",
    // "textures/stars.jpg",
    //   EarthNormalMap,
    //   EarthSpecularMap,
    //   EarthCloudsMap,
    //   BigGreyMap,
    //   EarthCloud,
  ]);
  // console.log(colorMap);

  const earthRef = useRef();
  const cloudsRef = useRef();

  function Terre({ position }) {
    let data = createData().slice(3);

    return (
      <>
        <mesh rotation={[0, 0, 0]} position={position}>
          <sphereGeometry args={[600, 50, 50]} />
          <meshBasicMaterial
            map={colorMap}
            // normalMap={normalMap}
            // color={"#555"}
            // metalness={0.4}
            // roughness={0.7}
            perPixel={false}
            // shininess={0.2}
            opacity={0.1}
            side={THREE.DoubleSide}
          />
        </mesh>
      </>
    );
  }

  //   const Carres= createData().map((data, i) => ({
  //     //  CubeDataLoop(gg,i
  //     var x = parseInt(data[0]);
  //     var y = parseInt(data[1]) ;
  //     var value2 = parseFloat(data[2]);
  //     return <CubeData lookAt={[0,0,0]} key={i} x={data[0]} y={data[1]} value2={value2} />;
  // }))

  function Nuage({ position }) {
    // var spGeo = new THREE.SphereGeometry(600, 50, 50);
    //         var cloudsTexture = THREE.ImageUtils.loadTexture("assets/earth_clouds_1024.png");
    //         var materialClouds = new THREE.MeshPhongMaterial({ color: 0xffffff, map: cloudsTexture, transparent: true, opacity: 0.3 });

    //         meshClouds = new THREE.Mesh(spGeo, materialClouds);
    //         meshClouds.scale.set(1.015, 1.015, 1.015);
    return (
      <mesh rotation={[0, 0, 0]} position={position}>
        <sphereGeometry args={[600, 50, 50]} />
        <meshNormalMaterial
          map={cloudMap}
          color={"0xffffff"}
          perPixel={false}
          shininess={0.2}
          opacity={0.3}
          transparent={true}
          scale={[1.015, 1.015, 1.015]}
          side={THREE.DoubleSide}
        />
      </mesh>
    );
  }

  return (
    <>
      {/* <Nuage position={[0, 500, 0]}  /> */}
      {/* <Terre position={[0, 500, 0]} /> */}
      {/* {Carres} */}
      {/* <Carres lookat={[0, 500, 0]} /> */}
      {/* <Caca position={[0, 500, 0]} /> */}
      <primitive position={[0, 500, 0]} object={new THREE.AxesHelper(2000)} />
      {createData().map((data, i) => (
        <CubeData
          lookAt={[500, 500, 0]}
          key={i}
          x={parseInt(data[0])}
          y={parseInt(data[1])}
          value2={parseFloat(data[2])}
        />
      ))}
    </>
  );
}
