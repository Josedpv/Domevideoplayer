//Dependencies Webpack  and threeJS, npm install webpack webpack-cli, npm install threeJS
// npm run-script build to compile, work on this file.
// dont change package.json
 

//Llamada de la librerias
const THREE = require('three');
// CommonJS:
const dat = require('dat.gui');
const Stats = require('stats.js');
 /*****************************START ADDED CODE***************/
      import { Examples, ParticleEngine } from 'js/ParticleEngine.js';
     /*****************************FINISH ADDED CODE**************/




import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
//Model loaders
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
//Basis Texture loader
import { BasisTextureLoader } from 'three/examples/jsm/loaders/BasisTextureLoader.js';

import CameraControls from 'camera-controls';


// CameraControls.install( { THREE: THREE } );
const canvas = document.getElementById('canvas');
const clock = new THREE.Clock();
 // Optional: Pre-fetch Draco WASM/JS module.
// dracoLoader.preload();
//Scene and render
var renderer, scene, bgScene, camera, cameraControls;
var bgMesh;
var engine;
var controls;
var mixer, mixer2,mixerCap;
//Lights
var spotLight, light, hemisLight;
var spotLightHelper;
//Skybox
var materiall;
var Skybox;
var video;
var guiALLF4;
var guiALLF24;

//Interface
var gui;
var obj;
var stats;
var childd;
var childdd;
function init() 
{
	
	//DAT GUI
	gui = new dat.gui.GUI();
	obj = {
		explode: function () {
		alert('Bang!');
		},
	
		//spotlight
		posX: -25, 
		posY: 8, 
		posZ: 7,
		colorL: "#ffffff", // RGB array
		penunmbra: 0.2,
		helpSpot:true,
		intSpot:1,
		
		intAmbien:1,
		color0: "#443333", 
		intHemis:1,
		colorg: "#111122", 
	};
	
	renderer = new THREE.WebGLRenderer({ canvas });
	scene = new THREE.Scene();
    // scene.fog = new THREE.Fog( 0x443333, 1, 4 );
 /*****************************START ADDED CODE***************/
       var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
	var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 2, FAR = 5000;
	camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
     /*****************************FINISH ADDED CODE**************/
		
	
	
	//Lights
	// spotLight = new THREE.SpotLight( 0xffff00 );
	light = new THREE.AmbientLight( obj.color0 ); // soft white light
	hemisLight = new THREE.HemisphereLight( obj.color0, obj.colorg, 1 );
	

	stats = new Stats();
}

function addLights() 
{
	
	//Hemisphere light
	scene.add( hemisLight );
	spotLight = new THREE.SpotLight();
    spotLight.angle = Math.PI / 16;
    spotLight.penumbra = 0.5;
    spotLight.castShadow = true;
    spotLight.position.set( obj.posX, obj.posY, obj.posZ );
	scene.add( spotLight );
	spotLightHelper = new THREE.SpotLightHelper( spotLight );
	//scene.add( spotLightHelper );
	//fireworklight
	var light = new THREE.PointLight(0xffffff);
	light.position.set(0,250,0);
	scene.add(light);
}


function main() {

	
	//Renderer
	renderer.setClearColor(0x222222);
	renderer.autoClearColor = false;
    renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.outputEncoding = THREE.sRGBEncoding;
	//renderer.gammaOutput = true;
    renderer.gammaFactor = 2.2;
   // renderer.shadowMap.enabled = true;
//	renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
	
	//Camera
	camera.position.x = 14;
	camera.position.y = 2;
	camera.position.z = 6;
	camera.lookAt( 0, 0.1, 0 );
    controls = new OrbitControls( camera, renderer.domElement );

	addLights();

	//Models
	// loadDraco('model/draco/alocasia_s.drc');
	// loadGLTF('model/glb/Flamingo.glb', [-2, 2, 1], [0.01, 0.01, 0.01]);
	/// 
	/*
	loadGLTF('model/gltf/capoeira/Capoeira.gltf', [1, 0, 0], [0.01, 0.01, 0.01]).then(function(gltff){
		console.log('termine gltf!');
		mixerCap = new THREE.AnimationMixer( gltff.scene );
		var action = mixerCap.clipAction( gltff.animations[ 0 ] );
		action.play();
		
	}).catch(function (err) {
		console.log(err);
		
	});/*
    loadGLTFF('model/gltf/GLTFMATCAP/scene.gltf', [1, 0, 0], [0.5, 0.5, 0.5]).then(function(gltf){
		console.log('termine gltf!');
		mixerCap = new THREE.AnimationMixer( gltf.scene );
		var action = mixerCap.clipAction( gltf.animations[ 0 ] );
		action.play();
		
	}).catch(function (err) {
		console.log(err);
	});/*
	loadGLTFF('model/gltf/miguelangelo/scene.gltf', [1, 0, 0], [0.5, 0.5, 0.5]).then(function(gltf){
		console.log('termine gltf!');
		mixerCap = new THREE.AnimationMixer( gltf.scene );
		var action = mixerCap.clipAction( gltf.animations[ 0 ] );
		action.play();
		
	}).catch(function (err) {
		console.log(err);
	});/*
	loadFBX('model/fbx/avatar1.fbx', [2, 0, -1], [0.01, 0.01, 0.01]).then(function(obj1){
		// console.log('termine!');
		mixer = new THREE.AnimationMixer( obj1 );
		var action = mixer.clipAction( obj1.animations[ 0 ] );
		action.play();
		
	})
	//*/
	 /*****************************START ADDED CODE***************/
	 
	 //create video
	 
	
	

        var floorTexture = new THREE.TextureLoader().load( 'images/checkerboard.jpg' )
	floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping; 
	floorTexture.repeat.set( 10, 10 );
	
	var plane = new THREE.Mesh(
        new THREE.PlaneBufferGeometry( 30, 30 ),
		new THREE.MeshPhongMaterial( { color: 0x999999, specular: 0x101010, map: floorTexture, side: THREE.DoubleSide} )
		);
    plane.rotation.x = - Math.PI / 2;
    plane.receiveShadow = true;
	scene.add( plane );




	
	addGUIChooseSkybox();
	addGUIChooseSkyboxTime ();
	
	addSkybox(0,false);//Create animated sky

	//SkyTimeWarp(0);
	//addGUI();
	
	addGUISkyboxproperties();
	
     /*****************************FINISH ADDED CODE**************/
	
	
}
 /*****************************START ADDED CODE***************/
        function addGUISkyboxproperties(){//Create animated sky
	
			stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
			document.body.appendChild( stats.dom );
	
	var guiSLSky = gui.addFolder('Skybox Properties');
	guiSLSky.add(materiall, 'roughness').min(0).max(1).step(0.1).onChange(function (val) {
		materiall.roughness = val;
		//materiall.update();
	});
	guiSLSky.add(materiall, 'metalness').min(0).max(1).step(0.1).onChange(function (val) {
		materiall.metalness = val;
		//materiall.update();

	});
	

}
function addGUIChooseSkybox (){
	var parameters = 
   {
		four_minutes:   function() { addSkybox( 0, true ); },
		twentyfour_minutes:   function() { addSkybox(  1, true ); },
	
   };
  var guiALL= gui.addFolder('Choose Video');
   guiALL.add( parameters, 'four_minutes'   ).name("Short Video (4)");
   guiALL.add( parameters, 'twentyfour_minutes'   ).name("Long Video (24)");
   

}
function addSkybox(num,	isnotfirsttime){//Create animated sky

	if (num== 0){// 4 minutes video
		video= document.createElement('video');
		video.load();
		video.autoplay= true; 
		video.needsUpdate= true;
		video.loop	= true;
		video.src	= "images/Amanecer.mp4";
		video.volume	= 0;
		video.playbackRate=0.066;//4 minutos /60minutos = 0.066
		
		video.play();
		video.currentTime=0 ;
		
		
		guiALLF4.show();			
		guiALLF24.hide();
		guiALLF24.close();
		
	
	} 
	if (num== 1){ // 24 minutes video
		video= document.createElement('video');
		video.load();
		video.autoplay= true; 
		video.needsUpdate= true;
		video.loop	= true;
		video.src	= "images/Sky.mp4";
		video.volume	= 0;
		video.playbackRate= 0.4;//24 minutos /60minutos = 0.4
		
		video.play();
		
			guiALLF4.hide();
			guiALLF24.show();
			guiALLF4.close();
	} 
	

	var texture;
	
	
	texture = new THREE.VideoTexture( video );
	
	

    var skyGeo;
    //add sphere
	skyGeo=	new THREE.SphereGeometry( 300, 30, 30 );
	
	//adding the video to the sphere
 	//var material = new THREE.MeshBasicMaterial({ map: texture,});
     materiall = new THREE.MeshStandardMaterial( {

    //color: 0xffffff,

    roughness: 1,
    metalness: 1,
    map: texture,

	} );
	if (isnotfirsttime){
		
	 
		scene.remove( Skybox );
	}
	
	 Skybox = new THREE.Mesh(skyGeo, materiall);
	// put the video both sides of the sphere
	Skybox.material.side = THREE.DoubleSide;
	//Skybox.Side = THREE.DoubleSide;
	//add sky
	scene.add(Skybox);
}
function SkyTimeWarp(TimeWarp,VideoTime){//Create animated sky

	//choose the video
	if (VideoTime== 0){
	
		SkyTimeWarp_4min(TimeWarp);
		 
	} 
	if (VideoTime== 1){
		SkyTimeWarp_24min(TimeWarp) ;
	} 	
}
function SkyTimeWarp_4min(num){//Create animated sky

	//choose the video
	if (num== 0){
	
		video.currentTime=0 ;
		 
	} 
	if (num== 1){
		video.currentTime=60 ;
	} 
	if (num==2){
	
		video.currentTime=120 ;
	} 
	if (num==3){
	
		video.currentTime=180 ;
	} 
	
	
}
function SkyTimeWarp_24min(num){//Create animated sky

	//choose the video
	if (num== 0){
	
		video.currentTime=0 ;
		 
	} 
	if (num== 1){
		video.currentTime=360 ;
	} 
	if (num==2){
	
		video.currentTime=720 ;
	} 
	if (num==3){
	
		video.currentTime=1080 ;
	} 
	
	
}
     /*****************************FINISH ADDED CODE**************/


 /*****************************START ADDED CODE***************/
        

function addGUIChooseSkyboxTime (){
	
	var parameters4 = 
   {
		sunrise:   function() { SkyTimeWarp( 0, 0 ); },
		day:   function() { SkyTimeWarp(  1, 0 ); },
		sunset:   function() { SkyTimeWarp( 2, 0  ); },			
		nigth:   function() { SkyTimeWarp( 3, 0 ); }
   };
   var parameters24 = 
   {
		sunrise:   function() { SkyTimeWarp( 0, 1 ); },
		day:   function() { SkyTimeWarp(  1, 1 ); },
		sunset:   function() { SkyTimeWarp( 2, 1  ); },			
		nigth:   function() { SkyTimeWarp( 3, 1 ); }
   };
   guiALLF4= gui.addFolder('Time Warp 4');
   guiALLF4.add( parameters4, 'sunrise'   ).name("Sunrise");
   guiALLF4.add( parameters4, 'day'   ).name("Day");
   guiALLF4.add( parameters4, 'sunset'   ).name("Sunset"); 
   guiALLF4.add( parameters4, 'nigth'   ).name("Nigth");
  
   guiALLF24= gui.addFolder('Time Warp 24');
   guiALLF24.add( parameters24, 'sunrise'   ).name("Sunrise");
   guiALLF24.add( parameters24, 'day'   ).name("Day");
   guiALLF24.add( parameters24, 'sunset'   ).name("Sunset"); 
   guiALLF24.add( parameters24, 'nigth'   ).name("Nigth");
   
}

     /*****************************FINISH ADDED CODE**************/
function loadFBX(path,pos,scale) {
	const promise = new Promise(function (resolve, reject) {
		var loader = new FBXLoader();
		loader.load( path, function ( object ) {
	
			console.log(object);
			object.scale.set(scale[0], scale[1], scale[2]);
			object.position.set(pos[0], pos[1], pos[2]);
				
			object.traverse( function ( child ) {
				if ( child.isMesh ) {
					child.castShadow = true;
					child.receiveShadow = true;
				}
			} );
			scene.add( object );
			console.log(object);
			if (object == null) {
				reject();
			}else{
				resolve(object);
			}
	
		} );
		
	})
	return promise;
}

function loadGLTF(path, pos,scale) {
	return new Promise((resolve, reject)=>{

		// Instantiate a loader
		var loader = new GLTFLoader();
	
		// Optional: Provide a DRACOLoader instance to decode compressed mesh data
		var dracoLoader = new DRACOLoader();
		// dracoLoader.setDecoderPath( '/examples/js/libs/draco/' );
		dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
		loader.setDRACOLoader( dracoLoader );
	
		// Load a glTF resource
		loader.load(
			// resource URL
			path,
			// called when the resource is loaded
			function ( gltf ) {
				//Transformations
				gltf.scene.scale.set(scale[0], scale[1], scale[2]);
				gltf.scene.position.set(pos[0], pos[1], pos[2]);
				gltf.scene.castShadow = true;
				gltf.scene.receiveShadow = true;
				gltf.scene.traverse( function ( child ) {
					if ( child.isMesh ) {
						child.castShadow = true;
						child.receiveShadow = true;
					}
				} );
				scene.add( gltf.scene );
				console.log(gltf);
				
				gltf.animations; // Array<THREE.AnimationClip>
				gltf.scene; // THREE.Group
				gltf.scenes; // Array<THREE.Group>
				gltf.cameras; // Array<THREE.Camera>
				gltf.asset; // Object
				
				resolve(gltf);
	
			},
			// called while loading is progressing
			function ( xhr ) {
	
				console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	
			},
			// called when loading has errors
			function ( error ) {
	
				console.log( 'An error happened' );
				reject(error);
			});	
	});
}
 /*****************************START ADDED CODE***************/
        
function loadGLTFF(path, pos,scale) {
	
	return new Promise((resolve, reject)=>{

		// Instantiate a loader
		var loader = new GLTFLoader();
	
		// Optional: Provide a DRACOLoader instance to decode compressed mesh data
		var dracoLoader = new DRACOLoader();
		// dracoLoader.setDecoderPath( '/examples/js/libs/draco/' );
		dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
		loader.setDRACOLoader( dracoLoader );
	
		// Load a glTF resource
		loader.load(
			// resource URL
			path,
			// called when the resource is loaded
			function ( gltf ) {
				//Transformations
				gltf.scene.scale.set(scale[0], scale[1], scale[2]);
				gltf.scene.position.set(pos[0], pos[1], pos[2]);
				gltf.scene.castShadow = true;
				gltf.scene.receiveShadow = true;
				gltf.scene.traverse( function ( child ) {
					
					if ( child.isMesh ) {
						child.castShadow = true;
						child.receiveShadow = true;
					}
					if(child instanceof THREE.Mesh){
						
						child.material.emissive;//= new THREE.Color( 0xfff);
						child.material.emissiveIntensity ;console.log(child.material);
						
						
					}childdd=child;
				} );
				scene.add( gltf.scene );
				childd=gltf.scene;
				console.log(gltf);
				addGUIGLTF();
				gltf.animations; // Array<THREE.AnimationClip>
				gltf.scene; // THREE.Group
				gltf.scenes; // Array<THREE.Group>
				gltf.cameras; // Array<THREE.Camera>
				gltf.asset; // Object

				
				resolve(gltf);
	
			},
			// called while loading is progressing
			function ( xhr ) {
	
				console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	
			},
			// called when loading has errors
			function ( error ) {
	
				console.log( 'An error happened' );
				reject(error);
			});	
	});
}
function addGUIGLTF(){//Create animated sky
	
	
	
	var guigltf = gui.addFolder('GLTF');
	guigltf.add(childdd.material, 'emissiveIntensity').min(0).max(1).step(0.1).onChange(function (val) {
		
		childd.traverse( function ( child ) {
					
			if ( child.isMesh ) {
				child.castShadow = true;
				child.receiveShadow = true;
			}
			if(child instanceof THREE.Mesh){
				
				
				child.material.emissiveIntensity = val;
			}
		});
	}).name('Intensity');
	guigltf.addColor(childdd.material, 'emissive').onChange(function (val) {
		
		childd.traverse( function ( child ) {
					
			if ( child.isMesh ) {
				child.castShadow = true;
				child.receiveShadow = true;
			}
			if(child instanceof THREE.Mesh){
				
				child.material.emissive=val;
				
			}
		});
	}).name('Emissive');

	
	guigltf.add(childdd.material, 'emissiveIntensity').min(0).max(1).step(0.1).onChange(function (val) {
		
		childd.traverse( function ( child ) {
					
			if ( child.isMesh ) {
				child.castShadow = true;
				child.receiveShadow = true;
			}
			if(child instanceof THREE.Mesh){
				
				
				child.material.matcap = val;
			}
		});
	}).name('Map');
	
	
}

     /*****************************FINISH ADDED CODE**************/
function loadDraco(path) {
	var dracoLoader = new DRACOLoader();
	// It is recommended to always pull your Draco JavaScript and WASM decoders
	// from this URL. Users will benefit from having the Draco decoder in cache
	// as more sites start using the static URL.
	dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
	
	dracoLoader.setDecoderConfig( { type: 'js' } );

	dracoLoader.load( path, function ( geometry ) {

		geometry.computeVertexNormals();

		var material = new THREE.MeshStandardMaterial( { color: 0x606060 } );
		var mesh = new THREE.Mesh( geometry, material );
		mesh.castShadow = true;
		mesh.receiveShadow = true;
		// mesh.position.y = 0.3;
		scene.add( mesh );

		// Release decoder resources.
		dracoLoader.dispose();

	} );
}

function loadBasisTexture(path){
	return new Promise((resolve, reject)=>{
		var material = new THREE.MeshStandardMaterial();
		var loader = new BasisTextureLoader();
		loader.setTranscoderPath( 'js/libs/basis/' );
		loader.detectSupport( renderer );
		loader.load( path, function ( texture ) {
	
			texture.encoding = THREE.sRGBEncoding;
			material.map = texture;
			material.needsUpdate = true;
			resolve (material);
	
		}, undefined, function ( error ) {
			console.error( error );
			reject (error);
		} );
		
	})

}

function displayWindowSize(){
	// Get width and height of the window excluding scrollbars
	var w = document.documentElement.clientWidth;
	var h = document.documentElement.clientHeight;
	
	// Display result inside a div element
	// console.log("Width: " + w + ", " + "Height: " + h);
	renderer.setSize(w, h);
	// camera.fov = Math.atan(window.innerHeight / 2 / camera.position.z) * 2 * THREE.Math.RAD2DEG;
	camera.aspect = w / h;
	camera.updateProjectionMatrix();
}

// Attaching the event listener function to window's resize event
window.addEventListener("resize", displayWindowSize);
// document.addEventListener( 'keydown', onKeyDown, false );
// document.addEventListener( 'keyup', onKeyUp, false );

function animate() 
{
	
/*
	// const hasControlsUpdated = cameraControls.update( delta );
	requestAnimationFrame(animate);
	render();
	renderer.render(scene, camera);
	var dt = clock.getDelta();
	engine.update( dt * 0.5);
	controls.update();
	stats.update();	
	//controls.update();
	
   */
  requestAnimationFrame(animate);
  render();
  renderer.render(scene, camera);
  controls.update();
  stats.update();
  var dt = clock.getDelta();
  	
  //controls.update();
}


function render() 
{
	const delta = clock.getDelta();
	//Para la animacion
	if ( mixer ) mixer.update( delta );
	if ( mixer2 ) mixer2.update( delta );
	if ( mixerCap ) mixerCap.update( delta );
	
	
}

init();
main();
animate();
