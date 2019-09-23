var mPSize = 100;
var requestsSent = 0
var currentEntityId = 0;
var take = 200;
var propsHtml = "<html><body><div class=\"list-group\" id=\"model_explorer\"></div></body></html>";
//var iframe = document.getElementById('modelTreeFrame'),
//     iframedoc = iframe.contentDocument || iframe.contentWindow.document;
//iframedoc.body.innerHTML = propsHtml;
//var modelExplorer = iframedoc.getElementById("model_explorer");
var modelExplorer = document.getElementById("projectTree");
var dropdownMenu = $("#dropdown_menu");
dropdownMenu.hide();

httpGetAsync("/Model/GetProjectTree", gotProjectTree);

function gotProjectTree(htmlText) {
    modelExplorer.innerHTML = htmlText;

    $("#model_explorer").on('mouseup', "a.elem-node", function () {
        var text = $(this).text();
        // console.log("mouse up at " + allObjectsColors[text][3])
        unHilightObject(text);
        //properitiesWindow.style.visibility = "hidden";

    });

    $("#model_explorer").on('mousedown', "a.elem-node", function () {
        var text = $(this).text();
        hilightObject(text);
        propText.innerHTML = "";
        httpGetAsync("/Model/EntityAttributes?id=" + allObjectsColors[text][3], setEntityAtt);
    });

    $("#model_explorer").on('mouseup', "a.model-tree-element", function (e) {
    	var mb = detect_button(e);
    	switch (mb) 
    	{ 
    		case "left":
    		//$(this).contents().each(function (ind) {
				$("a.model-tree-element.btn-info").removeClass("btn-info")
				$(this).addClass("btn-info");
    			unHilightGroup($(this).attr("target-group"));
    			break;
		}
    });

    $("#model_explorer").on('mousedown', "a.model-tree-element", function (e) {
    	var mb = detect_button(e);
    	switch (mb) 
    	{ 
    		case "left":
    			dropdownMenu.hide();
				var text = $(this).text();	
    			//$(this).contents().each(function (ind) {
    			console.log($(this).attr("target-group"));
    			hilightGroup($(this).attr("target-group"));//.text());
    		//});
    		//hilightGroup($(this).text().split('<')[0]);
    			httpGetAsync("/Model/EntityAttributes?name=" + text, setEntityAtt);
    			break;
    		case "right":
    			show_dropdown_menu($(this), e);
    			console.log(mb);
    			break;

		}
    });

    //addUpdateTreeNodeEvent("model_explorer");
    $('#model_explorer').on('click', 'a.tree-node', function () {
        var text = $(this).text();
        var ths = $(this);
        if (text == '+') {
            var id = $(this).attr("id").split('_')[1];
            httpGetAsyncElem("/Model/TreeNode?id=" + id, gotTreeNode, ths.parent());
        }
        else {
            $(this).text('+');
        }
    });
}

function gotTreeNode(data, ths) {
    ths.html(data);
}

var properitiesWindow = document.getElementById("properties");
properitiesWindow.style.visibility = "visible";//elem.style.visibility="visible|hidden|collapse|initial|inherit";
var propText = document.getElementById("p1");
var propHeadtext = document.getElementById("h1");

var mainPage = document.getElementById("mainPage");

var modelSliseSize = 2500000; //размер массива одной непрерывной геометрии 3D буфера

var polyColor = new Array();

var allObjects = {};
var allObjectsColors = {};

var currentObjectName = "";

var poslen = [0], uvlen = [0], normlen = [0];

var coefX = 0;//-7310;//-1200;//
var coefY = 0;//1360;//-1100; //
var coefZ = 0;//-200;//0;//
var coefS = 1;//1;//



propHeadtext.innerHTML = "Свойства";

var currentColor = 0xaaaaaa;
var poslen = [0];
var normlen = [0];
var uvlen = [0];
var colorlen = [0];
var modelsarr = new Array();
//var modelsarr = [0];

/*
var material = new THREE.MeshLambertMaterial({
    shininess: 250,
    side: THREE.DoubleSide, vertexColors: THREE.VertexColors,
    opacity: 0.3
});
,
    transparent: true
*/
var material = new THREE.MeshLambertMaterial({
    color: currentColor, specular: 0xffffff, shininess: 50,
    side: THREE.DoubleSide, vertexColors: THREE.VertexColors,
    shading: THREE.SmoothShading
});

//var material = new THREE.MeshLambertMaterial({ color: 0xff0000, shading: THREE.FlatShading, wireframe: true, transparent: true });

//var materials = [

//					new THREE.MeshPhongMaterial({ color: 0xffffff, shading: THREE.FlatShading, vertexColors: THREE.VertexColors, shininess: 0 }),
//					new THREE.MeshBasicMaterial({ color: 0x000000, shading: THREE.FlatShading, wireframe: true, transparent: true })

//];

var selectedMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 });
var insulMaterial = new THREE.MeshLambertMaterial({
    color: 0xffffff,
    //envMap: reflectionCube,
    opacity: 0.3,
    transparent: true
});

//Merge geometries main array. It contains other arrays of geometry type (color)
var modelGeometries = new Array();

var container, stats;
var camera, controls, scene, renderer;
var objects = [], plane;

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2(),
offset = new THREE.Vector3(),
INTERSECTED, SELECTED;

//httpGetAsync("/Model/GetFullModel", gotModelIndex);
httpGetAsync("/Model/GetModelView?take="+take+"", gotModelIndex);


function gotModelIndex(jsonString) {
    allObjects = JSON.parse(jsonString);
    //console.log(allObjects)
    init();
    animate();
}

function updateInterface() {
    var windowHeight = (window.innerHeight / 1.1).toString();
    mainPage.setAttribute("style", "height:" + windowHeight + "px");
    modelExplorer.setAttribute("style", "max-height:" + window.innerHeight + "px");
}

function init() {

    container = document.getElementById("model_container");

    updateInterface()

    //document.body.appendChild(container);
    //camera = new THREE.PerspectiveCamera(70, container.clientWidth /*window.innerWidth*/ / container.clientWidth/*window.innerHeight*/, 1, 1000);
    camera = new THREE.OrthographicCamera(
			container.clientWidth / -16, container.clientWidth / 16,
			container.clientHeight / 16, container.clientHeight / -16,
			-200, 500);
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 50;
    camera.up.set(0, 0, 1);

    controls = new THREE.OrbitControls(camera, container);
    controls.rotateSpeed = 4.0;
    controls.zoomSpeed = 2;
    controls.panSpeed = 1.5;
    controls.enableZoom = true;
    controls.enablePan = true;

   // controls.autoRotate = true;

    scene = new THREE.Scene();

    scene.add(new THREE.AmbientLight(0x505050));

    var light1 = new THREE.DirectionalLight(0xffffff, 0.5);
    light1.position.set(0, 1, 1);
    scene.add(light1);

    var light2 = new THREE.DirectionalLight(0xffffff, 1.5);
    light2.position.set(0, -1, -1);
    scene.add(light2);

    var color = new THREE.Color();

    var mesh = null;

    scene.add(buildAxes(100));

    plane = new THREE.Mesh(
        new THREE.PlaneBufferGeometry(2000, 2000, 8, 8),
        new THREE.MeshBasicMaterial({ visible: false })
    );
    scene.add(plane);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor(0xf0f0f0);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(container.clientWidth, container.clientHeight /*window.innerWidth, window.innerHeight*/);
    renderer.sortObjects = false;

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;

    container.appendChild(renderer.domElement);

    var info = document.createElement('div');
    info.style.position = 'absolute';
    info.style.top = '10px';
    info.style.width = '20%';
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

    window.addEventListener('resize', onWindowResize, false);

    //	console.log(renderer.domElement)
    //    readBufferedMeshes();
    //    
    getFullModel()
}

function onWindowResize() {
    updateInterface()
    //camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(container.clientWidth, container.clientHeight /*window.innerWidth, window.innerHeight*/);

}

function onDocumentMouseMove(event) {

    event.preventDefault();

    var layerOffset = getOffset(event);

    mouse.x = (layerOffset.x / container.clientWidth /* window.innerWidth*/) * 2 - 1;
    mouse.y = -(layerOffset.y / container.clientHeight /*window.innerHeight*/) * 2 + 1;

    //propText.innerHTML = "event.clientX : " + event.clientX + "<br> event.clientY : " + event.clientY + "<br><br>mouse.x : " + mouse.x + "<br> mouse.y : " + mouse.y + "<br> layerOffset.x : " + layerOffset.x + "<br> layerOffset.y : " + layerOffset.y;
    //
    //console.log(event);
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

function addmodelsarrToScene() {
    for (i = 0; i < modelsarr.length; i++) {
        scene.add(modelsarr[i]);
        console.log("adding buffer model #" + i + " to scene");
        alert("press OK");
    }
}


//function getIntersections(event) {
//    var vector = new THREE.Vector2();

//    vector.set(
//      (event.clientX / window.innerWidth) * 2 - 1,
//      -(event.clientY / window.innerHeight) * 2 + 1);

//    var raycaster = new THREE.Raycaster();
//    raycaster.setFromCamera(vector, camera);

//    var intersects = raycaster.intersectObjects(objects);

//    return intersects;
//}

function getLine(vectorA, vectorB) {

    var geometry = new THREE.Geometry();
    geometry.vertices.push(vectorA);
    geometry.vertices.push(vectorB);
    var material = new THREE.LineBasicMaterial({
        color: 0xFF5555,
        depthWrite: false,
        depthTest: false
    });
    line = new THREE.Line(geometry, material);

    return line;
}

function animate() {
//	controls.update();
    requestAnimationFrame(animate);
    render();
}

function render() {
    renderer.render(scene, camera);
}

var click = 0;
var pointA = new THREE.Vector3();
var pointB = new THREE.Vector3();
var markerA = new THREE.Mesh(new THREE.SphereGeometry(0.1, 16, 16), new THREE.MeshBasicMaterial({ color: 0xFF5555, depthTest: false, depthWrite: false }));
var markerB = markerA.clone();
var line;
function onDocumentMouseDown(event) {
	event.preventDefault();

    raycaster.setFromCamera(mouse, camera);

    var intersects = raycaster.intersectObjects(objects);

    if (intersects.length > 0) {
        controls.enabled = false;

        SELECTED = intersects[0].object;

        if ($("#measurement").attr("aria-pressed") === "true") {
            if (click === 0) {
                pointA = intersects[0].point;
                markerA.position.copy(pointA);
                scene.remove(markerB);
                scene.remove(line);
                scene.add(markerA);
                click = 1;
            } else {
                pointB = intersects[0].point;
                scene.add(markerB);

                if (!pointB.equals(pointA)) {
                    pointB = intersects[0].point;
                } else {
                    pointB = pointA;
                }
                markerB.position.copy(pointB);

                var distance = pointA.distanceTo(pointB);

                if (distance > 0) {
                    console.log("distance", distance);
                    propText.innerHTML = "Расстояние: " + distance;
                    properitiesWindow.style.visibility = "visible";
                    line = getLine(pointA, pointB);
                    scene.add(line);
                }
                click = 0;
            }
        } else {
            scene.remove(markerA);
            scene.remove(markerB);
            scene.remove(line);

        	camera.position = intersects[0].point;
        	 // Alternatively, camera.position = intersects[0].object.position.clone();

            //propText.innerHTML = SELECTED.parent.name + "<br> ͮ��詶鿼br>	x: " + SELECTED.parent.position.x + "<br>	y: " + SELECTED.parent.position.y+ "<br>	z: " + SELECTED.parent.position.z;

            propText.innerHTML = SELECTED.name + "<br> Мои координаты<br>	x: " + (SELECTED.posX * coefS - coefX / coefS) + "<br>	y: " + (SELECTED.posY * coefS - coefY / coefS)
                + "<br>	z: " + (SELECTED.posZ * coefS * coefS - coefZ / coefS);
            //+ "<br> 󣫻<br>	x: " + SELECTED.rotation.x + "<br>	y: " + SELECTED.rotation.y+ "<br>	z: " + SELECTED.rotation.z;


            //scene.add(SELECTED);

            console.log(SELECTED.startIndex);
            console.log(SELECTED.endIndex);

            //console.log(modelsarr);
        	//console.log(modelsarr[SELECTED.bufferGeometryID]);

            for (i = SELECTED.startIndex; i <= SELECTED.endIndex; i += 3) {
            	polyColor.push(modelsarr[SELECTED.bufferGeometryID].geometry.attributes.color.array[i]);
            	polyColor.push(modelsarr[SELECTED.bufferGeometryID].geometry.attributes.color.array[i + 1]);
            	polyColor.push(modelsarr[SELECTED.bufferGeometryID].geometry.attributes.color.array[i + 2]);
            	modelsarr[SELECTED.bufferGeometryID].geometry.attributes.color.array[i] = 0;
            	modelsarr[SELECTED.bufferGeometryID].geometry.attributes.color.array[i + 1] = 0;
            	modelsarr[SELECTED.bufferGeometryID].geometry.attributes.color.array[i + 2] = 0;
            }

            modelsarr[SELECTED.bufferGeometryID].geometry.attributes.color.needsUpdate = true;


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
        	modelsarr[SELECTED.bufferGeometryID].geometry.attributes.color.array[startColorIndex] = polyColor[i];
            startColorIndex += 1;
        }
        polyColor = new Array();
        modelsarr[SELECTED.bufferGeometryID].geometry.attributes.color.needsUpdate = true;
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
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
}


function createMesh(geom) {
    var meshMaterial = new THREE.MeshNormalMaterial();
    meshMaterial.side = THREE.DoubleSide;
    var wireFrameMat = new THREE.MeshBasicMaterial();
    wireFrameMat.wireframe = true;

    var mesh = THREE.SceneUtils.createMultiMaterialObject(geom, [meshMaterial, wireFrameMat]);

    return mesh;
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

function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false); // false for synchronous request
    xmlHttp.send(null);
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

function httpGetAsyncElem(theUrl, callback, id) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText, id);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

function httpPost(data) {
    var http = new XMLHttpRequest();
    var url = "/Catalog/SaveModel";
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

function GetEntity(id) {
    //console.log(performance.now()) 
    if (bufferedMeshes[id] == null) {
        var url = "/Model/AddTo3DView?id=" + id;
        httpGetAsync(url, getMesh);
    }
    else {
        makeMesh(bufferedMeshes[id]);
    }

}

function getMesh(json) {
    baseGeo = JSON.parse(json);
    bufferedMeshes[baseGeo.id] = json;
    makeMesh(json);
}

var poslenCurrentIndex = 0;
function makeMesh(baseGeo) {

    //console.log(performance.now())
    //console.log(json)
    //    var baseGeo = JSON.parse(json);

    //console.log(baseGeo)
    var objTmpGeometry = new THREE.CubeGeometry(1, 1, 1);
    var tmpBufGeom = new THREE.BufferGeometry().fromGeometry(objTmpGeometry);
    var geometry = new THREE.BufferGeometry();

    for (var key in tmpBufGeom.attributes) {
        geometry.addAttribute(key, tmpBufGeom.getAttribute(key));
    }

    if (poslen[poslenCurrentIndex] + baseGeo.position.length > modelSliseSize) {
        poslenCurrentIndex += 1;
        poslen.push(0);
        normlen.push(0);
        uvlen.push(0);
        console.log("poslen.length " + poslen.length);
        console.log("poslenCurrentIndex " + poslenCurrentIndex);
    }

    poslen[poslenCurrentIndex] += baseGeo.position.length;
    normlen[poslenCurrentIndex] += baseGeo.normal.length;
    uvlen[poslenCurrentIndex] += baseGeo.uv.length;

    geometry.addAttribute('position', new THREE.BufferAttribute(baseGeo.position, 3));
    geometry.addAttribute('normal', new THREE.BufferAttribute(baseGeo.normal, 3));
    geometry.addAttribute('color', new THREE.BufferAttribute(baseGeo.position, 3));
    geometry.addAttribute('uv', new THREE.BufferAttribute(baseGeo.uv, 2));

    var mesh = new THREE.Mesh(geometry, selectedMaterial);

    mesh.name = baseGeo.name;
    mesh.entityID = baseGeo.id;

    objects.push(mesh);

    checkModelGetingState();
}


var bufferedMeshes = {};

function readBufferedMeshes() {
    // var mesh = $.cookie('mesh_' + id);
    var jsonMesh = localStorage['meshes'] || '{}';
    //    console.log(jsonMesh);
    if (jsonMesh != null)
        bufferedMeshes = JSON.parse(jsonMesh);
}

var currentColorR = 1.0;
var currentColorG = 0.8;
var currentColorB = 0.05;

function fillBuffer() {
    //poslen = [modelGeometriesArraySize];
	var group = new THREE.Object3D();
    var objArrIndx = 0;

    for (j = 0; j < poslen.length; j++) {
        var sumPosCursor = 0;
        var sumNormCursor = 0;
        var sumUvCursor = 0;
        var sumColorCursor = 0;
        var sumPosArr = new Float32Array(poslen[j]);//poslen);
        var sumNormArr = new Float32Array(poslen[j]);//normlen);
        var sumColorArr = new Float32Array(poslen[j]);//colorlen);
        var sumUvArr = new Float32Array(uvlen[j]);//uvlen);

        for (a = objArrIndx; a < objects.length; a++) {
            var postmp = objects[a].geometry.getAttribute('position')
            var normaltmp = objects[a].geometry.getAttribute('normal');
            var uvtmp = objects[a].geometry.getAttribute('uv');
            var colortmp = objects[a].geometry.getAttribute('color');

            if (postmp != null) {
                var posAttArr = postmp.array;
                if (sumPosCursor + posAttArr.length > sumPosArr.length)
                    break;
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

                allObjectsColors[objects[a].name] = [j, objects[a].startIndex, objects[a].endIndex, objects[a].entityID];
            }
            objArrIndx += 1;
            // scene.add(objects[a])
        }
        console.log("objArrIndx " + objArrIndx);
        // objArrIndx += modelsarr[j];

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

//!     modelGeometries.push(curModelGeometry);

//!     var bufferModel = new THREE.Mesh(modelGeometries[modelGeometries.length - 1], material);
        var bufferModel = new THREE.Mesh(curModelGeometry, material);

//!        var bufferModel = new THREE.SceneUtils.createMultiMaterialObject(curModelGeometry, materials);

        bufferModel.name = j.toString();

        modelsarr[j] = bufferModel;

        //var geo = new THREE.EdgesGeometry(curModelGeometry); // or WireframeGeometry( geometry )

        //var mat = new THREE.LineBasicMaterial({ color: 0xff0000, linewidth: 2 });

        //var wireframe = new THREE.LineSegments(geo, mat);

        //scene.add(wireframe);

        group.add(modelsarr[j]);

        // for (i = 0; i < 150; i += 3) {
        	// for (j = 0; j < 150; j += 3) {
        		// instance = modelsarr[modelsarr.length - 1].clone();
        		// instance.position.set(i, 0, j);
        		// group.add(instance);
        	// }
        // }

        

        console.log("modelsarr.length : " + (modelsarr.length).toString());

        //console.log(modelsarr[j]);

    }
    scene.add(group);
    //addmodelsarrToScene();
}

function setEntityAtt(data) {
    //properitiesWindow.innerHtml =
    console.log("recieved attributes : " + data);
    properitiesWindow.style.visibility = "visible";
    propText.innerHTML = data;
}

//$("#modelTreeFrame").contents().find("li.elem-node").mouseup(function () {


function unHilightObject(text) {
    if (allObjectsColors[text] != null) {
        var colorIndex = allObjectsColors[text][1];
        var o = allObjectsColors[text][0];

        for (i = 0; i < polyColor.length; i+=3) {
        	modelsarr[o].geometry.attributes.color.array[colorIndex + i] = polyColor[i];
        	modelsarr[o].geometry.attributes.color.array[colorIndex + i + 1] = polyColor[i+1];
        	modelsarr[o].geometry.attributes.color.array[colorIndex + i + 2] = polyColor[i + 2];
        }
        

        modelsarr[o].geometry.attributes.color.needsUpdate = true;

        polyColor = new Array();
    }
}

function hilightObject(text) {
    if (allObjectsColors[text] != null) {
        var o = allObjectsColors[text][0];
        console.log(allObjectsColors[text]);
        for (i = allObjectsColors[text][1]; i <= allObjectsColors[text][2]; i += 3) {
            polyColor.push(modelsarr[o].geometry.attributes.color.array[i]);
            polyColor.push(modelsarr[o].geometry.attributes.color.array[i + 1]);
            polyColor.push(modelsarr[o].geometry.attributes.color.array[i + 2]);
            modelsarr[o].geometry.attributes.color.array[i] = 0.75;
            modelsarr[o].geometry.attributes.color.array[i + 1] = 0;
            modelsarr[o].geometry.attributes.color.array[i + 2] = 0;
        }

        modelsarr[o].geometry.attributes.color.needsUpdate = true;
    }
}

//$("#modelTreeFrame").contents().find("p.model-tree-element").mouseup(function () {


function hilightGroup(text) {
    var t = "ul[id='" + text + "']";

    //$("#modelTreeFrame").contents().find(t).find("li.elem-node").each(function (ind) {
    $("#model_explorer").contents().find(t).find("a.elem-node").each(function (ind) {
        console.log($(this).text())
        hilightObject($(this).text());
    });
}

function unHilightGroup(text) {
    var t = "ul[id='" + text + "']";

    //$("#modelTreeFrame").contents().find(t).find("li.elem-node").each(function (ind) {
    $("#model_explorer").contents().find(t).find("a.elem-node").each(function (ind) {
        unHilightObject($(this).text());
    });
}

var hint = $("#hint");
$("g > *").on({
	click: function (e) {
		console.log("test");
		var arr = $(this).find("desc");
		if (arr.length > 0) {
			hint.text(arr[0].textContent);
			hint.css({ "top": e.pageY, "left": e.pageX });
			hint.show()
			hilightGroup("-"+arr[0].textContent.substring(0, arr[0].textContent.indexOf(" ")))
		}
		else {
			hint.hide()
		}
	},
	contextmenu: function (e) {
		e.preventDefault();
		var arr = $(this).find("desc");
		if (arr.length > 0) {
			hint.hide();
			unHilightGroup("-"+arr[0].textContent.substring(0, arr[0].textContent.indexOf(" ")))
		}
	}
});

function getOffset(evt) {
    var el = evt.target,
		x = 0,
		y = 0;

    while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
        x += el.offsetLeft - el.scrollLeft;
        y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }

    x = evt.clientX - x;
    y = evt.clientY - y;

    return { x: x, y: y };
}

function GetEntities(id, count) {
    var url = "/Model/GetEntitiesArray?startID=" + id + "&count=" + count;
    httpGetAsync(url, getMeshes);
}

function getMeshes(json) {
    var resGeomArray = JSON.parse(json);
    console.log(resGeomArray.length);
    for (i = 0; i < resGeomArray.length; i++) {
        //		console.log(allObjects.length +" _ "+ objects.length));
        ////		makeMesh(resGeomArray[i]);
        createMeshFromPrim(resGeomArray[i]);
    }
    requestsSent -= 1;
    //checkModelGetingState();
    console.log(objects.length + " object(s) recieved. Request #" + (requestsSent + 1).toString() + " returned. Left " + requestsSent);

    if (requestsSent == 0 || resGeomArray.length < mPSize) {
        $("div.progress-bar").hide();
        fillBuffer();
    }
}

function switchColors() {
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
}
var allMinusCur = 0;
function getFullModel() {
    allMinusCur = allObjects.length - currentEntityId;
    $("div.progress-bar").css("width", objects.length /*/ mPSize*/ / allMinusCur + "%");
    for (var i = 0; i < allMinusCur / mPSize; i++) {
        requestsSent += 1;
        console.log("requestsSent " + requestsSent);
        GetEntities(allObjects[currentEntityId], mPSize);
        //mPSize = mPSize * 2;
        currentEntityId += mPSize;
    }
    $("div.progress-bar").show();
}

function loadNextPart() {

}

function checkModelGetingState() {
    if (allMinusCur > objects.length /*&& currentEntityId < mPSize*/) {
        //currentEntityId += 1
        $("div.progress-bar").css("width", objects.length * 100 / allObjects.length + "%"); //.attr("aria-valuenow", currentEntityId);

        //		switchColors();


        //currentEntityId += mPSize;
        //GetEntity(allObjects[currentEntityId])
    }
    else {
        $("div.progress-bar").css("width", 100 + "%");
        //	localStorage['meshes'] = JSON.stringify(bufferedMeshes);
        //console.log(localStorage['meshes']);
        //console.log("end loading elements.\n start fill buffer...")

        //$("div.progress-bar").hide();
    }
}

function createMeshFromPrim(baseGeo) {
    var textArray = baseGeo.position.split('|');

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

    mesh.position.x = (trArr[3]) / coefS;
    mesh.position.y = (trArr[7]) / coefS;
    mesh.position.z = (trArr[11]) / coefS;

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

    returnMesh.entityID = baseGeo.id;
    returnMesh.name = baseGeo.name;

    objects.push(returnMesh);
    checkModelGetingState();
}

function detect_button(e) {
	e = e || window.event;

	if (e.which == null) {
		button = (e.button < 2) ? 'left' :
            ((e.button == 4) ? 'middle' : 'right');
	}
	else {
		button = (e.which < 2) ? 'left' :
            ((e.which == 2) ? 'middle' : 'right');
	}

	return button;
}

$(document).ready(function () {
	$(document).on("contextmenu", function (e) {
		if (e.target.nodeName != "INPUT" && e.target.nodeName != "TEXTAREA")
			e.preventDefault();
	});
});

function show_dropdown_menu(element, event) {
	dropdownMenu.css({ top: event.clientY, left: event.clientX, position: 'absolute' });
	dropdownMenu.attr("tag", element.attr("id"));
	dropdownMenu.show();
}

dropdownMenu.on('mouseup', "a", function () {
	console.log(dropdownMenu.attr("tag"));
	dropdownMenu.hide();
	showTreeElements(dropdownMenu.attr("tag"))
});

function showTreeElements(elem) {
	var spl = elem.split('_');
	var treeNodeId = spl[spl.length - 1];
	requestsSent += 1;
	var url = "/Model/ShowTreeNode?treeNodeID=" + treeNodeId;
	httpGetAsync(url, getMeshes);
}