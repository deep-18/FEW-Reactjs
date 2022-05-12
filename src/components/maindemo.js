import React, { useEffect, useState } from 'react';
import '../utils/webfonts/font.css';
import '../utils/util.css';
import { Canvas } from '@react-three/fiber';
import { Html, useGLTF } from '@react-three/drei';
import Header from "./header";

import modelPath from '../assets/home_model.glb';

// const Model = () => {
//     const gltf = useGLTF(modelPath, true)
//     return (
//         <primtive object={gltf.scene} dispose={null}/>
//     )
// }

// const HTMLContent = () => {
//     return (
//         <div>
//         <Model/>
//         <Html fullscreen>
//             <div className="loader">
//                 <h2 className="loading-pr">LOADING</h2>
//             </div>
//             <div className="hero-title">
//                 <div className="inner-hero"><h1 className="titles">CRAFTING THE MOST SLICK &</h1></div>
//                 <div className="inner-hero"><h1 className="titles">COMFORTING FURNITURE YOU WILL EVER SEE</h1></div>
//             </div>
//             <div className="selector">
//                 <div className="title-box"><h3 className="item-sofa">SOFA</h3></div>
//                 <div className="title-box"><h3 className="item-chair">CHAIR</h3></div>
//                 <div className="title-box"><h3 className="item-table">TABLE</h3></div>
//             </div>
//         </Html>
//         </div>
//     )
// }
const Main = () => {
    return(
        <div>
            <Header/>
            <Canvas camera={{position: [0, 0, 6], fov: 50 }}>
                <mesh>
                    <boxBufferGeometry attach="geometry" args={[10,10,10]}/>
                    <meshStandardMaterial attach="material" />
                </mesh>
                {/* <HTMLContent /> */}
            </Canvas>
        </div>
    )
}
export default Main;