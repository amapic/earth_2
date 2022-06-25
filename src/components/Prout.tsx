import React, { useEffect, useState, useRef } from "react";
import { useFrame, Canvas, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { useSpring, animated, config, useChain } from "@react-spring/three";

function Cylinder(props) {
  const myref = useRef();

  return (
    // <div id={props.id}>
      <mesh {...props} ref={myref}>
        <cylinderBufferGeometry attach="geometry" args={props.cylprops} />
        <meshBasicMaterial attach="material" color="hotpink" />
      </mesh>
    // </div>
  );
}

function Coin(props) {
  const myref = useRef();

  return (
      <group {...props} ref={myref}>
        <mesh>
          {/* <boxGeometry args={[5, 5, 0,0,0,0]}/> */}
          <boxGeometry args={[26, 10, 0]} />

          {/* // <Triangle attach="geometry" args={props.cylprops} /> */}
          <meshBasicMaterial attach="material" color="red" />
        </mesh>
        <mesh position={[-8, -8, 0]}>
          {/* <boxGeometry args={[5, 5, 0,0,0,0]}/> */}
          <boxGeometry args={[10, 25, 0]} />

          {/* // <Triangle attach="geometry" args={props.cylprops} /> */}
          <meshBasicMaterial attach="material" color="red" />
        </mesh>
      </group>
  );
}

function Carre(props) {
  const ref = useRef<THREE.Mesh>(null!);
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);

  const colorMap = useLoader(TextureLoader, "map.jpg");

  // const {boxSize, ...secondObject} = props
  // console.log(props.boxSize);
  return (
      <mesh
        //   position={[10,10,10]}
        {...props}
        ref={ref}
        onClick={(event) => {
        //   click(!clicked);
          props.click(props.idc);
        }}
        // onPointerOver={(event) => hover(true)}
        // onPointerOut={(event) => hover(false)}
      >
        <boxGeometry args={[25, 25, 0]} />
        {/* <boxGeometry args={[25, 25, 0]}/> */}
        {/* <meshStandardMaterial color={clicked ? "hotpink" : "orange"} /> */}
        <meshBasicMaterial wireframe color={clicked ? "hotpink" : "orange"} />
      </mesh>
  );
}

function Region_Couleur(props) {
  const ref = useRef<THREE.Mesh>(null!);
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);

  const colorMap = useLoader(TextureLoader, "map.jpg");

  // const {boxSize, ...secondObject} = props
  // console.log(props.boxSize);
  return (
    // <div>
      <mesh
        {...props}
        ref={ref}
        // onClick={(event) => {
        //   click(!clicked);
        //   props.click();
        // }}
        // onPointerOver={(event) => hover(true)}
        // onPointerOut={(event) => hover(false)}
      >
        <Carre click={props.click} idc={props.couleur+ "4"} position={[45, 45, 0]} />
        <Carre click={props.click} idc={props.couleur+ "1"} position={[45, 20, 0]} />
        <Carre click={props.click} idc={props.couleur+ "7"} position={[45, 70, 0]} />
        <Carre click={props.click}  idc={props.couleur+ "2"} position={[20, 45, 0]} />
        <Carre click={props.click} idc={props.couleur+ "8"}  position={[70, 45, 0]} />
        <Coin position={[70, 28, 0]} />
        <Coin position={[20, 63, 0]} click={props.click} rotation={[0, 0, Math.PI]} />
        <Coin position={[28, 20, 0]} rotation={[0, 0, 1.5 * Math.PI]} />
        <Coin position={[62, 71, 0]} rotation={[0, 0, 0.5 * Math.PI]} />
        {/* <meshStandardMaterial color={clicked ? "hotpink" : "orange"} /> */}
        <meshBasicMaterial color={clicked ? "hotpink" : "orange"} />
      </mesh>
    // </div>
  );
}

export default function Total(props) {
  const myref = useRef();
  return (
    <mesh {...props} ref={myref}>
      <Cylinder
        cylprops={[20, 20, 1, 6]}
        rotation={[Math.PI / 2, Math.PI / 2, 0]}
        position={[0, 0, 0]}
      />
      <Region_Couleur couleur={"B"} click={props.click} rotation={[0, 0, 0]} position={[0, 0, 0]} />
      <Region_Couleur couleur={"V"} click={props.click}  rotation={[0, 0, Math.PI / 2]} position={[0, 0, 0]} />
      <Region_Couleur couleur={"J"} click={props.click}  rotation={[0, 0, 3*Math.PI / 2]} position={[0, 0, 0]} />
      <Region_Couleur couleur={"R"} click={props.click}  rotation={[0, 0, Math.PI ]} position={[0, 0, 0]} />

    </mesh>
  );
}
