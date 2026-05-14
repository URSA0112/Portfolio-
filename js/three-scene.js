// Three.js 3D background scene
(function () {
  const canvas = document.getElementById('three-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 30;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);

  // Particle system
  const particleCount = 2000;
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  const sizes = new Float32Array(particleCount);

  const colorPalette = [
    new THREE.Color(0x7c3aed),
    new THREE.Color(0x06b6d4),
    new THREE.Color(0xec4899),
    new THREE.Color(0x9f67ff),
    new THREE.Color(0x38bdf8),
  ];

  for (let i = 0; i < particleCount; i++) {
    const radius = 20 + Math.random() * 40;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = radius * Math.cos(phi);

    const col = colorPalette[Math.floor(Math.random() * colorPalette.length)];
    colors[i * 3] = col.r;
    colors[i * 3 + 1] = col.g;
    colors[i * 3 + 2] = col.b;
    sizes[i] = Math.random() * 0.15 + 0.05;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

  const mat = new THREE.PointsMaterial({
    size: 0.08,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    sizeAttenuation: true,
  });

  const particles = new THREE.Points(geo, mat);
  scene.add(particles);

  // Floating geometry objects
  const objects = [];
  const geometries = [
    new THREE.IcosahedronGeometry(1, 0),
    new THREE.OctahedronGeometry(1, 0),
    new THREE.TetrahedronGeometry(1, 0),
    new THREE.DodecahedronGeometry(1, 0),
  ];

  const glowColors = [0x7c3aed, 0x06b6d4, 0xec4899, 0x9f67ff];

  for (let i = 0; i < 8; i++) {
    const geo = geometries[i % geometries.length];
    const mat = new THREE.MeshStandardMaterial({
      color: glowColors[i % glowColors.length],
      emissive: glowColors[i % glowColors.length],
      emissiveIntensity: 0.3,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const mesh = new THREE.Mesh(geo, mat);
    const angle = (i / 8) * Math.PI * 2;
    const r = 12 + Math.random() * 6;
    mesh.position.set(
      Math.cos(angle) * r,
      (Math.random() - 0.5) * 12,
      Math.sin(angle) * r - 10
    );
    const s = 0.6 + Math.random() * 0.8;
    mesh.scale.set(s, s, s);
    scene.add(mesh);
    objects.push({ mesh, speed: 0.003 + Math.random() * 0.005, orbitSpeed: 0.001 + Math.random() * 0.002, orbitAngle: angle, orbitRadius: r });
  }

  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
  scene.add(ambientLight);
  const pointLight1 = new THREE.PointLight(0x7c3aed, 2, 30);
  pointLight1.position.set(10, 10, 10);
  scene.add(pointLight1);
  const pointLight2 = new THREE.PointLight(0x06b6d4, 1.5, 30);
  pointLight2.position.set(-10, -5, -10);
  scene.add(pointLight2);

  // Mouse parallax
  let mouse = { x: 0, y: 0 };
  window.addEventListener('mousemove', (e) => {
    mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
    mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
  });

  // Animation loop
  let time = 0;
  function animate() {
    requestAnimationFrame(animate);
    time += 0.005;

    particles.rotation.x = time * 0.05 + mouse.y * 0.1;
    particles.rotation.y = time * 0.03 + mouse.x * 0.1;

    objects.forEach((obj) => {
      obj.mesh.rotation.x += obj.speed;
      obj.mesh.rotation.y += obj.speed * 0.7;
      obj.orbitAngle += obj.orbitSpeed;
      obj.mesh.position.x = Math.cos(obj.orbitAngle) * obj.orbitRadius + mouse.x * 0.5;
      obj.mesh.position.y += Math.sin(time + obj.orbitAngle) * 0.005;
    });

    camera.position.x += (mouse.x * 2 - camera.position.x) * 0.03;
    camera.position.y += (mouse.y * 2 - camera.position.y) * 0.03;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
  }
  animate();

  // Resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
})();
