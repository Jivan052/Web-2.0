// Three.js Setup
const canvas = document.getElementById('animation-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// Create a Torus Knot
const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
const material = new THREE.MeshStandardMaterial({
    color: 0xff7e5f,
    emissive: 0x402020,
    metalness: 0.8,
    roughness: 0.4
});
const torusKnot = new THREE.Mesh(geometry, material);
scene.add(torusKnot);

// Lighting
const pointLight = new THREE.PointLight(0xffffff, 1.5);
pointLight.position.set(20, 20, 20);
scene.add(pointLight);

// Add Starry Background
const starGeometry = new THREE.BufferGeometry();
const starMaterial = new THREE.PointsMaterial({ color: 0xaaaaaa, size: 0.5 });

const stars = [];
const numStars = 5000;
for (let i = 0; i < numStars; i++) {
    const x = (Math.random() - 0.5) * 1000;
    const y = (Math.random() - 0.5) * 1000;
    const z = (Math.random() - 0.5) * 1000;
    stars.push(x, y, z);
}

starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(stars, 3));
const starField = new THREE.Points(starGeometry, starMaterial);
scene.add(starField);

// Camera positioning
camera.position.z = 30;

// Animate the Torus Knot with the starry background
function animate() {
    requestAnimationFrame(animate);

    // Rotate and morph the shape
    torusKnot.rotation.x += 0.01;
    torusKnot.rotation.y += 0.02;

    // Color pulsing effect
    const time = Date.now() * 0.001;
    torusKnot.material.color.setHSL(Math.sin(time * 0.5) * 0.5 + 0.5, 0.7, 0.5);
    torusKnot.material.emissive.setHSL(Math.cos(time * 0.5) * 0.5 + 0.5, 0.7, 0.2);

    // Make stars move for dynamic background effect
    starField.rotation.x += 0.0001;
    starField.rotation.y += 0.0001;

    renderer.render(scene, camera);
}

animate();

// Handle Resize
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
