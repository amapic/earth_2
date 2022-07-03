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
import * as THREE from "three";
function FformBarre({
  timeInit = 0,
  color = "red",
  positionPerso,
  rotationPerso,
  randomList,
}) {
  const mesh = useRef();
  var time = timeInit;
  var compteur = 0;
  var backWard = false;
  useFrame((state, delta) => {
    // console.log(backWard);
    compteur = compteur + 1;
    if (compteur == randomList.length) {
      compteur = 0;
    }
    if (randomList[compteur] > 0.01) {
      if (!backWard) {
        time += 0.01;
      } else {
        time -= 0.01;
      }
    } else {
      time += 0.01;
      backWard = true;
      setTimeout(() => {
        backWard = false;
      }, 3000);
    }
    mesh.current.position.x = 300 * Math.cos(time);
    mesh.current.position.y = 300 * Math.sin(time);
    mesh.current.rotation.z = time;
  });
  return (
    // <group ref={mesh}>
    //   <mesh>
    //     <boxGeometry args={[15, 3, 0]} />
    //     <meshBasicMaterial color={color} />
    //   </mesh>
    //   {/* </group> */}
    // </group>
    <group ref={mesh}>
    <mesh position={[3,0,0]} rotation={[0,0,3.14/3]}>
      <boxGeometry args={[15, 3, 0]} />
      <meshBasicMaterial color={color} />
    </mesh>
    <mesh position={[-3,0,0]} rotation={[0,0,-3.14/3]}>
      <boxGeometry args={[15, 3, 0]} />
      <meshBasicMaterial color={color} />
    </mesh>
  </group>
  );
}

export function Main_Graph({color="#020C4D"}){
  const ref = useRef();
  const points = []
  points.push(new THREE.Vector3(0, 0, 0))
  points.push(new THREE.Vector3(400, 400, 0))
  points.push(new THREE.Vector3(500, 600, 0))
  points.push(new THREE.Vector3(600, 700, 0))
  // points.push(new THREE.Vector3(10, 0, 0))

  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)
  return(
    <group>
      <line ref={ref} geometry={lineGeometry}>
          <lineBasicMaterial attach="material" color={'#9c88ff'} linewidth={10} linecap={'round'} linejoin={'round'} />
        </line>
    </group>
  )
}

function Chevron(timeInit = 0,
  color = "red",
  randomList) {
  const mesh = useRef();
  var time = timeInit;
  var compteur = 0;
  var backWard = false;
  useFrame((state, delta) => {
    // console.log(backWard);
    compteur = compteur + 1;
    if (compteur == randomList.length) {
      compteur = 0;
    }
    if (randomList[compteur] > 0.01) {
      if (!backWard) {
        time += 0.01;
      } else {
        time -= 0.01;
      }
    } else {
      time += 0.01;
      backWard = true;
      setTimeout(() => {
        backWard = false;
      }, 3000);
    }
    mesh.current.position.x = 400 * Math.cos(time);
    mesh.current.position.y = 400 * Math.sin(time);
    mesh.current.rotation.z = time;
  });
  return (
    <group ref={mesh}>
      <mesh rotation={[0,3.14/4,0]}>
        <boxGeometry args={[15, 3, 0]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <mesh rotation={[0,-3.14/4,0]}>
        <boxGeometry args={[15, 3, 0]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  );
}

export default function WrapRotation({ color }) {
  var time = 0;
  var timeInit;
  var array = [];
  for (var i = 0; i < 100; i++) {
    array.push(0.5 + 0.05 * i);
  }
  const mesh = useRef();
  var time = timeInit;
  var backWard = false;
  var kk = { x: 0, y: 0, rotationz: 0 };
  var randomList = [];
  for (var i = 0; i < 1000; i++) {
    randomList.push(Math.random());
  }

  // console.log(randomList)

  const sdg = array.map((data, i) => (
    <FformBarre randomList={randomList} key={i} timeInit={data} color={color} />
    // <Chevron randomList={randomList} key={i} timeInit={data} color={color} />
  ));

  return <mesh ref={mesh}>{sdg}</mesh>;
}
