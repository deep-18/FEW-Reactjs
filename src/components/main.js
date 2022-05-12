import React, { useEffect, useState } from 'react';
import '../utils/webfonts/font.css';
import '../utils/util.css';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import anime from 'animejs';
import hdriPath from '../assets//hdri.hdr';
import modelPath from '../assets/home_model.glb';
import texturePath from '../assets/Rug_004_normal.jpg';
import Header from "./header";

const Main = () => {
    const [loaderT,setLoaderT] = useState(0);
useEffect(() => {
    let camera, scene, renderer, loader, loadingScreen, loadingPR;
    let model = new THREE.Mesh();
    
    const app = document.querySelector('.threejs-main');
    
    const chair = document.querySelector('.item-chair');
    const sofa = document.querySelector('.item-sofa');
    const table = document.querySelector('.item-table');
    
    scene = new THREE.Scene();
    
    
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.setPixelRatio( window.devicePixelRatio );
    app.appendChild( renderer.domElement );
    renderer.toneMapping = THREE.ReinhardToneMapping;
    renderer.toneMappingExposure = 0.9;
    
    camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 0.1, 1000);
    
    function isMobile() {
        const isAndroid = /Android/i.test(navigator.userAgent);
        const isiOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
        return isAndroid || isiOS;
    }
    const mobile = isMobile();
    
    const ambientLight = new THREE.AmbientLight(0xFFEAEE,0.6);
    scene.add(ambientLight);
    
    const hemiLight = new THREE.HemisphereLight(0xAFC8D5, 0xc9822c, 0.1);
    scene.add(hemiLight);
    
    const dirLight = new THREE.DirectionalLight(0xFFEAEE, 0.3);
    scene.add(dirLight);
    
    const spotLight = new THREE.SpotLight(0xffffff, 10, 20, 0.15, 0.1);
    spotLight.position.set(-10, 6, -4)
    spotLight.castShadow = true;
    scene.add(spotLight);
    
    const lamp = new THREE.SpotLight(0xffff00, 2, 7, 0.5, 1);
    lamp.position.set(-1.1, 2.36, -5.22);
    lamp.target.position.set(-1.1, 0, -5);
    lamp.target.updateMatrixWorld();
    lamp.castShadow = true;
    scene.add(lamp);
    
    const pointLamp = new THREE.PointLight(0xffff00, 0.3);
    pointLamp.position.set(-1.1, 2, -5.22);
    pointLamp.castShadow = true;
    scene.add(pointLamp);
    
    camera.position.set( 0, 0, 6 );
    
    const manager = new THREE.LoadingManager();
    
    manager.onStart = () => {
        loadingScreen = document.querySelector('.loader');
    }
    
    manager.onProgress = (url, itemsLoaded, itemsTotal) => {
        loadingPR = document.querySelector('.loading-pr');
        setLoaderT(Math.floor((itemsLoaded/itemsTotal) * 100));
    }
    
    manager.onLoad = () => {
        if(loadingScreen){
            loadingScreen.classList.add('close');
        }
    }
    
    new RGBELoader( manager ).load( hdriPath, async function ( texture ) {
            const pmremGenerator = new THREE.PMREMGenerator( renderer );
            pmremGenerator.compileEquirectangularShader();
            const envMap = pmremGenerator.fromEquirectangular( texture ).texture;
        
            scene.background = envMap;
            scene.environment = envMap;
            
            loader = new GLTFLoader( manager );
            loader.load(modelPath, (gltf) => {
                model.add(gltf.scene);
                scene.add(model);
                model.traverse(child => {
                    if(child.name == "rug_plane"){
                        child.material.normalMap = new THREE.TextureLoader( manager ).load(texturePath)
                        child.material.normalScale = new THREE.Vector2(3, 3)
                    }
                })
                model.position.set(0, -1, -1);
            });
    
            if(model){
                const textWrapper = document.querySelectorAll('.titles');
                textWrapper.forEach((t) => {
                    t.innerHTML = t.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
                })
                
                if(mobile){
                    await loadAnim();
                    
                    let tl = anime.timeline({
                        easing: 'easeInOutSine'
                    })
                    tl.add({
                        targets: '.titles .letter',
                        opacity: [0,1],
                        duration: 400,
                        delay: 1300,
                        easing: 'easeOutSine'                
                    })
                    tl.add({
                        targets: '.titles .letter',
                        translateY: [400,-50],
                        duration: 2000,
                        delay: anime.stagger(10),
                        easing: 'easeOutSine'
                    })
                    .add({
                        targets: '.title-box h3',
                        translateY: [400, 0],
                        duration: 2000,
                        delay: anime.stagger(100)
                    },'-=1900')
                }else{
                    await loadAnim();
                    
                    let tl = anime.timeline({
                        easing: 'easeInOutSine'
                    })
                    tl.add({
                        targets: '.titles .letter',
                        opacity: [0,1],
                        duration: 400,
                        delay: 1300,
                        easing: 'easeOutSine'                
                    })
                    tl.add({
                        targets: '.titles .letter',
                        translateY: [400,'-100%'],
                        duration: 2000,
                        delay: anime.stagger(10),
                        easing: 'easeOutSine'
                    })
                    .add({
                        targets: '.title-box h3',
                        translateY: [400, 0],
                        duration: 2000,
                        delay: anime.stagger(100)
                    },'-=1900')
                }
                
            }
            
    
    });
    
    window.addEventListener("resize",function()
    {
        let width = window.innerWidth;
        let height = window.innerHeight;
        renderer.setSize(width, height);
        camera.aspect = width/height;
        camera.updateProjectionMatrix();
    });
    
    let loadingTimer = 0
    function loadAnim(){
        function easeInOutSine (t, b, c, d) {
            return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
        }
        if(mobile){
            if(camera.position.z > 1.3 && camera.position.z <= 6){
                loadingTimer +=0.01;
                camera.position.z = easeInOutSine(loadingTimer, 6, -5.7, 1 );
                camera.position.y = easeInOutSine(loadingTimer, 0, 0.3, 1 );
                if(loadingTimer > 1 || camera.position.z <= 1.3) {
                    cancelAnimationFrame(loadAnim)
                    return false  
                } 
            }
            requestAnimationFrame(loadAnim)
        }
        else{
            if(camera.position.z > 0.3 && camera.position.z <= 6){
                loadingTimer +=0.01;
                camera.position.z = easeInOutSine(loadingTimer, 6, -5.7, 1 );
                if(loadingTimer > 1 || camera.position.z <= 0.35) {
                    cancelAnimationFrame(loadAnim)
                    return false  
                } 
            }
            requestAnimationFrame(loadAnim)
        }
    }
    
    if(chair){
        chair.addEventListener('click', () => {
            anime({
                targets: camera.position,
                x: 1,
                y: 0,
                z: -1.3,
                easing: 'easeInOutSine',
                duration: 1000,
            })
            anime({
                targets: camera.rotation,
                x: 0,
                y: Math.PI/4,
                z: 0,
                easing: 'easeInOutSine',
                duration: 1000,
            })
        })
    }
    
    if(sofa){
    
        sofa.addEventListener('click', () => {
            if(mobile){
                anime({
                    targets: camera.position,
                    x: -1.5,
                    y: 0.3,
                    z: -0.5,
                    easing: 'easeInOutSine',
                    duration: 1000,
                })
                anime({
                    targets: camera.rotation,
                    x: 0,
                    y: -Math.PI/6,
                    z: 0,
                    easing: 'easeInOutSine',
                    duration: 1000,
                })
            }
            else{
                anime({
                    targets: camera.position,
                    x: 0.5,
                    y: 0,
                    z: -2,
                    easing: 'easeInOutSine',
                    duration: 1000,
                })
                anime({
                    targets: camera.rotation,
                    x: 0,
                    y: -Math.PI/8,
                    z: 0,
                    easing: 'easeInOutSine',
                    duration: 1000,
                })
            }
        })
    }
    
    if(table){
    
        table.addEventListener('click', () => {
            if(mobile){
                anime({
                    targets: camera.position,
                    x: -1.5,
                    y: 0,
                    z: -2.8,
                    easing: 'easeInOutSine',
                    duration: 1200,
                })
                anime({
                    targets: camera.rotation,
                    x: 0,
                    y: -Math.PI/2,
                    z: 0,
                    easing: 'easeInOutSine',
                    duration: 1200,
                })
            }
            else{
                anime({
                    targets: camera.position,
                    x: -1.1,
                    y: 0,
                    z: -3,
                    easing: 'easeInOutSine',
                    duration: 1200,
                })
                anime({
                    targets: camera.rotation,
                    x: 0,
                    y: -Math.PI/2,
                    z: 0,
                    easing: 'easeInOutSine',
                    duration: 1200,
                })
            }
        })
    }
    
    function animate() {
    
        requestAnimationFrame( animate );
        renderer.render( scene, camera );
    }
    
    animate();
}, [])
    return(
        <div className="threejs-main">
            <Header color="#411811"/>
            <div className="loader">
            <h2><span className="loading-pr">{loaderT}</span>%</h2>
            </div>
            <div className="hero-title">
                <div className="inner-hero"><h1 className="titles">CRAFTING THE MOST SLICK &</h1></div>
                <div className="inner-hero"><h1 className="titles">COMFORTING FURNITURE YOU WILL EVER SEE</h1></div>
            </div>
            <div className="selector">
                <div className="title-box"><h3 className="item-sofa">SOFA</h3></div>
                <div className="title-box"><h3 className="item-chair">CHAIR</h3></div>
                <div className="title-box"><h3 className="item-table">TABLE</h3></div>
            </div>
        </div>
    )
}
export default Main;