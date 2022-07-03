import React, { useRef, useEffect, useState } from "react";
import {
  Canvas,
  useFrame,
  useLoader,
  useThree,
  extend,
} from "@react-three/fiber";


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
import WrapRotation,{Main_Graph} from "../js/work";

function Carre(props) {
  const ref = useRef(null);
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);


  return (
    <mesh {...props} ref={ref}>
      <boxGeometry args={[100, 100, 0]} />
      <meshBasicMaterial color={clicked ? "red" : "orange"} />
    </mesh>
  );
}

function Fond({ position, width=100, height=100,color="blue" }) {
  const ref = useRef(null);

  return (
    <mesh position={position} ref={ref}>
      <boxGeometry args={[width, height, 0]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
}

// class Duration(delta){
//   var yy=Date.now()
//   constructor(hauteur, largeur) {
//     this.hauteur = hauteur;
//     this.largeur = largeur;
//   }
// }

function Fform({timeInit=0,color="red"}) {
  const mesh = useRef();
  var time=timeInit;
  var backWard=false;
  useFrame((state,delta) => {
    console.log(backWard);
    if (Math.random()>0.01){
      if(!backWard){
      time+= 0.01;
      }else{
        time-= 0.01;
      }
    }else{
      time+= 0.01;
      backWard=true;
      setTimeout(()=>{backWard=false}, 3000);
    }
    mesh.current.position.x = 300*Math.cos(time );
    mesh.current.position.y = 300*Math.sin(time );
    mesh.current.rotation.z = time;
  });
  return (
    <group position={[0, 0, 0]} ref={mesh}>
      
        <mesh position={[0, 10, 0]}>
          <sphereGeometry args={[5, 20, 20]} />
          <meshBasicMaterial color={color} />
        </mesh>
        <mesh position={[0, -10, 0]}>
          <sphereGeometry args={[5, 20, 20]} />
          <meshBasicMaterial color={color} />
        </mesh>
        <mesh >
          <boxGeometry args={[2, 15, 0]} />
          <meshBasicMaterial color={color} />
        </mesh>
      {/* </group> */}
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
  const sdg = array.map((data, i) => (
    <Ringu key={i} nSegment={array.length} i={i} espace={0.1} />
  ));
  useFrame(() => (mesh.current.rotation.z += 0.01));
  return <mesh ref={mesh}>{sdg}</mesh>;
}

function Gg2({color}) {
  // const mesh = useRef();
  var time=0;
  var timeInit;
  const array = [0.5,0.7,0.9];
  const mesh = useRef();
  var time=timeInit;
  var backWard=false;
  var kk={x:0,y:0,rotationz:0};
  useFrame((state,delta) => {
    console.log(backWard);
    if (Math.random()>0.01){
      if(!backWard){
      time+= 0.01;
      }else{
        time-= 0.01;
      }
    }else{
      time+= 0.01;
      backWard=true;
      setTimeout(()=>{backWard=false}, 3000);
    }
    kk.x = 300*Math.cos(time );
    kk.y = 300*Math.sin(time );
    kk.rotationz = time;
    mesh.current.rotation.y=time;
  });
  
  const sdg = array.map((data, i) => (

    <FformBarre positionPerso={[kk.x,kk.y,0]} rotationPerso={kk.rotationz} key={i} timeInit={data} color={color} />)
  
  );
  
  return <mesh position={[100,0,100]} ref={mesh}>{sdg}</mesh>;
}

// function LoopComponent() {
//   const mesh = useRef();
//   const array = [0.5,0.7,0.9];
//   const sdg = array.map((data, i) => (
//     <Fform key={i} timeInit={data} /> 
//   ));
  
//   return <mesh ref={mesh}>{sdg}</mesh>;
// }

// const withClasses = (WrappedComponent) => {
//   return (props) => (
//       <div>
//           <WrappedComponent {...props} />
//       </div>
//          );
//   };

  // const Hh=withClasses(Fform);



export default function App(props) {
  var POS_X = 0;
  var POS_Y = 0;
  var POS_Z = 1800;

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

  const ref = useRef();
  return (
    <React.StrictMode>
      <Canvas camera={camera} style={{ width: "100%", height: "900px" }}>
       
        <CameraControls ref={ref} camera={camera} />

        <Gg />
        <Main_Graph />
        {/* <Gg2 color={"#87CEEB"} /> */}
        <WrapRotation color={"#87CEEB"}  />
        {/* <LoopComponent Component={<Hh/>} /> */}
        <Fond position={[0,0,-100]} width={4000} height={4000} color={"#020C4D"}/>
       
        <primitive position={[0, 0, 0]} object={new THREE.AxesHelper(2000)} />
        
      </Canvas>

    </React.StrictMode>
  );
}
