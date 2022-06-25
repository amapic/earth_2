import { GLTFExporter } from './nodes_modules/three/examples/jsm/exporters/GLTFExporter';
const exporter = new GLTFExporter();
// var AA=require('src/components/Tank')
// Parse the input and generate the glTF output
exporter.parse(
	AA,
	// called when the gltf has been generated
	function ( gltf ) {

		console.log( gltf );
		downloadJSON( gltf );

	},
	// called when there is an error in the generation
	function ( error ) {

		console.log( 'An error happened' );

	},
	options
);

import  fs from 'fs'
const exporter = new GLTFExporter();
import Tank from './Tank'
import { CylinderBufferGeometry, Vector3 } from "three";


function ab2str(buf) {
    return String.fromCharCode.apply(null, new Uint16Array(buf));
}
function str2ab(str) {
    var buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
    var bufView = new Uint16Array(buf);
    for (var i=0, strLen=str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
    }
    return buf;
}            
function exportGLTF( input ) {
 console.log("tttttttttttt")
                  const gltfExporter = new GLTFExporter();
                  const params = {
                                     trs: false,
                                     onlyVisible: true,
                                     truncateDrawRange: true,
                                    binary: false,
                                     maxTextureSize: 4096
                                  
                                };
  
                const options = {
                     trs: params.trs,
                     onlyVisible: params.onlyVisible,
                      truncateDrawRange: params.truncateDrawRange,
                   binary: params.binary,
                     maxTextureSize: params.maxTextureSize
                 };
                gltfExporter.parse(
                       input,
                      function ( result ) {
  
                          if ( result instanceof ArrayBuffer ) {
   
                               fs.writeFile(  'sceneFFF.glb',ab2str(result),() =>{});
 
                         } else {
  
                               const output = JSON.stringify( result, null, 2 );
                              console.log( output );
                              fs.writeFile(  'error.txt',output,() =>{});
   
                         }
  
                       },
                      
                     options
                   );
                      }  

