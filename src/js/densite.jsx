import React, { useRef, useState ,useEffect} from "react";
// import { useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";


import data from "../assets/data.js";

const CameraController = () => {
  const { camera, gl } = useThree();
  useEffect(
     () => {
        const controls = new OrbitControls(camera, gl.domElement);
        controls.minDistance = 3;
        controls.maxDistance = 20;
        return () => {
           controls.dispose();
        };
     },
     [camera, gl]
  );
  return null;
};


function latLongToVector3(lat, lon, radius, heigth) {
  var phi = (lat)*Math.PI/180;
  var theta = (lon-180)*Math.PI/180;

  var x = -(radius+heigth) * Math.cos(phi) * Math.cos(theta);
  var y = (radius+heigth) * Math.sin(phi);
  var z = (radius+heigth) * Math.cos(phi) * Math.sin(theta);

  return new THREE.Vector3(x,y,z);
}

export function createData() {
  var arrData = [];
  var centerX = 360
  var centerY = 50
  var r = 40
  for (var z = 0; z < 20; z++) {
      arrData[z] = [];


      arrData[z].push(centerX - r + 3 * z);
      arrData[z].push(centerY - r + 3 * z);
      arrData[z].push(10);
  }
  return arrData;
}

function addLights() {
  light = new THREE.DirectionalLight(0x3333ee, 3.5, 500);
  scene.add(light);
  light.position.set(POS_X, POS_Y, POS_Z);
}

export function Caca({position}) {
  const value = 1;
  const [state, setState] = useState([]);

  function CubeDataLoop(data, i) {
    // var x = parseInt(data[0]) + 180;
    // var y = parseInt(data[1] - 84) * -1;
    var x = parseInt(data[0]);
    var y = parseInt(data[1]) ;
    var value2 = parseFloat(data[2]);
    return (
        <CubeData lookAt={[0,0,0]} key={i} x={x} y={y} value2={value2} />
    );
  }

  function CubeData({x,y,value2}) {
    
    var position = latLongToVector3(y, x, 600, 2);
    console.log(position);
    return (
      <>
        <mesh position={position}>
          <meshStandardMaterial
            color="#f00"
            opacity="1"
            emissive="#ffffff"
          />
          <boxGeometry
            // position={[2, 2, 0]}
            // lookAt={[0, 0, 0]}
            args={[5, 5,1000, 1, 1, 1]}
          />
          
        </mesh>

      </>
    );
  }
  
  let data=createData()
  
  return (
    <>
      <mesh position={position}>
      {/* <CubeData /> */}
        {data.map((gg,i) => CubeDataLoop(gg,i))}
      </mesh>
    </>
  );
}
