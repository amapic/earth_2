import React, { useEffect, useState, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Html } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Object3D } from "three/src/core/Object3D"; //Object3D types
import { AnimationClip } from "three/src/animation/AnimationClip"; //Animation types

const Map = () => {
    /* Refs */
    const group: group = useRef();
    const actions: actions = useRef();
  
    /* State */
    const [model, setModel] = useState<Object3D | null>(null);
    const [animation, setAnimation] = useState<AnimationClip[] | null>(null);
  
    /* Mixer */
    const [mixer] = useState(() => new THREE.AnimationMixer(null));
  
    /* Load model */
    useEffect(() => {
      const loader = new GLTFLoader();
      loader.load("croiseur_imperial/scene.gltf", async (gltf) => {
        const nodes = await gltf.parser.getDependencies("node");
        const animations = await gltf.parser.getDependencies("animation");
        setModel(nodes[0]);
        setAnimation(animations);
      });
    }, []);
  
    /* Set animation */
    // useEffect(() => {
    //   if (animation && typeof group.current != "undefined") {
    //     actions.current = {
    //       idle: mixer.clipAction(animation[0], group.current as Object3D),
    //     };
    //     actions.current.idle.play();
    //     return () => animation.forEach((clip) => mixer.uncacheClip(clip));
    //   }
    // }, [animation]);
  
    // /* Animation update */
    useFrame((_, delta) => mixer.update(delta));
    /* Rotation */
    useFrame(() => {
      if (typeof group.current != "undefined")
        return (group.current.rotation.y += 0.01);
    });
  
    // function Box(props): JSX.Element {
    //   const mesh = useRef();
    //   const [hovered, setHover] = useState(false);
    //   // overhead
    //   // useFrame(() => {
    //   //   if (mesh && mesh.current && mesh.current.rotation) {
    //   //     mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
    //   //   }
    //   // });
  
    //   return (
    //     <mesh
    //       {...props}
    //       ref={mesh}
    //       scale={[1, 1, 1]}
    //       // onPointerOver={(e) => setHover(true)}
    //       // onPointerOut={(e) => setHover(false)}
    //     >
    //       <boxBufferGeometry />
    //       <meshLambertMaterial color={hovered ? "purple" : "orange"} />
    //     </mesh>
    //   );
    // }
  
    // function PhyPlane({ color, ...props }) {
    //   const [ref] = usePlane(() => ({ ...props }));
  
    //   return (
    //     <Plane args={[1000, 1000]} ref={ref}>
    //       <meshStandardMaterial color={color} />
    //     </Plane>
    //   );
    // }
  
    // function PhyBox(props) {
    //   const [ref, api] = useBox(() => ({ args: [1, 1, 1], mass: 1, ...props }));
  
    //   return (
    //     <Box
    //       args={[1, 1, 1]}
    //       ref={ref}
    //       onClick={() => api.applyImpulse([0, 0, -10], [0, 0, 0])}
    //     >
    //       <meshNormalMaterial />
    //     </Box>
    //   );
    // }
    console.log("prout");
    return (
      // <Canvas>
      //   <ambientLight />
      //   <pointLight position={[10, 10, 10]} />
      //   <Box position={[-1.2, 0, 0]} />
      //   <Box position={[1.2, 0, 0]} />
      // </Canvas>
      <>
        {model ? (
          <group ref={group} position={[0, -150, 0]} dispose={null}>
            <primitive ref={group} name="Object_0" object={model} />
          </group>
        ) : (
          <Html>Loading...</Html>
        )}
      </>
    );
  };

  export default Map;