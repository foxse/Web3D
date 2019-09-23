var entityInObjectsCursor = 0;

var properitiesWindow = document.getElementById("properties");
properitiesWindow.style.visibility = "hidden";//elem.style.visibility="visible|hidden|collapse|initial|inherit";
var propText = document.getElementById("p1");
var propHeadtext = document.getElementById("h1");
var modelExplorer = document.getElementById("model_explorer");
var modelSliseSize = 2500000; //размер массива одного 3D буфера
//var MODEL = null;
//
var currentObjectName = "";
var allObjectsColors = {};
// create a function for getting the root path 
//$.url = function (url) {
//    var path = '@Request.ApplicationPath'
//    if (path != '/') path = path + '/'
//    return path + url;
//}

//var FILE = "/json/full_site.rvm"
//var FILE = $.url("Models/json/full_site.rvm")

propHeadtext.innerHTML = "Свойства";

//믽��馭򻠢󷨲ᮨ��321550.00   -1355063.70      14957.00 -312370.00     294460.00     109757.00
var coefX = -1200;//-7310;//0;//
var coefY = -1100; //1360;//0;//
var coefZ = 0;//remove -200;//0;//
var coefS = 1;//1;//
var fixMeshPos = true;

var poslen = [0];
var normlen = [0];
var uvlen = [0];
var colorlen = [0];
var modelsarr = [0];

var bufferModels = new Array();
/*
var material = new THREE.MeshLambertMaterial({
    shininess: 250,
    side: THREE.DoubleSide, vertexColors: THREE.VertexColors,
    opacity: 0.3,
    transparent: true
});*/

var material = new THREE.MeshPhongMaterial({
    color: 0xaaaaaa, specular: 0xffffff, shininess: 250,
    side: THREE.DoubleSide, vertexColors: THREE.VertexColors
});



var selectedMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 });
var insulMaterial = new THREE.MeshLambertMaterial({
    color: 0xffffff,
    //envMap: reflectionCube,
    opacity: 0.3,
    transparent: true
});

//Merge geometries main array. It contains other arrays of geometry type (color)
var modelGeometries = new Array();

//var modelGeometry = null;//new THREE.BufferGeometry();//

var polyGeometry = new THREE.BufferGeometry();
//polyPosArr = new Array();//new Float32Array(textArray.length * 3 / 2 - 115); //4049670
//polyNormArr = Array();//new Float32Array(textArray.length * 3 / 2 - 115);
//polyColorArr = Array();//new Float32Array(textArray.length * 3 / 2 - 115);
//sumUvArr = Array();//     sumUvArr = new Float32Array(textArray.length);


polyPos = new Array();
polyNorm = new Array();
polyColor = new Array();

var container, stats;
var camera, controls, scene, renderer;
var objects = [], plane;

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2(),
offset = new THREE.Vector3(),
INTERSECTED, SELECTED;

init();
animate();

function init() {

    container = document.getElementById("container");
    //container = document.createElement('div');
    document.body.appendChild(container);

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 50;
    camera.up.set(0, 0, 1);


    //controls = new THREE.TrackballControls( camera );
    controls = new THREE.OrbitControls(camera);
    controls.rotateSpeed = 4.0;
    controls.zoomSpeed = 2;//1.2
    controls.panSpeed = 0.8;
    controls.enableZoom = true;
    controls.enablePan = true;
    //衪ﭬ殲鱮㡲�� 񲰮먠౨ OrbitControls
    //controls.staticMoving = true;
    //controls.dynamicDampingFactor = 0.3;



    scene = new THREE.Scene();

    scene.add(new THREE.AmbientLight(0x505050));
    /*
    var light = new THREE.SpotLight(0xffffff, 1.5);
    light.position.set(0, 500, 2000);
    light.castShadow = true;

    light.shadowCameraNear = 200;
    light.shadowCameraFar = camera.far;
    light.shadowCameraFov = 50;

    light.shadowBias = -0.00022;

    light.shadowMapWidth = 2048;
    light.shadowMapHeight = 2048;
    
    scene.add(light);
    */

    var light1 = new THREE.DirectionalLight(0xffffff, 0.5);
    light1.position.set(1, 1, 1);
    scene.add(light1);

    var light2 = new THREE.DirectionalLight(0xffffff, 1.5);
    light2.position.set(0, -1, 0);
    scene.add(light2);

    var geometry = new THREE.SphereGeometry(40, 40, 40); // .BoxGeometry( 40, 40, 40 );
    var bgeometry = new THREE.BoxGeometry(40, 40, 40);
    var cylgeometry = new THREE.CylinderGeometry(40, 40, 40);
    var torgeometry = new THREE.TorusGeometry(45.72, 16.2, 20, 20, 1.5707963);

    /*
    TorusGeometry(radius, tube, radialSegments, tubularSegments, arc)

    radius ?Default is 100.
    tube ?Diameter of the tube. Default is 40.
    radialSegments ?Default is 8
    tubularSegments ?Default is 6.
    arc ?Central angle. Default is Math.PI * 2.
    */

    var myCatalogue = new Array();


    var group = new THREE.Object3D();//create an empty container
    group.position.x = 0;
    group.position.y = 0;
    group.position.z = 0;
    group.name = "Group1";


    var color = new THREE.Color();

    var torus = new THREE.Mesh(cylgeometry, material);
    torus.position.x = 0;
    torus.position.y = 0;
    torus.position.z = 0;
    torus.castShadow = true;
    torus.receiveShadow = true;

    group.add(torus);

    //objects.push( torus );

    var torus2 = new THREE.Mesh(cylgeometry, material);
    torus2.position.x = 70;
    torus2.position.y = 0;
    torus2.position.z = 0;
    torus2.rotation.set(0, 0, 0);
    torus2.castShadow = true;
    torus2.receiveShadow = true;
    //torus2.Name = "ߠ䱳ఠ 򮰮⢻

    group.add(torus2);

    //objects.push( torus2 );

    //scene.add( group );




    // Create the final Object3d to add to the scene


    //when done, add the group to the scene
    //myCatalogue.push(["catref", group]);

    myCatalogue["catref"] = group;

    //alert(myCatalogue["catref"]);

    /*if (myCatalogue["catref"])
    {
        var x = new XMLHttpRequest();
        x.open("GET", "/json/SPOOLER-PIPES.rvm", true);
        x.onload = function (){
            //console.log( x.responseText );
            MODEL = x.responseText;
        }
        x.send(null);
    }//alert(myCatalogue["catref"].name);
    */
    var group2 = new THREE.Object3D();


    myCatalogue["catref"].children.forEach(function (item, i, arr) {
        var newmesh = new THREE.Mesh(item.geometry, material);
        newmesh.position.x = item.position.x;
        group2.add(newmesh);
        //objects.push( newmesh );
        // console.log(i);
    });

    group2.position.y = 70;
    group2.name = "ߠ䱳ఠ 2";
    //scene.add( group2 );


    //𨱳欠��೨��怒宨񥍊				//drawCup(115.57, 246.5);



    var loader = new THREE.JSONLoader();
    var mesh = null;
    var groupPosX = 0;
    var groupPosZ = 0;
    //cylinder111
    //loader.load('/json/textValv_norm.json', function(geometry) {
    //for (j=0; j< 1; j++)
    //	{
    //	groupPosX = 0;
    //	groupPosZ = 0;
    //	for (i=0; i < 1; i++)
    //	{
    /*		if (i % 10 == 0)
            {
                groupPosZ += 20;
                groupPosX = 0;
            }
            groupPosX = groupPosX + 20;
    */



    /*var x = new XMLHttpRequest();
    x.open("GET", FILE, true);
    x.onload = function () {
        //console.log( x.responseText );
        MODEL = x.responseText;
*/

    var modelArr = MODEL.match(/[^\r\n]+/g);

    var meshCount = 0;

    var group3 = null;
    
    //alert("MODEL :" + MODEL);
    //alert("modelArr :" + modelArr);
    for (k = 0; k < modelArr.length; k++) {
        if (modelArr[k] == "CNTB" && modelArr[k + 5] != "PRIM")  {
            //AddLi(modelArr[k + 2])
            if (modelArr[k + 5] != "CNTE" )
                AddUl(modelArr[k + 2]);
            else
            { 
                AddLi(modelArr[k + 2]);
                if (modelArr[k + 7] === "CNTE")
                {
                    ModelBrowserLevelUp();
                    k += 5;
                }
            }

            
        }
        else if (modelArr[k] == "PRIM") {
            if (modelArr[k - 5] == "CNTB") {
                group3 = new THREE.Object3D();
                group3.name = modelArr[k - 3];
                if (modelArr[k + 9] == "CNTB") 
                {
                    AddUl(modelArr[k - 3]);
                }
                else 
                {
                    AddLi(modelArr[k - 3]);
                }
                var re = /\s* \s*/;
                var grPosArr = modelArr[k - 2].split(re);
            }
            else if (modelArr[k - 2] == "CNTE" && modelArr[k + 9] == "CNTE") {
                ModelBrowserLevelUp();
            }

            var textArray = new Array();

            if (modelArr[k + 2] != "    11") {
                for (l = k + 2; l < k + 9; l++) {
                    textArray.push(modelArr[l]);
                }

            }
            else {
                var l = k + 2;
                while (modelArr[l] != "CNTE") {
                    textArray.push(modelArr[l]);
                    l++;
                }

                //var mesh = createMeshFromPrim(textArray, material, grPosArr);
                //mesh.receiveShadow = true;

            }

//            saveRVMToDb(currentObjectName, textArray);

            var mesh = createMeshFromPrim(textArray, material, grPosArr);

            if (mesh != null) {
                meshCount++;
                //if (group3.children.length == 0) {
                
				mesh.name = currentObjectName;

				


				

            	//}
                //AddLi(mesh.name);

                //mesh.castShadow = true;
                mesh.receiveShadow = false;
                //console.log(mesh);
                //mesh.updateMatrix();
                objects.push(mesh);

                group3.add(mesh);//add a mesh with geometry to it


            }
        }
        else if (modelArr[k] === "CNTE") {

            if (group3 != null)
                group3 = new THREE.Object3D();

            if (modelArr[k + 2] === "CNTE") {
                ModelBrowserLevelUp();
            }

            //            
        }
    }

    console.log(objects.length);

    //console.log("---------Длины---------");
    //console.log(poslen);
    //console.log(normlen);
    //console.log(uvlen);
    //console.log(colorlen);

    var currentColorR = 0.05;
    var currentColorG = 0.7;
    var currentColorB = 0.35;



    var objArrIndx = 0;

   // console.log("modelsArr : " + modelsarr);

    for (j = 0; j < poslen.length; j++) {
        var sumPosCursor = 0;
        var sumNormCursor = 0;
        var sumUvCursor = 0;
        var sumColorCursor = 0;
        var sumPosArr = new Float32Array(poslen[j]);//poslen);
        var sumNormArr = new Float32Array(normlen[j]);//normlen);
        var sumColorArr = new Float32Array(colorlen[j]);//colorlen);
        var sumUvArr = new Float32Array(uvlen[j]);//uvlen);
//        console.log("objArrIndx : " + objArrIndx);

        for (a = objArrIndx; a < objArrIndx + modelsarr[j]; a++) {
            var postmp = objects[a].geometry.getAttribute('position');
            var normaltmp = objects[a].geometry.getAttribute('normal');
            var uvtmp = objects[a].geometry.getAttribute('uv');
            var colortmp = objects[a].geometry.getAttribute('color');

            //bufferModel = new THREE.Mesh(objects[a].geometry, material);
            //bufferModel.name = a.toString();
            //scene.add(bufferModel);

            if (currentColorR >= 1)
                currentColorR = 0.05;
            else
                currentColorR += 0.05;

            if (currentColorG >= 1)
                currentColorG = 0.05;
            else
                currentColorG += 0.05;

            if (currentColorB >= 1)
                currentColorB = 0.05;
            else
                currentColorB += 0.05;

            if (postmp != null) {
                var posAttArr = postmp.array;

                for (b = 0; b < posAttArr.length; b++) {
                    sumPosArr[b + sumPosCursor] = posAttArr[b];
                }

                sumPosCursor += posAttArr.length;
            }

            if (normaltmp != null) {

                var numAttArr = normaltmp.array;

                for (b = 0; b < numAttArr.length; b++) {
                    sumNormArr[b + sumNormCursor] = numAttArr[b];
                }

                sumNormCursor += numAttArr.length;
            }


            if (uvtmp != null) {
                var uvAttArr = uvtmp.array;

                for (b = 0; b < uvAttArr.length; b++) {
                    sumUvArr[b + sumUvCursor] = uvAttArr[b];
                }

                sumUvCursor += uvAttArr.length;
            }

            if (colortmp != null) {

                var colorAttArr = colortmp.array;

                objects[a].startIndex = sumColorCursor; //начальный индекс цветов в фреймбуфере

                for (b = 0; b < colorAttArr.length; b += 3) {
                    sumColorArr[b + sumColorCursor] = currentColorR; //colorAttArr[b]; 
                    sumColorArr[b + sumColorCursor + 1] = currentColorG; // 
                    sumColorArr[b + sumColorCursor + 2] = currentColorB; //[b + sumColorCursor + 2] = currentColorB;
                    //console.log(sumColorArr[b + sumColorCursor]);
                }

                sumColorCursor += colorAttArr.length;

                objects[a].endIndex = sumColorCursor;  //конечный индекс цветов в фреймбуфере
                objects[a].bufferGeometryID = j;

                allObjectsColors[objects[a].name] = [j, objects[a].startIndex, objects[a].endIndex];
            }


        }
        
        objArrIndx += modelsarr[j];

        var objGeometry = geometry = new THREE.SphereGeometry(1, 1, 1, 0, Math.PI);
        var tmpGeommm = new THREE.BufferGeometry().fromGeometry(objGeometry);

        var curModelGeometry = new THREE.BufferGeometry();/*.fromGeometry( geometry );*/

        for (var key in tmpGeommm.attributes) {
            curModelGeometry.addAttribute(key, tmpGeommm.getAttribute(key));
        }

        curModelGeometry.addAttribute('position', new THREE.BufferAttribute(sumPosArr, 3));
        curModelGeometry.addAttribute('normal', new THREE.BufferAttribute(sumNormArr, 3));
        curModelGeometry.addAttribute('color', new THREE.BufferAttribute(sumColorArr, 3));
        curModelGeometry.addAttribute('uv', new THREE.BufferAttribute(sumUvArr, 2));

        // itemSize = 3 because there are 3 values (components) per vertex

        //var bufGeometry = new THREE.BufferGeometry().fromGeometry(modelGeometry);
        modelGeometries.push(curModelGeometry);

        var bufferModel = new THREE.Mesh(modelGeometries[modelGeometries.length - 1], material);
        bufferModel.name = j.toString();
        bufferModels.push(bufferModel);
        scene.add(bufferModels[bufferModels.length - 1]);
        console.log("bufferModels.length-1 : " + (bufferModels.length - 1).toString());

   //     console.log(modelsarr[j]);

    }
//    console.log(allObjectsColors)
    //console.log(bufferModels);
    /*
	polyGeometry.addAttribute('position', new THREE.BufferAttribute(polyPos, 3));
    polyGeometry.addAttribute('normal', new THREE.BufferAttribute(polyNorm, 3));
    polyGeometry.addAttribute('color', new THREE.BufferAttribute(polyColor, 3));
	console.log(polyGeometry);

	var polyModel = new THREE.Mesh(polyGeometry, material);
    bufferModel.name = 'polyModel';
    scene.add(polyModel);
	*/
    /*
    }
    x.send(null);*/
    //	}
    //}
    //});
    //polyGeometry.addAttribute('position', new THREE.BufferAttribute(polyPosArr, 3));
    //polyGeometry.addAttribute('normal', new THREE.BufferAttribute(polyNormArr, 3));
    //polyGeometry.addAttribute('color', new THREE.BufferAttribute(polyColorArr, 3));
    //polyGeometry.addAttribute('uv', new THREE.BufferAttribute(sumUvArr, 2));
    //console.log(polyGeometry);
    //var polyModel = new THREE.Mesh(polyGeometry, material);
    //bufferModel.name = 'polyModel';
    //scene.add(polyModel);
    //console.log(polyModel);

    scene.add(buildAxes(100));

    //objects.push( group );
    /*
    loader.load('/json/flange.json', function(geometry) {
                                mesh = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial( { color: Math.random() * 0xffffff } ));
                                mesh.rotation.set(0,0,0);
                                mesh.castShadow = true;
                                mesh.receiveShadow = true;
                                //mesh.scale.set(1,1,1);
    mesh.Name = 'flange';
                                scene.add(mesh);

                                objects.push( mesh );
    });

    loader.load('/json/tee.json', function(geometry) {
                                mesh = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial( { color: Math.random() * 0xffffff } ));
                                mesh.rotation.set(0,0,0);
                                mesh.castShadow = true;
                                mesh.receiveShadow = true;
                                //*mesh.scale.set(1,1,1);
    mesh.Name = 'tee';
                                scene.add(mesh);

                                objects.push( mesh );
    });*/
    /*
    // Ƞ䱳諠 񶥭󠨧 JSON
    var loaderObj = new THREE.ObjectLoader();
    var loader = new THREE.XHRLoader();
    loader.load( 'json/pipes.json', function ( text ) { text = "{ \"scene\" : " + text + " }";
    var json = JSON.parse( text );
    scene = loaderObj.parse( json.scene ); },
        // Function called when download progresses
        function ( xhr ) { console.log( (xhr.loaded / xhr.total * 100) + '% loaded' ); },
        // Function called when download errors
        function ( xhr ) { console.log( 'An error happened' ); } );
    */
    /*

    for ( var i = 0; i < 10; i ++ ) {

        var object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: Math.random() * 0xffffff } ) );

        if (i%2 == 0)
            object = new THREE.Mesh( bgeometry, new THREE.MeshLambertMaterial( { color: Math.random() * 0xffffff } ) );

        object.position.x = Math.random() * 1000 - 500;
        object.position.y = Math.random() * 600 - 300;
        object.position.z = Math.random() * 800 - 400;

        object.rotation.x = Math.random() * 2 * Math.PI;
        object.rotation.y = Math.random() * 2 * Math.PI;
        object.rotation.z = Math.random() * 2 * Math.PI;

        object.scale.x = 1;//Math.random() * 2 + 1;
        object.scale.y = 1;//Math.random() * 2 + 1;
        object.scale.z = 1;//Math.random() * 2 + 1;

        object.castShadow = true;
        object.receiveShadow = true;

        scene.add( object );


        objects.push( object );








    }
*/
    plane = new THREE.Mesh(
        new THREE.PlaneBufferGeometry(2000, 2000, 8, 8),
        new THREE.MeshBasicMaterial({ visible: false })
    );
    scene.add(plane);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor(0xf0f0f0);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.sortObjects = false;

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;

    container.appendChild(renderer.domElement);

    var info = document.createElement('div');
    info.style.position = 'absolute';
    info.style.top = '10px';
    info.style.width = '100%';
    info.style.textAlign = 'center';
    info.innerHTML = '3D Model Viewer';
    container.appendChild(info);

    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    container.appendChild(stats.domElement);

    renderer.domElement.addEventListener('mousemove', onDocumentMouseMove, false);
    renderer.domElement.addEventListener('mousedown', onDocumentMouseDown, false);
    renderer.domElement.addEventListener('mouseup', onDocumentMouseUp, false);

    //

    window.addEventListener('resize', onWindowResize, false);

	//generatePoints(40, 0, Math.PI);
    modelExplorer = document.getElementById("model_explorer");
    //httpPost("/Catalog/SendJson?name=" + modelExplorer.innerHTML.toString());
    
    var sendData = JSON.stringify({
    	EntityInstanceId : 1,
        Name: "ProjectTree",
        Normal: modelExplorer.innerHTML.toString()
    });


//    saveMesh(sendData);

	//!    UpdatEntity(sendData);
}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

function onDocumentMouseMove(event) {

    event.preventDefault();

    mouse.x = event.clientX / window.innerWidth * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    //

    raycaster.setFromCamera(mouse, camera);

    if (SELECTED) {

        var intersects = raycaster.intersectObject(plane);

        if (intersects.length > 0) {

            //SELECTED.position.copy( intersects[ 0 ].point.sub( offset ) );

        }

        return;

    }

    var intersects = raycaster.intersectObjects(objects);

    if (intersects.length > 0) {

        if (INTERSECTED != intersects[0].object) {

            if (INTERSECTED) INTERSECTED.material.color.setHex(INTERSECTED.currentHex);

            INTERSECTED = intersects[0].object;
            INTERSECTED.currentHex = INTERSECTED.material.color.getHex();

            plane.position.copy(INTERSECTED.position);
            plane.lookAt(camera.position);

        }

        container.style.cursor = 'pointer';

    } else {

        if (INTERSECTED) INTERSECTED.material.color.setHex(INTERSECTED.currentHex);

        INTERSECTED = null;

        container.style.cursor = 'auto';

    }

}

function onDocumentMouseDown(event) {
	saveEntityToDb(objects[entityInObjectsCursor]);

    event.preventDefault();

    raycaster.setFromCamera(mouse, camera);

    var intersects = raycaster.intersectObjects(objects);

    if (intersects.length > 0) {

        controls.enabled = false;

        SELECTED = intersects[0].object;


        //propText.innerHTML = SELECTED.parent.name + "<br> ͮ��詶鿼br>	x: " + SELECTED.parent.position.x + "<br>	y: " + SELECTED.parent.position.y+ "<br>	z: " + SELECTED.parent.position.z;

        propText.innerHTML = SELECTED.name + "<br> Мои координаты<br>	x: " + (SELECTED.posX * coefS - coefX / coefS) + "<br>	y: " + (SELECTED.posY * coefS - coefY / coefS)
            + "<br>	z: " + (SELECTED.posZ * coefS * coefS - coefZ / coefS);
        //+ "<br> 󣫻<br>	x: " + SELECTED.rotation.x + "<br>	y: " + SELECTED.rotation.y+ "<br>	z: " + SELECTED.rotation.z;


        //scene.add(SELECTED);

        console.log(SELECTED.startIndex);
        console.log(SELECTED.endIndex);

        //console.log();

        for (i = SELECTED.startIndex; i <= SELECTED.endIndex; i += 3) {
            polyColor.push(modelGeometries[SELECTED.bufferGeometryID].attributes.color.array[i]);
            polyColor.push(modelGeometries[SELECTED.bufferGeometryID].attributes.color.array[i + 1]);
            polyColor.push(modelGeometries[SELECTED.bufferGeometryID].attributes.color.array[i + 2]);
            modelGeometries[SELECTED.bufferGeometryID].attributes.color.array[i] = 0.75;
            modelGeometries[SELECTED.bufferGeometryID].attributes.color.array[i + 1] = 0;
            modelGeometries[SELECTED.bufferGeometryID].attributes.color.array[i + 2] = 0;
        }

        modelGeometries[SELECTED.bufferGeometryID].attributes.color.needsUpdate = true;


        /*
        SELECTED.parent.children.forEach(function (object) {
            scene.add(object);
            console.log("Added: " + object.name);
        });
        */

        properitiesWindow.style.visibility = "visible";

        var intersects = raycaster.intersectObject(plane);

        if (intersects.length > 0) {

            offset.copy(intersects[0].point).sub(plane.position);

        }

        container.style.cursor = 'move';

    }

}

function onDocumentMouseUp(event) {

    event.preventDefault();

    controls.enabled = true;

    if (INTERSECTED) {

        plane.position.copy(INTERSECTED.position);

        //removeEntity(INTERSECTED);

        /*
        INTERSECTED.parent.children.forEach(function (object) {
            removeEntity(object);
        });
        */
        var startColorIndex = SELECTED.startIndex;
        for (i = 0; i < polyColor.length; i++) {
            modelGeometries[SELECTED.bufferGeometryID].attributes.color.array[startColorIndex] = polyColor[i];
            startColorIndex++;
        }
        polyColor = new Array();
        modelGeometries[SELECTED.bufferGeometryID].attributes.color.needsUpdate = true;
        SELECTED = null;
    }
    properitiesWindow.style.visibility = "hidden";

    container.style.cursor = 'auto';

}

//
function removeEntity(object) {
    var selObject = scene.getObjectByName(object.name);
    console.log("Removed: " + object.name);
    scene.remove(selObject);
    //animate();
}

function animate() {

    requestAnimationFrame(animate);
    controls.update();
    render();
    stats.update();

}

function render() {

    //controls.update();

    renderer.render(scene, camera);

}

function httpGetAsync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    };
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
}

function generatePoints(segments, phiStart, phiLength) {
    // add 10 random spheres
    var points = [];
    var height = 5;
    var count = 30;
    for (var i = 0; i < count; i++) {
        points.push(new THREE.Vector3((Math.sin(i * 0.2) + Math.cos(i * 0.3)) * height + 12, 0, (i - count) + count / 2));
    }

    spGroup = new THREE.Object3D();
    var material = new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: false });
    points.forEach(function (point) {

        var spGeom = new THREE.SphereGeometry(0.2);
        var spMesh = new THREE.Mesh(spGeom, material);
        spMesh.position = point;
        spGroup.add(spMesh);
    });
    // add the points as a group to the scene
    scene.add(spGroup);

    // use the same points to create a convexgeometry
    var latheGeometry = new THREE.LatheGeometry(points, segments, phiStart, phiLength);
    latheMesh = createMesh(latheGeometry);

    scene.add(latheMesh);
}

function createMesh(geom) {

    // assign two materials
    //  var meshMaterial = new THREE.MeshBasicMaterial({color:0x00ff00, transparent:true, opacity:0.6});
    var meshMaterial = new THREE.MeshNormalMaterial();
    meshMaterial.side = THREE.DoubleSide;
    var wireFrameMat = new THREE.MeshBasicMaterial();
    wireFrameMat.wireframe = true;

    // create a multimaterial
    var mesh = THREE.SceneUtils.createMultiMaterialObject(geom, [meshMaterial, wireFrameMat]);

    return mesh;
}

function createMeshFromPrim(textArray, material, grPosArr) {
    var geometry = null;
    var re = /\s* \s*/;
    //console.log(textArray);
    var textList = textArray[6].split(re);

    //alert(textList);

    var paramArr = new Array();


    for (var i = 1; i < textList.length; i++) {
        var para = parseFloat(textList[i]);
        paramArr.push(para);
    }

    //alert(paramArr);

    var trArr = new Array();

    for (var i = 1; i < 4; i++) {
        textList = textArray[i].split(re);
        //alert("textList:" + textList);
        for (var j = 1; j < textList.length; j++) {
            trArr.push(parseFloat(textList[j]));
        }
    }

    //alert(trArr);
    var cylinder = false;
    var cone = false;
    var sphere = false;
    switch (textArray[0]) {
        case "     2":
            geometry = new THREE.BoxGeometry(paramArr[0], paramArr[1], paramArr[2]); //Buffer
            break
        case "     4":
            geometry = new THREE.TorusGeometry(paramArr[0], paramArr[1], 20, 20, paramArr[2]);
            break
        case "     5":
            sphere = true;
            geometry = new THREE.SphereGeometry(paramArr[0], 20, 20, 0, Math.PI);
            break
        case "     7":
            geometry = new THREE.CylinderGeometry(paramArr[0], paramArr[1], paramArr[2]);
            cone = true;
            break
        case "     8":
            geometry = new THREE.CylinderGeometry(paramArr[0], paramArr[0], paramArr[1]);
            cylinder = true;
            //console.log(geometry);
            break
        case "    11":
            //geometry = new THREE.BufferGeometry();
            geometry = new THREE.Geometry();

            polyPosArr = new Array();//new Float32Array(textArray.length * 3 / 2 - 115); //4049670
            polyNormArr = Array();//new Float32Array(textArray.length * 3 / 2 - 115);
            polyColorArr = Array();//new Float32Array(textArray.length * 3 / 2 - 115);
            polyUvArr = Array();//     sumUvArr = new Float32Array(textArray.length);

            polyCursor = true;
            current = 0;
            var vertexCount = 0;

            var commonX = true;
            var commonY = true;
            var commonZ = true;

            var currentX = null;
            var currentY = null;
            var currentZ = null;

            for (var i = 7; i < textArray.length - 1; i++) {
                textList = textArray[i].split(re);

                polyPosArr = new Array();

                if (textList.length == 4) {

                    for (var j = 1; j < textList.length; j++) {
                        if (polyCursor) {

                            //sumPosArr[current + j - 1] = parseFloat(textList[j]);
                            //var v = parseFloat(textList[j]);
                            if (!isNaN(parseFloat(textList[j]))) {
                                //polyPos.push(parseFloat(textList[j]));
                                polyPosArr.push(parseFloat(textList[j]));


                            }
                        }
                        else {
                            //sumNormArr[current + j - 1] = parseFloat(textList[j]);
                            if (!isNaN(parseFloat(textList[j]))) {
                                //polyNorm.push(parseFloat(textList[j]));
                                polyNormArr.push(parseFloat(textList[j]));

                            }

                        }
                    }

                    if (polyCursor) {
                        var v = new THREE.Vector3(polyPosArr[0], polyPosArr[1], polyPosArr[2]);
                        geometry.vertices.push(v);
                        //console.log(polyPosArr);
                        polyColorArr.push(0.0);
                        polyColorArr.push(0.0);
                        polyColorArr.push(0.9);
                        vertexCount++;
                    }
                    //console.log(textList);

                    if (polyCursor) {
                        polyUvArr.push(0.4);
                    }
                    else
                        polyUvArr.push(0.96);

                    polyCursor = !polyCursor;

                }
                else {
                    //console.log('короткий массив');
                    //console.log(vertexCount);
                    if (vertexCount > 0) {
                        var vertices = [];
                        var firstVertex = geometry.vertices.length - vertexCount;
                        for (var t = firstVertex ; t < geometry.vertices.length; t++) {
                            var vertex = [geometry.vertices[t].x, geometry.vertices[t].y, geometry.vertices[t].z];
                            vertices.push(vertex);
                        }
                        if (vertices.length >= 3) {
                            var triangles = triangulatePnlTri(vertices);

                            for (var t = 0; t < triangles.length; t++) {
                                geometry.faces.push(new THREE.Face3(triangles[t][0] + firstVertex, triangles[t][1] + firstVertex, triangles[t][2] + firstVertex));
                            }
                            geometry.computeFaceNormals();
                            commonX = true;
                            commonY = true;
                            commonZ = true;

                            currentX = null;
                            currentY = null;
                            currentZ = null;
                        }
                        vertexCount = 0;
                    }
                    //   console.log(textList);
                }
            }
            break
        default:
            geometry = new THREE.SphereGeometry(1, 20, 20);
            break
    }

    if (cylinder) {
        geometry.applyMatrix(new THREE.Matrix4().makeRotationX(3 * Math.PI / 2));
    }
    else
        if (cone) {
            geometry.applyMatrix(new THREE.Matrix4().makeRotationX(3 * Math.PI / 2));
        }


    var matx = new THREE.Matrix4();
    matx.set(trArr[0] * 1, trArr[1] * 1, trArr[2] * 1, trArr[3] + coefX,
                trArr[4] * 1, trArr[5] * 1, trArr[6] * 1, trArr[7] + coefY,
                trArr[8] * 1, trArr[9] * 1, trArr[10] * 1, trArr[11] + coefZ,
                0, 0, 0, 0);
    geometry.applyMatrix(matx);

    var mesh = new THREE.Mesh(geometry);

    if (fixMeshPos) {
        mesh.position.x = (trArr[3]) / coefS;
        mesh.position.y = (trArr[7]) / coefS;
        mesh.position.z = (trArr[11]) / coefS;
    }

    var tmpGeom = new THREE.BufferGeometry().fromGeometry(mesh.geometry);

    var postmp = tmpGeom.getAttribute('position')
    var normaltmp = tmpGeom.getAttribute('normal');
    var uvtmp = tmpGeom.getAttribute('uv');
    var colortmp = tmpGeom.getAttribute('color');

    var pli = poslen.length - 1;
    if (postmp != null) {
        if ((poslen[pli] + postmp.array.length) < modelSliseSize) {
            poslen[pli] += postmp.array.length;
            modelsarr[pli] += 1;
        }
        else {
 //           console.log(poslen);
            poslen.push(postmp.array.length);
            normlen.push(0);
            uvlen.push(0);
            colorlen.push(0);
            pli += 1;
            modelsarr.push(1);
        }
    }

    if (normaltmp != null)
        normlen[pli] += normaltmp.array.length;
    if (uvtmp != null)
        uvlen[pli] += uvtmp.array.length;
    if (colortmp != null)
        colorlen[pli] += colortmp.array.length;
    var returnMesh = new THREE.Mesh(tmpGeom, selectedMaterial);
    returnMesh.posX = mesh.position.x;
    returnMesh.posY = mesh.position.y;
    returnMesh.posZ = mesh.position.z;
    return returnMesh;
}

//ﳰ鲮㫠 ��ಠ 㱠񥭨欉
function drawCup(xRadius, yRadius) {
    for (i = 0; i < 360; i += .5) {
        var curve = new THREE.EllipseCurve(
            0, 0,            // ax, aY
            xRadius, yRadius,           // xRadius, yRadius
            Math.PI, 2 * Math.PI,  // aStartAngle, aEndAngle
            false,            // aClockwise
            0                 // aRotation
        );

        var path = new THREE.Path(curve.getPoints(50));
        var geometry = path.createPointsGeometry(50);
        var material = new THREE.LineBasicMaterial({ color: 0xff0000 });

        // Create the final Object3d to add to the scene
        var ellipse = new THREE.Line(geometry, material);
        ellipse.rotation.set(0, 2 * Math.PI / 360 * i, 0)
        scene.add(ellipse);
    }
}

function buildAxes(length) {
    var axes = new THREE.Object3D();

    axes.add(buildAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(length, 0, 0), 0xFF0000, false)); // +X
    axes.add(buildAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(-length, 0, 0), 0xFF0000, true)); // -X
    axes.add(buildAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, length, 0), 0x00FF00, false)); // +Y
    axes.add(buildAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, -length, 0), 0x00FF00, true)); // -Y
    axes.add(buildAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, length), 0x0000FF, false)); // +Z
    axes.add(buildAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, -length), 0x0000FF, true)); // -Z

    return axes;

}

function buildAxis(src, dst, colorHex, dashed) {
    var geom = new THREE.Geometry(),
        mat;

    if (dashed) {
        mat = new THREE.LineDashedMaterial({ linewidth: 3, color: colorHex, dashSize: 3, gapSize: 3 });
    } else {
        mat = new THREE.LineBasicMaterial({ linewidth: 3, color: colorHex });
    }

    geom.vertices.push(src.clone());
    geom.vertices.push(dst.clone());
    geom.computeLineDistances(); // This one is SUPER important, otherwise dashed lines will appear as simple plain lines

    var axis = new THREE.Line(geom, mat, THREE.LineSegments);

    return axis;

}

function assignUVs(geometry) {

    geometry.computeBoundingBox();

    var max = geometry.boundingBox.max;
    var min = geometry.boundingBox.min;

    var offset = new THREE.Vector2(0 - min.x, 0 - min.y);
    var range = new THREE.Vector2(max.x - min.x, max.y - min.y);

    geometry.faceVertexUvs[0] = [];
    var faces = geometry.faces;

    for (i = 0; i < geometry.faces.length ; i++) {

        var v1 = geometry.vertices[faces[i].a];
        var v2 = geometry.vertices[faces[i].b];
        var v3 = geometry.vertices[faces[i].c];

        geometry.faceVertexUvs[0].push([
          new THREE.Vector2((v1.x + offset.x) / range.x, (v1.y + offset.y) / range.y),
          new THREE.Vector2((v2.x + offset.x) / range.x, (v2.y + offset.y) / range.y),
          new THREE.Vector2((v3.x + offset.x) / range.x, (v3.y + offset.y) / range.y)
        ]);

    }

    geometry.uvsNeedUpdate = true;

}

function checkMesh(mesh, child_index) {
    if (
      mesh.geometry.faces.length > 0 &&
      mesh.geometry.vertices.length > 0
    ) {
        // do stuff here with the good mesh

        for (var i = 0; i < mesh.children.length; i++)
            if (!checkMesh(mesh.children[i], true, i))
                i--; // child was removed, so step back

        return true;
    } else // empty mesh! this causes WebGL errors
    {
        if (mesh.parent != null)
            mesh.parent.children.splice(child_index, 1);

        //console.log(mesh.name + " has zero faces and/or vertices so it is removed.");
        mesh = null;

        return false;
    }
}

function AddLi(text) {
//	console.log(text)
	currentObjectName = text;
	//httpGet("/Catalog/CreateElement?name="+text);
	var li = document.createElement("li");
	li.className += "elem-node";
    var a = document.createElement("a");
    a.appendChild(document.createTextNode(text));
    a.className += "btn btn-xs elem-node";
   
    li.appendChild(a);
    modelExplorer.appendChild(li);
}


function AddUl(text) {
	var ulId = text.replace(/\//g, '-').replace(/ /g, "_").replace(/\./g, '_');

    var li = document.createElement("li");
    var d = document.createElement("div");
    d.className = "inflx";
    var a = document.createElement("a");
    a.className += "btn  btn-xs tree-node";
    a.setAttribute("data-toggle", "collapse");
    a.setAttribute("data-target", "#" + ulId);
    a.appendChild(document.createTextNode("[\+]"));
    d.appendChild(a);
    var p = document.createElement("a");
    p.className += "btn btn-xs model-tree-element";
    p.setAttribute("target-group", ulId);
    p.appendChild(document.createTextNode(text));

    var sendData = JSON.stringify({
    	Name: text
    });
//    saveMesh(sendData);
   // p.setAttribute("role", "presentation");
//    console.log(text)
    //httpGet("/Catalog/CreateGroup?name=" + text);
    d.appendChild(p);
    li.appendChild(d);
   // li.appendChild(document.createTextNode(text));
    modelExplorer.appendChild(li);
    var ul = document.createElement("ul");
    ul.className += "collapse";
    ul.setAttribute("id", ulId);
    ul.setAttribute("style", "padding-left:10px;");
    li.appendChild(ul);
    modelExplorer = ul;
}

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function httpGetAsync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

function ModelBrowserLevelUp() {
//	console.log("modelExplorer.parentElement.parentElement.nodeName : " + modelExplorer.parentElement.parentElement.nodeName);

	if (modelExplorer.parentElement.parentElement.nodeName === "UL") {
		modelExplorer = modelExplorer.parentElement.parentElement;

		//httpGet("/Catalog/MoveToUpperGroup");
	}
}

function httpPost(data) {
	var http = new XMLHttpRequest();
	var url = "/Catalog/SaveModel";
	var params = "json="+data;
	http.open("POST", url, true);

	//Send the proper header information along with the request
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	http.onreadystatechange = function () {//Call a function when the state changes.
		if (http.readyState == 4 && http.status == 200) {
		}
	}
	http.send(params);
}

function saveMesh(data) {
	var http = new XMLHttpRequest();
	var url = "/Catalog/SaveMesh";
	var params = "json=" + data;
	http.open("POST", url, true);

	//Send the proper header information along with the request
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	http.onreadystatechange = function () {//Call a function when the state changes.
		if (http.readyState == 4 && http.status == 200) {
		}
	}
	http.send(params);
}

function UpdatEntity(data) {
	var http = new XMLHttpRequest();
	var url = "/Catalog/UpdatEntity";
	var params = "json=" + data;
	http.open("POST", url, true);

	//Send the proper header information along with the request
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	http.onreadystatechange = function () {//Call a function when the state changes.
		if (http.readyState == 4 && http.status == 200) {
		}
	}
	http.send(params);
}



function saveEntity(data) {
	var http = new XMLHttpRequest();
	var url = "/Catalog/SaveMesh";
	var params = "json=" + data;
	http.open("POST", url, true);

	//Send the proper header information along with the request
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	http.onreadystatechange = function () {//Call a function when the state changes.
		if (http.readyState == 4 && http.status == 200) {
			if (entityInObjectsCursor < objects.length) {
				entityInObjectsCursor++;
				saveEntityToDb(objects[entityInObjectsCursor]);
				console.log("saving entity #" + entityInObjectsCursor);
			}
		}
	}
	http.send(params);
}




$("li.elem-node").mouseup(function () {
    var text = $(this).text();
    console.log("mouse up at " + text)

    var colorIndex = allObjectsColors[text][1];
    var o = allObjectsColors[text][0];

    for (i = 0; i < polyColor.length; i++) {
        modelGeometries[o].attributes.color.array[colorIndex] = polyColor[i];
        colorIndex++;
    }
    polyColor = new Array();

    modelGeometries[o].attributes.color.needsUpdate = true;
}).mousedown(function () {
    var text = $(this).text();

    console.log(text + " : " + allObjectsColors[text])

    var o = allObjectsColors[text][0];

    for (i = allObjectsColors[text][1]; i <= allObjectsColors[text][2]; i += 3) {
        polyColor.push(modelGeometries[o].attributes.color.array[i]);
        polyColor.push(modelGeometries[o].attributes.color.array[i + 1]);
        polyColor.push(modelGeometries[o].attributes.color.array[i + 2]);
        modelGeometries[o].attributes.color.array[i] = 0.75;
        modelGeometries[o].attributes.color.array[i + 1] = 0;
        modelGeometries[o].attributes.color.array[i + 2] = 0;
    }

    modelGeometries[o].attributes.color.needsUpdate = true;
});

function saveEntityToDb(mesh){

	var uvCurObj = [];
	var normalCurObj = [];

	if (mesh.geometry.attributes.uv != null)
		uvCurObj = mesh.geometry.attributes.uv.array;
	if (mesh.geometry.attributes.normal != null)
		normalCurObj = mesh.geometry.attributes.normal.array;

	var sendData = JSON.stringify({
		Name: mesh.name,
		//Color: mesh.geometry.attributes.color.array.toString(),
		Normal: normalCurObj.toString(),
		Position: mesh.geometry.attributes.position.array.toString(),
		Uv: uvCurObj.toString()
	});

	saveEntity(sendData);

}


function saveRVMToDb(name, textArray) {

    var str = "";

    for (i = 0; i < textArray.length; i++) {
        if (textArray.length - 1 == i)
            str += textArray[i];
        else
            str += textArray[i] + '|';
    }

    var sendData = JSON.stringify({
        Name: name,
        Position: str
    });

    saveRVMEntity(sendData);

}

function saveRVMEntity(data) {
    var http = new XMLHttpRequest();
    var url = "/Catalog/SaveMesh";
    var params = "json=" + data;
    http.open("POST", url, true);

    //Send the proper header information along with the request
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    http.onreadystatechange = function () {//Call a function when the state changes.
        if (http.readyState == 4 && http.status == 200) {
        }
    }
    http.send(params);
}