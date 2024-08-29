import { ChevronLeft } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const ColorScale = () => {
  return (
    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-80 p-2 rounded shadow">
        <img 
          src="/scale.png" 
          alt="Chlorophyll Concentration Color Scale" 
          className="w-full h-auto object-contain"
        />
    </div>
  );
};

const ChlorophyllGlobe = () => {
  const mountRef = useRef(null);
  const globeRef = useRef(null);
  const rendererRef = useRef(null);
  const [popupInfo, setPopupInfo] = useState({ show: false, text: '', x: 0, y: 0 });
  // const [currentSeason, setCurrentSeason] = useState('spring');
  const navigate = useNavigate();

  const goBack  = () => {
    navigate("/")
  }

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    rendererRef.current = renderer;

    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Create globe
    const geometry = new THREE.SphereGeometry(5, 64, 64);
    const loader = new THREE.TextureLoader();
    const chlorophyllData = loader.load('/chlorophyll-concentration.png')
    
    // Load chlorophyll data for all seasons
    // const textures = {
    //   spring: loader.load('/chlorophyll-concentration_spring.png'),
    //   summer: loader.load('/chlorophyll-concentration_summer.png'),
    //   autumn: loader.load('/chlorophyll-concentration_autumn.png'),
    //   winter: loader.load('/chlorophyll-concentration_winter.png')
    // };
    
    // Create material with the chlorophyll data texture
    const material = new THREE.ShaderMaterial({
      uniforms: {
        chlorophyllData: { value: chlorophyllData },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D chlorophyllData;
        varying vec2 vUv;
        varying vec3 vNormal;

        vec3 enhanceColor(vec3 color) {
          float luminance = dot(color, vec3(0.299, 0.587, 0.114));
          float enhancedLuminance = pow(luminance, 0.6);
          vec3 enhancedColor = color * (enhancedLuminance / max(luminance, 0.001));
          
          float saturation = 1.2;
          vec3 grayscale = vec3(dot(enhancedColor, vec3(0.299, 0.587, 0.114)));
          return mix(grayscale, enhancedColor, saturation);
        }

        void main() {
          vec4 color = texture2D(chlorophyllData, vUv);
          if (length(color.rgb) < 0.05) {
            gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
          } else {
            vec3 enhancedColor = enhanceColor(color.rgb);
            float light = dot(vNormal, normalize(vec3(1, 1, 1)));
            gl_FragColor = vec4(enhancedColor * (0.5 + 0.5 * light), 1.0);
          }
        }
      `,
      transparent: true,
    });

    const globe = new THREE.Mesh(geometry, material);
    scene.add(globe);
    globeRef.current = globe;

    camera.position.z = 10;

    // Add orbit controls for rotation and zoom
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;

    // Create starfield background
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({
      color: 0xFFFFFF,
      size: 0.1,
      transparent: true
    });

    const starVertices = [];
    for (let i = 0; i < 10000; i++) {
      const x = (Math.random() - 0.5) * 2000;
      const y = (Math.random() - 0.5) * 2000;
      const z = -Math.random() * 2000;
      starVertices.push(x, y, z);
    }

    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const starField = new THREE.Points(starGeometry, starMaterial);
    scene.add(starField);

    // Raycaster for mouse interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // Function to convert color to chlorophyll concentration
    const colorToConcentration = (r, g, b) => {
      const normalizedR = r / 255;
      const normalizedG = g / 255;
      const normalizedB = b / 255;

      const luminance = 0.299 * normalizedR + 0.587 * normalizedG + 0.114 * normalizedB;

      const minConcentration = 0.01;
      const maxConcentration = 20;
      const concentration = minConcentration + (1 - luminance) * (maxConcentration - minConcentration);

      return concentration;
    };

    // Mouse move event for popups
    const onMouseMove = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(globe);

      if (intersects.length > 0) {
        const intersectionPoint = intersects[0].point;
        const lat = 90 - Math.acos(intersectionPoint.y / 5) * 180 / Math.PI;
        const lon = (270 + Math.atan2(intersectionPoint.x, intersectionPoint.z) * 180 / Math.PI) % 360 - 180;

        const uv = intersects[0].uv;
        const pixelBuffer = new Uint8Array(4);
        renderer.readRenderTargetPixels(
          renderer.getRenderTarget(),
          uv.x * renderer.domElement.width,
          uv.y * renderer.domElement.height,
          1,
          1,
          pixelBuffer
        );

        const concentration = colorToConcentration(pixelBuffer[0], pixelBuffer[1], pixelBuffer[2]);

        setPopupInfo({
          show: true,
          text: `Lat: ${lat.toFixed(2)}°, Lon: ${lon.toFixed(2)}°
Chlorophyll: ${concentration.toFixed(2)} mg m^-3`,
          x: event.clientX,
          y: event.clientY
        });
      } else {
        setPopupInfo({ show: false, text: '', x: 0, y: 0 });
      }
    };

    window.addEventListener('mousemove', onMouseMove);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      
      // Safe cleanup of Three.js resources
      if (rendererRef.current) {
        rendererRef.current.dispose();
        rendererRef.current = null;
      }
      if (globeRef.current) {
        globeRef.current.geometry.dispose();
        globeRef.current.material.dispose();
        scene.remove(globeRef.current);
      }
      if (mountRef.current && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  // const changeSeason = (season) => {
  //   setCurrentSeason(season);
  // };

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center">
      <ColorScale/>
      <div ref={mountRef} className="w-full h-auto" />
      {popupInfo.show && (
        <div 
          className="absolute bg-white bg-opacity-80 p-2 rounded shadow"
          style={{ left: popupInfo.x + 10, top: popupInfo.y + 10 }}
        >
          {popupInfo.text}
        </div>
      )}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
        <button onClick={goBack} className="px-4 py-2 bg-green-500 text-white rounded">
          <ChevronLeft/>
          <span>Back</span>
        </button>
      </div>
    </div>
  );
};

export default ChlorophyllGlobe;
