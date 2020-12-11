// ------ Marker object ------------------------------------------------

function Marker() {
    THREE.Object3D.call(this);

    var radius = 0.005;
    var sphereRadius = 0.02;
    var height = 0.05;

    var material = new THREE.MeshPhongMaterial({ color: 0xbab68f });

    var cone = new THREE.Mesh(new THREE.ConeBufferGeometry(radius, height, 8, 1, true), material);
    cone.position.y = height * 0.5;
    cone.rotation.x = Math.PI;

    var sphere = new THREE.Mesh(new THREE.SphereBufferGeometry(sphereRadius, 16, 8), material);
    sphere.position.y = height * 0.95 + sphereRadius;

    this.add(cone, sphere);
}

Marker.prototype = Object.create(THREE.Object3D.prototype);

// ------ Earth object -------------------------------------------------

function Earth(radius, texture) {
    THREE.Object3D.call(this);

    this.userData.radius = radius;

    var earth = new THREE.Mesh(
        new THREE.SphereBufferGeometry(radius, 64.0, 48.0),
        new THREE.MeshPhongMaterial({
            map: texture
        })
    );

    this.add(earth);
}

Earth.prototype = Object.create(THREE.Object3D.prototype);

Earth.prototype.createMarker = function (lat, lng) {
    var marker = new Marker();

    var latRad = lat * (Math.PI / 180);
    var lngRad = -lng * (Math.PI / 180);
    var r = this.userData.radius;

    marker.position.set(Math.cos(latRad) * Math.cos(lngRad) * r, Math.sin(latRad) * r, Math.cos(latRad) * Math.sin(lngRad) * r);
    marker.rotation.set(0.0, -lngRad, latRad - Math.PI * 0.5);

    this.add(marker);
};

// ------ Three.js code ------------------------------------------------

var scene, camera, renderer;
var controls;

init();

function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.1, 100);
    camera.position.set(0.0, 1.5, 3.0);

    renderer = new THREE.WebGLRenderer({ antialias: true });

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.autoRotate = true;
    controls.autoRotateSpeed = -1.0;
    controls.enablePan = false;

    var ambient = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambient);

    var direcitonal = new THREE.DirectionalLight(0xffffff, 0.5);
    direcitonal.position.set(5.0, 2.0, 5.0).normalize();
    scene.add(direcitonal);

    // just some code for the loading
    var manager = createLoader(renderer.domElement, animate);

    var texLoader = new THREE.TextureLoader(manager).setCrossOrigin(true);
    var texture = texLoader.load('/static/js/globe.jpg');
    texture.anisotropy = renderer.capabilities.getMaxAnisotropy();

    var earth = new Earth(1.0, texture);

    var earth_sat =  "/static/data/earthlaunch.geojson"
    var satellites = []
    
    var geosat = d3.json(earth_sat, function(data) {
     
      for (var i = 0; i < data[0].above.length; i++){
    
          var earth_coors = [data[0].above[i].satlat, data[0].above[i].satlng]
          satellites.push(earth_coors)};

     for (var i = 0; i < satellites.length; i++){

        earth.createMarker(satellites[i][0], satellites[i][1])
        scene.add(earth)}})
     


    window.addEventListener('resize', onResize);
    onResize();

    document.body.appendChild(renderer.domElement);
}

function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);

    controls.update();

    renderer.render(scene, camera);
}