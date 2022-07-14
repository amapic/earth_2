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
  console.log(ref.lookAt);
  useEffect(() => {
    console.log(ref.lookAt);
  },[]);
  const points = []
  
  return (
    <group {...props} ref={ref}>
    <mesh >
      <boxGeometry args={[100, 100, 0]} />
      <meshBasicMaterial color={clicked ? "red" : "orange"} />
    </mesh>
    {/* <line ref={ref} geometry={lineGeometry}>
    <lineBasicMaterial attach="material" color={'#9c88ff'} linewidth={10} linecap={'round'} linejoin={'round'} />
  </line> */}
  </group>
  //   <mesh {...props} ref={ref}>
  //   <LineGeometry args={[100, 100, 0]} />
  //   <meshBasicMaterial color={clicked ? "red" : "orange"} />
  // </mesh>
//   <line >
//   <bufferGeometry />
//   <lineBasicMaterial color="hotpink" />
// </line>
  );
}

function lookAtperso(position,point){
  var position2=new THREE.Vector3(position[0],position[1],position[2]);
  var point2=new THREE.Vector3(point[0],point[1],point[2]);
  position2=position2.normalize();
  point2=point2.normalize();
  var zz=new THREE.Vector3(0,0,1)
  // var ggg=zz.projectOnPlane(new THREE.Vector3(0,0,1))
  // console.log(Math.acos(new THREE.Vector3(position2.x,position2.y,0).dot(new THREE.Vector3(point2.x,point2.y,0))));
  //var tt=position2.projectOnPlane(zz)
  // console.log(new THREE.Vector3(position2.x,position2.y,0).dot(new THREE.Vector3(zz.x,zz.y,0)))
  // console.log(new THREE.Vector3(position2.x,0,position2.z).dot(new THREE.Vector3(zz.x,0,zz.z)))
  // console.log(new THREE.Vector3(position2.x,position2.y,0).dot(new THREE.Vector3(zz.x,zz.y,0)))
  var jj=new THREE.Vector3(position[0],position[1],0).angleTo(new THREE.Vector3(1,0,0))
  var hh=new THREE.Vector3(position[0],position[1],0).angleTo(new THREE.Vector3(0,1,0))
  var gg=new THREE.Vector3(0,position[1],position[2]).angleTo(new THREE.Vector3(0,0,1))
  console.log(new THREE.Vector2(position2.z,position2.y).dot(new THREE.Vector2(zz.z,zz.y)))
  console.log(new THREE.Vector2(position2.x,position2.z).dot(new THREE.Vector2(zz.x,zz.z)))
  console.log(new THREE.Vector2(position2.x,position2.y).dot(new THREE.Vector2(zz.x,zz.y)))
  
  // console.log(new THREE.Vector3(position2.x,position2.y,0).angleTo(zz))
  // console.log(new THREE.Vector3(0,position2.y,position2.z).angleTo(zz))
  // console.log(new THREE.Vector3(position2.x,0,position2.z).angleTo(zz))
  return(
  //   [
  //   // Math.atan(position[0]/position[1]),
  //   -Math.atan(position[2]/position[1]),
  //   Math.atan(position[2]/position[0]),
  //   -Math.atan(position[0]/position[1])
  // ]
  [Math.acos(new THREE.Vector3(0,position2.y,position2.z).dot(new THREE.Vector3(0,zz.y,zz.z))),
    Math.acos(new THREE.Vector3(position2.x,0,position2.z).dot(new THREE.Vector3(zz.x,0,zz.z))),
    
    Math.acos(new THREE.Vector3(position2.x,position2.y,0).dot(new THREE.Vector3(zz.x,zz.y,0)))]

  )
}

function Fond({ position, width, height,lookAt }) {
  const ref = useRef(null);
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);

  const starMap = useLoader(TextureLoader, "/textures/stars.jpg");
  console.log(ref.lookAt);
  return (
    <mesh position={position} ref={ref} lookAt={lookAt}>
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
  var points=[]
  // useFrame((state, delta) => (console.log(ref.current.position)))
  console.log(lookAtperso([200,200,200],[0,0,0]));  
  const ref = useRef();
  points.push(new THREE.Vector3(0, 0, 0))
  points.push(new THREE.Vector3(400, 400, 400))
 
  // points.push(new THREE.Vector3(10, 0, 0))

  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)
  return (
    <React.StrictMode>
      <Canvas camera={camera} style={{ width: "100%", height: "500px" }}>
        {/* <Print_cam_pos camera={camera} /> */}
        <CameraControls ref={ref} camera={camera} />
        
        <Fond position={[0, 0, -1000]} height={4000} width={4000} />
        <Carre rotation={lookAtperso(new THREE.Vector3(200,200,200),new THREE.Vector3(0,0,1))} position={[200,200,200]} />
        <Carre  position={[400,400,400]} />
        <line geometry={lineGeometry}>
          <lineBasicMaterial attach="material" color={'#9c88ff'} linewidth={10} linecap={'round'} linejoin={'round'} />
        </line>
        {/* <Scene />  */}
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
        <primitive  position={[0, 0, 0]} object={new THREE.AxesHelper(2000)} />
        <primitive  position={[200, 200, 200]} object={new THREE.AxesHelper(2000)} />
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
  var x=0;
  useFrame((state, delta) => {
    // x=x+0.1
    // cloudsRef.lookAt=[0,0,0];
  })

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
    <React.StrictMode>
      {/* <group position={[0,0,0]}> */}
      <mesh lookat={earthRef.position}  position={[300,1000,300]}>
      <boxGeometry args={[200, 200, 100]} />
      <meshBasicMaterial color={"blue"} />
    </mesh>
    <mesh lookat={[0,0,0]} position={[-800,150,300]}>
      <boxGeometry args={[400, 200, 200]} />
      <meshBasicMaterial color={"blue"} />
    </mesh>
    {/* </group> */}
      {/* <Nuage position={[0, 500, 0]}  /> */}
      {/* <Terre ref={earthRef} position={[0, 500, 0]} /> */}
      {/* {Carres} */}
      {/* <Carres lookat={[0, 500, 0]} /> */}
      {/* <Caca position={[0, 500, 0]} /> */}
      <primitive position={[0, 500, 0]} object={new THREE.AxesHelper(2000)} />
      <primitive ref={earthRef} position={[0, 0, 0]} object={new THREE.AxesHelper(2000)} />
      {/* <group position={[0, 500, 0]} > */}
      {/* {createData().map((data, i) => (
        <CubeData
          lookAt={[500, 500,500]}
          key={i}
          x={parseInt(data[0])}
          y={parseInt(data[1])}
          value2={parseFloat(data[2])}
        />
      ))} */}
      <CubeData
          lookAt={[0, 0,0]}
          key={2}
          x={468.45625326607126}
          y={135.42053471500674}
          value2={300.42053471500674}
        />
        <CubeData
          lookAt={[500, 500,500]}
          key={3}
          x={224.94213795921218}
          y={554.1439217783691}
          value2={-68.77171312703784}
        />
{/* x: 468.45625326607126 */}
{/* y: 135.42053471500674 */}
{/* z: 135.42053471500674 */}

{/* x: 224.94213795921218
y: 554.1439217783691
z: -68.77171312703784 */}
      {/* </group> */}
      </React.StrictMode>
  );
}
