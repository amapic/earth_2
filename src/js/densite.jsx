import React, { useRef, useState ,useEffect} from "react";
// import { useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";


import data from "../assets/data.js";


function latLongToVector3(lat, lon, radius, heigth) {
  var phi = (lat)*Math.PI/180;
  var theta = (lon-180)*Math.PI/180;

  var x = -(radius+heigth) * Math.cos(phi) * Math.cos(theta);
  var y = (radius+heigth) * Math.sin(phi);
  var z = (radius+heigth) * Math.cos(phi) * Math.sin(theta);

  return new THREE.Vector3(x,y,z);
}

function createData() {
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

export function Caca({ position }) {
  const value = 1;
  const [state, setState] = useState([]);

  function CubeDataLoop(data, i) {
    var x = parseInt(data[0]) + 180;
    var y = parseInt(data[1] - 84) * -1;
    var value2 = parseFloat(data[2]);
    return (
        <CubeData key={i} x={x} y={y} value2={value2} />
    );
  }

  function CubeData({x,y,value2}) {
    
    var position = latLongToVector3(y, x, 600, 2);
    // x=0.8
    // console.log(position);
    return (
      <>
        <mesh position={position}>
          <meshStandardMaterial
            color="#ff0"
            opacity="1"
            emissive="#ffffff"
          />
          <boxGeometry
            position={[2, 2, 0]}
            lookAt={[0, 0, 0]}
            args={[1, 1, 1, 1, 1, 1]}
          />
          {/* <OrbitControls
            enableZoom={true}
            enablePan={true}
            enableRotate={true}
            zoomSpeed={0.6}
            panSpeed={0.5}
            rotateSpeed={0.4}
          /> */}
        </mesh>

      </>
    );
  }
  
  data=createData()
  let dataArray = CSVToArray(data);
  
  return (
    <>
      <mesh>
      {/* <CubeData /> */}
        {dataArray.map((gg,i) => CubeDataLoop(gg,i))}
      </mesh>
    </>
  );
}

// function CSVToArray(strData, strDelimiter) {
//   // Check to see if the delimiter is defined. If not,
//   // then default to comma.
//   strDelimiter = strDelimiter || ",";

//   // Create a regular expression to parse the CSV values.
//   var objPattern = new RegExp(
//     // Delimiters.
//     "(\\" +
//       strDelimiter +
//       "|\\r?\\n|\\r|^)" +
//       // Quoted fields.
//       '(?:"([^"]*(?:""[^"]*)*)"|' +
//       // Standard fields.
//       '([^"\\' +
//       strDelimiter +
//       "\\r\\n]*))",
//     "gi"
//   );

//   // Create an array to hold our data. Give the array
//   // a default empty first row.
//   var arrData = [[]];

//   // Create an array to hold our individual pattern
//   // matching groups.
//   var arrMatches = null;

//   // Keep looping over the regular expression matches
//   // until we can no longer find a match.
//   while ((arrMatches = objPattern.exec(strData))) {
//     // Get the delimiter that was found.
//     var strMatchedDelimiter = arrMatches[1];

//     // Check to see if the given delimiter has a length
//     // (is not the start of string) and if it matches
//     // field delimiter. If id does not, then we know
//     // that this delimiter is a row delimiter.
//     if (strMatchedDelimiter.length && strMatchedDelimiter != strDelimiter) {
//       // Since we have reached a new row of data,
//       // add an empty row to our data array.
//       arrData.push([]);
//     }

//     // Now that we have our delimiter out of the way,
//     // let's check to see which kind of value we
//     // captured (quoted or unquoted).
//     if (arrMatches[2]) {
//       // We found a quoted value. When we capture
//       // this value, unescape any double quotes.
//       var strMatchedValue = arrMatches[2].replace(new RegExp('""', "g"), '"');
//     } else {
//       // We found a non-quoted value.
//       var strMatchedValue = arrMatches[3];
//     }

//     // Now that we have our value string, let's add
//     // it to the data array.
//     arrData[arrData.length - 1].push(strMatchedValue);
//   }

//   // Return the parsed data.
//   return arrData;
// }

// function addDensity(data) {

//   // the geometry that will contain all our cubes
//   var geom = new THREE.Geometry();
//   // material to use for each of our elements. Could use a set of materials to
//   // add colors relative to the density. Not done here.
//   var cubeMat = new THREE.MeshLambertMaterial({ color: 0x000000, opacity: 0.6, emissive: 0xffffff });
//   for (var i = 0; i < data.length - 1; i++) {

//       //get the data, and set the offset, we need to do this since the x,y coordinates
//       //from the data aren't in the correct format
//       // var x = parseInt(data[i][0])+180;
//       // var y = parseInt((data[i][1])-84)*-1;
//       var x = parseInt(data[i][0]);
//       var y = parseInt((data[i][1]));
//       var value = parseFloat(data[i][2]);

//       // calculate the position where we need to start the cube
//       var position = latLongToVector3(y, x, 600, 2);

//       // create the cube
//       var cube = new THREE.Mesh(new THREE.CubeGeometry(5, 5, 1 + value / 8, 1, 1, 1, cubeMat));

//       // position the cube correctly
//       cube.position = position;
//       cube.lookAt(new THREE.Vector3(0, 0, 0));

//       // merge with main model
//       // console.log(x)
//       // if (y>41  && y<50 && x>360 && x<380 x*x + y*y){
//       // if (Math.pow((x-360),2) + Math.pow((y-50),2)<20){
//       THREE.GeometryUtils.merge(geom, cube);
//       // }
//       // scene.add(cube);
//   }

//   // create a new mesh, containing all the other meshes.
//   var total = new THREE.Mesh(geom, new THREE.MeshFaceMaterial());
//   // console.log(x)
//   // and add the total mesh to the scene

//   scene.add(total);

// }
