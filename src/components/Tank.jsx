import React, { useEffect, useState, useRef } from "react";
import { useFrame, Canvas, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { useSpring, animated, config,useChain } from "@react-spring/three";

function Cylinder(props) {
  const myref = useRef();

  // useFrame(() => (myref.current.rotation.x = myref.current.rotation.y += 0.01));

  return (
    <mesh {...props} ref={myref}>
      <cylinderBufferGeometry attach="geometry" args={props.cylprops} />
      <meshBasicMaterial attach="material" color="hotpink" />
    </mesh>
  );
}

function Box(props) {
  const ref = useRef();
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);

  const colorMap = useLoader(TextureLoader, "map.jpg");
  // const {boxSize, ...secondObject} = props
  // console.log(props.boxSize);
  return (
    <mesh
      {...props}
      ref={ref}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}
    >
      <boxGeometry args={props.boxSize} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
}
export  function Tank({ xFinal, yFinal }) {
  const ref = useRef();
  
  const [posx, setX] = useState(0);
  const [posy, setY] = useState(0);
  const [angle, setAngle] = useState(0);
  let anim_fini=posx == xFinal?true:false;
  // if (posx == 0 && posy == 0) {
  //   var yInit = 0;
  //   var xInit = 0;
  // } else {
    var yInit = posy;
    var xInit = posx;
  // }

  
  if (!anim_fini) {
    var tan = (yFinal - yInit) / (xFinal - xInit);
    var ang = Math.abs(Math.atan(tan));
  } else {
    var ang = angle;
  }

  useChain([springRef, transitionRef])
  // if (yFinal - yInit < 0 && xFinal - xInit < 0) {
  //   ang = -ang;
  // }
  console.log("angle",angle);
  console.log("ang",ang);
  const [{ x, y, angz }] = useSpring(
    () => ({
      from: { x: xInit, y: yInit, angz: angle },
      config: config.wobbly,
      to: { x: xFinal, y: yFinal, angz: ang },
      onRest: () => {
        setX(xFinal);
        setY(yFinal);
        setAngle(ang);
      },
    }),
    [xFinal]
  );

  console.log(xFinal);
  console.log(xInit);
  

  return (
    <>
      <animated.mesh
        ref={ref}
        position-x={x == xFinal ? xFinal : x}
        position-y={y == yFinal ? yFinal : y}
        position-z={0}
        rotation-z={(angle==ang && angle!=0)?(180 * angle) / Math.PI:(180 * angz) / Math.PI}
        rotation-x={0}
        rotation-y={0}
        
      >
       
        <Cylinder
          cylprops={[2, 10, 7, 6]}
          position={[0, 5, 11]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <Cylinder cylprops={[3, 3, 3, 30]} position={[-5, 10, 2]} />
        
        <Box boxSize={[18, 5, 6]} position={[0, 1, 5]} />
        <Cylinder cylprops={[3, 3, 3, 30]} position={[-5, -1, 2]} />
        <Cylinder cylprops={[3, 3, 3, 30]} position={[5, -1, 2]} />
       
      </animated.mesh>
    </>
  );
}

export default function Tank2({ xFinal, yFinal, angFinal,maj=false,cclick }) {
  const ref = useRef();
  
  const [posx, setX] = useState(0);
  const [posy, setY] = useState(0);
  const [angle, setAngle] = useState(0);
  // const [majFini, setMajFini] = useState(maj);
 

  console.log("angle",angle);
  // console.log("ang",ang);

  // if (!majFini){
    const [{ x, y, angz }] = useSpring(
      () => ({
        from: { x: posx, y: posy, angz: angle },
        config: config.wobbly,
        to: { x: xFinal, y: yFinal, angz: angle },
        
        onRest: () => {
          setX(xFinal);
          setY(yFinal);
          setAngle(angFinal);
          // setmajFini(true);
        },
      }),
      [xFinal]
    );
  // }else{
  //   const [{ x, y, angz }]=[{x:posx,y:posy,angz:angle}];
  // }

  console.log(xFinal);
  // console.log(xInit);
  
  return (
    <>
      <animated.mesh
        ref={ref}
        position-x={x}
        position-y={y}
        position-z={0}
        rotation-z={(180 * angle) / Math.PI}
        rotation-x={0}
        rotation-y={0}
        onClick={(event) => {cclick()}}
      >
       
        <Cylinder
          cylprops={[2, 10, 7, 6]}
          position={[0, 5, 11]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <Cylinder cylprops={[3, 3, 3, 30]} position={[-5, 10, 2]} />
        
        <Box boxSize={[18, 5, 6]} position={[0, 1, 5]} />
        <Cylinder cylprops={[3, 3, 3, 30]} position={[-5, -1, 2]} />
        <Cylinder cylprops={[3, 3, 3, 30]} position={[5, -1, 2]} />
       
      </animated.mesh>
    </>
  );
}
