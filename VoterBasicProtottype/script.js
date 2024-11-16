// Three.js background setup
let scene, camera, renderer, particles;

function initBackground() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const particleCount = 1000;
    particles = new THREE.BufferGeometry();
    const particlePositions = [];

    for (let i = 0; i < particleCount; i++) {
        const x = (Math.random() - 0.5) * 10;
        const y = (Math.random() - 0.5) * 10;
        const z = (Math.random() - 0.5) * 10;
        particlePositions.push(x, y, z);
    }

    particles.setAttribute('position', new THREE.Float32BufferAttribute(particlePositions, 3));

    const particleMaterial = new THREE.PointsMaterial({
        color: 0x66ccff,
        size: 0.05,
        transparent: true,
        opacity: 0.6,
    });

    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);

    animateBackground();
}

function animateBackground() {
    requestAnimationFrame(animateBackground);
    particles.rotateY(0.001);
    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

initBackground();

// Voting system setup
const votes = { 'John': 0, 'Jane': 0 };

function vote(candidate) {
    votes[candidate]++;
    document.getElementById(`vote-count-${candidate}`).innerText = votes[candidate];

    const confirmation = document.createElement("div");
    confirmation.className = "confirmation";
    confirmation.textContent = `Vote cast for ${candidate}!`;
    document.body.appendChild(confirmation);

    setTimeout(() => {
        confirmation.remove();
    }, 2000);
}

// Profile modal functionality
function showProfile(name) {
    const modal = document.getElementById("modal");
    const modalName = document.getElementById("modal-name");
    const modalPosition = document.getElementById("modal-position");
    const modalBio = document.getElementById("modal-bio");

    if (name === 'John') {
        modalName.textContent = 'John Doe';
        modalPosition.textContent = 'Position: President';
        modalBio.textContent = 'John is a 3rd-year student with a passion for leadership and innovation.';
    } else if (name === 'Jane') {
        modalName.textContent = 'Jane Smith';
        modalPosition.textContent = 'Position: Vice President';
        modalBio.textContent = 'Jane is a 2nd-year student dedicated to enhancing the student experience.';
    }

    modal.style.display = "block";
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById("modal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
};