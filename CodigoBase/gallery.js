//gallery

import * as THREE 			from 'three';
import { GLTFLoader } 		from 'glTF-loaders';
import { FlyControls } 		from 'fly-control';
import {RectAreaLightUniformsLib} from '/Assets/scripts/three.js/examples/jsm/lights/RectAreaLightUniformsLib.js';
import {RectAreaLightHelper} from '/Assets/scripts/three.js/examples/jsm/helpers/RectAreaLightHelper.js';


let 	scene,
		renderer,
		camera,
		camControl;
	

const 	rendSize 		= new THREE.Vector2();

const 	clock 			= new THREE.Clock();


/// ***************************************************************
/// ***                                                          **
/// ***************************************************************

function init() {

	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setClearColor(new THREE.Color(0.878,1.,1.));

	rendSize.x = window.innerWidth - 20.0 ;
	rendSize.y = window.innerHeight - 20.0;

	renderer.setSize(rendSize.x, rendSize.y);
	renderer.shadowMap.enabled 	= true;
	renderer.shadowMap.type 	= THREE.PCFSoftShadowMap; 
	RectAreaLightUniformsLib.init();

	document.body.appendChild(renderer.domElement);

	scene 	= new THREE.Scene();
	camera = new THREE.PerspectiveCamera( 55, window.innerWidth / window.innerHeight, 0.1, 1000 );
	camera.position.set( 0, 3, 8);

	camControl = new FlyControls(camera, renderer.domElement);
	camControl.movementSpeed = 3.0;
	camControl.rollSpeed = 0.3;

	 
	const gltfLoader = new GLTFLoader();
	//Load Mesh horses
	gltfLoader.load('../models/bust_horse/scene.gltf', onLoadMeshThre);
	gltfLoader.load('../models/bronze_horse/scene.gltf', onLoadMeshOne);
	gltfLoader.load('../models/argile_horse/scene.gltf', onLoadMeshTwo);
	gltfLoader.load('../models/steel_horse/scene.gltf', onLoadMeshFour);

	//Load Mesh Pictures
	gltfLoader.load('../models/frames/scene.gltf', onLoadMeshFr);
	gltfLoader.load('../models/frames2/scene.gltf', onLoadMeshFr2);
	gltfLoader.load('../models/frames3/scene.gltf', onLoadMeshFr3);
	gltfLoader.load('../models/frame4/scene.gltf', onLoadMeshFr4);
	gltfLoader.load('../models/frame5/scene.gltf', onLoadMeshFr5);
	// Load Mesh gallery
	gltfLoader.load('../models/vr_gallery/scene.gltf', function onLoadMeshGallery(loadedMesh){
		const gallery = loadedMesh.scene;
		gallery.scale.set(2,2,2);
		
		gallery.traverse(function (node) {
			if (node.isMesh) {
				node.receiveShadow = true;
				node.material = new THREE.MeshStandardMaterial({
					color: node.material.color,
					map: node.material.map,
				});
			}
		});

		console.log(loadedMesh);
		scene.add(gallery);

	});

	initLight();
	renderer.clear();
    render();
};

/// ***************************************************************


function onLoadMeshOne(loadedMesh){
    const horse = loadedMesh.scene;
	horse.scale.set(0.25,0.25,0.25);
	horse.position.set( -7, 2.5, -9);

	horse.traverse(function (node) {
		if (node.isMesh) {
			node.castShadow = true; 
		}
	});
	// console.log(horse);
    scene.add(horse);
    render();
};

function onLoadMeshTwo(loadedMesh){
    const horse = loadedMesh.scene;
	horse.scale.set(0.2,0.2,0.2);
	horse.position.set( -7, -1.3, 0);
	horse.rotation.set(0,-1.5,0);
	horse.castShadow = true;

	horse.traverse(function (node) {
		if (node.isMesh) {
			node.castShadow = true; 
		}
	});
    scene.add(horse);
    render();
};
function onLoadMeshThre(loadedMesh){
    const horse = loadedMesh.scene;
	horse.scale.set(3.0,3.0,3.0);
	horse.position.set( 0, 2.5, 0);
	horse.rotation.set(0,-0.5,0);

	horse.traverse(function (node) {
        if (node.isMesh) {
            node.castShadow = true;
        }
    });
	console.log(horse);
    scene.add(horse);

};
function onLoadMeshFour(loadedMesh){
    const horse = loadedMesh.scene;
	horse.scale.set(5.0,5.0,5.0);
	horse.position.set( 7, 2.5, -9);
	horse.traverse(function (node) {
		if (node.isMesh) {
			node.castShadow = true;
			node.material = new THREE.MeshStandardMaterial({
				color: node.material.color,
				map: node.material.map,
			});
		}
	});

    scene.add(horse);
    render();
};

function onLoadMeshFr(loadedMesh){
    const frame = loadedMesh.scene;
	// frame.scale.set(0.5,0.5,0.5);
	frame.position.set( 3, 2.5, -9.9);

	frame.traverse(function (node) {
        if (node.isMesh) {
            node.receiveShadow = true;
        }
    });

    scene.add(frame);
    render();
};
function onLoadMeshFr2(loadedMesh){
    const frame = loadedMesh.scene;
	frame.scale.set(0.1,0.1,0.1);
	frame.position.set( -3, 2.5, -9.9);
	
    scene.add(frame);
    render();
};
function onLoadMeshFr3(loadedMesh){
    const frame = loadedMesh.scene;
	frame.scale.set(0.2,0.2,0.2);
	frame.position.set( 9, 1, 2);
	frame.rotation.set(0,-1.5,0);

	frame.traverse(function (node) {
		if (node.isMesh) {
			node.castShadow = true; 
		}
	});
    scene.add(frame);
    render();
};
function onLoadMeshFr4(loadedMesh){
    const frame = loadedMesh.scene;
	frame.scale.set(0.1,0.1,0.1);
	frame.position.set( 5, 2.5, 9.75);
	// console.log(frame);
    scene.add(frame);
    render();
};
function onLoadMeshFr5(loadedMesh){
    const frame = loadedMesh.scene;
	// frame.scale.set(0.1,0.1,0.1);
	frame.position.set( -5, 2.5, 9.8);
	frame.rotation.set(0,1.5,0);
    scene.add(frame);
    render();
};

/// ***************************************************************
function initLight() {
    // Luz Pontual
    const pLight 					= new THREE.PointLight(0xFFFFFF, 30);
    pLight.castShadow 				= true;
	pLight.shadow.mapSize.width 	= 1024; 
	pLight.shadow.mapSize.height 	= 1024;
    pLight.position.set(0,5, 1);

	const pLight2 					= new THREE.PointLight(0xFFFFFF, 30);
	pLight2.castShadow 				= true;
	pLight2.shadow.mapSize.width 	= 100; 
	pLight2.shadow.mapSize.height 	= 100; 
    pLight2.position.set(-5, 3, 0);
	
	const pLight3 					= new THREE.PointLight(0xFFFF00, 20);
	pLight3.castShadow 				= true;
	pLight3.shadow.mapSize.width 	= 1024; 
	pLight3.shadow.mapSize.height 	= 1024; 
    pLight3.position.set(-5, 3, -5);

	const pLight4 					= new THREE.PointLight(0xFFFF00, 20);
	pLight4.castShadow 				= true;
	pLight4.shadow.mapSize.width 	= 1024; 
	pLight4.shadow.mapSize.height 	= 1024; 
    pLight4.position.set(4, 3.0, -4);

	const pLight5 					= new THREE.PointLight(0xFFFFFF, 10.0,100);
	pLight5.castShadow 				= true;
	pLight5.shadow.mapSize.width 	= 1024; 
	pLight5.shadow.mapSize.height 	= 1024; 
    pLight5.position.set(3, 2.5, -10);

	const pLight6 					= new THREE.PointLight(0xFFFFFF, 10.0,100);
	pLight6.castShadow 				= true;
	pLight6.shadow.mapSize.width 	= 1024; 
	pLight6.shadow.mapSize.height 	= 1024; 
    pLight6.position.set(-3, 2.5, -10);

	const pLight7 					= new THREE.PointLight(0xFFFFFF, 10.0,100);
	pLight7.castShadow 				= true;
	pLight7.shadow.mapSize.width 	= 1024; 
	pLight7.shadow.mapSize.height 	= 1024; 
    pLight7.position.set(5, 2.5, 9);

	const pLight8 					= new THREE.PointLight(0xFFFFFF, 2.0,100);
	pLight8.castShadow 				= true;
	pLight8.shadow.mapSize.width 	= 1024; 
	pLight8.shadow.mapSize.height 	= 1024; 
    pLight8.position.set(-5, 2.5, 9);

	// Luz em área
	const rlight = new THREE.RectAreaLight(0xFFFFFF, 5, 1.0, 7);
	rlight.position.set(8, 5.8, 2);
	rlight.rotation.x = THREE.MathUtils.degToRad(-90);
	scene.add(rlight);
	
	const helper = new RectAreaLightHelper(rlight);
	rlight.add(helper);

	// const phelper 					= new THREE.PointLightHelper( pLight );
	// pLight.add( phelper );
    scene.add(pLight);
	

	// const phelper2 					= new THREE.PointLightHelper( pLight2 );
	// pLight2.add( phelper2 );
	scene.add(pLight2);
	

	// const phelper3 					= new THREE.PointLightHelper( pLight3 );
	// pLight3.add( phelper3 );
	scene.add(pLight3);

	// const phelper4					= new THREE.PointLightHelper( pLight4 );
	// pLight4.add( phelper4 );
    scene.add(pLight4);

	// const phelper5					= new THREE.PointLightHelper( pLight5 );
	// pLight5.add( phelper5 );
    scene.add(pLight5);

	// const phelper6					= new THREE.PointLightHelper( pLight6 );
	// pLight6.add( phelper6 );
    scene.add(pLight6);

	// const phelper7					= new THREE.PointLightHelper( pLight7 );
	// pLight7.add( phelper7 );
    scene.add(pLight7);

	// const phelper8					= new THREE.PointLightHelper( pLight8 );
	// pLight8.add( phelper8 );
    scene.add(pLight8);


	
	
    
}



/// ***************************************************************

function render() {
	
	camControl.update(clock.getDelta());
	renderer.render(scene, camera);
	requestAnimationFrame(render);
}

/// ***************************************************************
/// ***************************************************************
/// ***************************************************************

init();