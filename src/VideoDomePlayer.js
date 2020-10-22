
//Variables needed
var materiall;
var Skybox;
var video;
var guiALLF4;
var guiALLF24;


function main(){
	
	addGUIChooseSkybox();//Create 'Choose Video' Folder
	addGUIChooseSkyboxTime (); //Create 'Time Warp 4' Folder and Create 'Time Warp 24' Folder
	
	addSkybox(0,false);//Create animated sky

	
	
	addGUISkyboxproperties();//Create 'Skybox Properties' Folder
	
     
	
	
}
 /*****************************START ADDED CODE***************/
        function addGUISkyboxproperties(){//Create 'Skybox Properties' Folder
	
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
function addGUIChooseSkybox (){//Create 'Choose Video' Folder
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
 	
     materiall = new THREE.MeshStandardMaterial( {

    

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
function SkyTimeWarp(TimeWarp,VideoTime){//Choose between 4 o 24 minutes video

	//choose the video
	if (VideoTime== 0){
	
		SkyTimeWarp_4min(TimeWarp);
		 
	} 
	if (VideoTime== 1){
		SkyTimeWarp_24min(TimeWarp) ;
	} 	
}
function SkyTimeWarp_4min(num){////Fastforward to the SkytimeWarp selected

	
	if (num== 0){ // Sunrise
	
		video.currentTime=0 ;
		 
	} 
	if (num== 1){ // Day
		video.currentTime=60 ;
	} 
	if (num==2){ // sunset
	
		video.currentTime=120 ;
	} 
	if (num==3){ // night
	
		video.currentTime=180 ;
	} 
	
	
}
function SkyTimeWarp_24min(num){//Fastforward to the SkytimeWarp selected

	
	if (num== 0){ // Sunrise
	
		video.currentTime=0 ;
		 
	} 
	if (num== 1){  // Day
		video.currentTime=360 ;
	} 
	if (num==2){ // sunset
	
		video.currentTime=720 ;
	} 
	if (num==3){  // night
	
		video.currentTime=1080 ;
	} 
	
	
}
     /*****************************FINISH ADDED CODE**************/


 /*****************************START ADDED CODE***************/
        

function addGUIChooseSkyboxTime (){//Create 'Time Warp 4' Folder and Create 'Time Warp 24' Folder
	
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