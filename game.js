// Set up scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add lighting
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(50, 50, 50);
scene.add(light);

// Create the floor (for perspective)
const floorGeometry = new THREE.PlaneGeometry(2000, 2000);
const floorMaterial = new THREE.MeshBasicMaterial({ color: 0xaaaaaa, side: THREE.DoubleSide });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = Math.PI / 2;
scene.add(floor);

// Load a 3D gun model (using GLTF format for example)
const loader = new THREE.GLTFLoader();
let gun;
loader.load('gun.glb', function (gltf) {
    gun = gltf.scene;
    gun.scale.set(0.5, 0.5, 0.5); // Scale the gun appropriately
    scene.add(gun);
});

// Camera position
camera.position.z = 5;

// OrbitControls for camera movement
const controls = new THREE.OrbitControls(camera, renderer.domElement);

// Shooting mechanics: create bullets as spheres
let bullets = [];
function shoot() {
    const bulletGeometry = new THREE.SphereGeometry(0.1, 8, 8);
    const bulletMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const bullet = new THREE.Mesh(bulletGeometry, bulletMaterial);
    bullet.position.set(gun.position.x, gun.position.y, gun.position.z);
    scene.add(bullet);
    bullets.push(bullet);
}

// Animate the game
function animate() {
    requestAnimationFrame(animate);

    // Update gun position or movement if needed

    // Move bullets
    bullets.forEach(bullet => {
        bullet.position.z -= 0.2;  // Move bullets forward
    });

    renderer.render(scene, camera);
}

// Event listener for shooting (mouse click)
window.addEventListener('click', shoot);

// Resize the renderer on window resize
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

animate();
