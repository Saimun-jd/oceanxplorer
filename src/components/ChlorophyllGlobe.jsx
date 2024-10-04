import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, CircleX, Droplet, Info, MapPin, Thermometer } from "lucide-react";
import { useNavigate } from "react-router-dom";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

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

const Modal = ({ isOpen, onClose, children }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      >
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ type: "spring", damping: 15 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-lg p-6 w-full max-w-md"
        >
          {children}
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const DataItem = ({ icon, label, value }) => {
  return (
    <div className="flex items-center">
      <div className="mr-3">{icon}</div>
      <div>
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className="text-lg font-medium text-gray-800">{value}</p>
      </div>
    </div>
  );
};

const ChlorophyllGlobe = () => {
  const mountRef = useRef(null);
  const globeRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);
  const [popupInfo, setPopupInfo] = useState({
    show: false,
    text: "",
    x: 0,
    y: 0,
  });
  const [modalInfo, setModalInfo] = useState(null);
  const [concentrationData, setConcentrationData] = useState(null);
  const [tempData, setTempData] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/");
  };

  useEffect(() => {
    const fetchOceanData = async () => {
      try {
        const res = await fetch("/erdMH1chla8day_bfc4_6d67_4e95.json");
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const chlorophyllData = await res.json();
        setConcentrationData(chlorophyllData.table.rows);
      } catch (error) {
        console.error("Error fetching ocean data:", error);
      }
    };

    const fetchTempData = async () => {
      try {
        const res = await fetch("/erdHadISST_2bfd_8875_21df.json");
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const tempData = await res.json();
        setTempData(tempData.table.rows);
      } catch (error) {
        console.error("Error fetching temperature data:", error);
      }
    };

    fetchOceanData();
    fetchTempData();
  }, []);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    rendererRef.current = renderer;

    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Create globe
    const geometry = new THREE.SphereGeometry(5, 64, 64);
    const loader = new THREE.TextureLoader();
    const chlorophyllData = loader.load("/chlorophyll-concentration.png");

    geometry.rotateY(-Math.PI / 2);

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
          vec3 enhancedColor = enhanceColor(color.rgb);
          float light = dot(vNormal, normalize(vec3(1, 1, 1)));
          gl_FragColor = vec4(enhancedColor * (0.5 + 0.5 * light), 1.0);
        }
      `,
      transparent: false,
    });

    const globe = new THREE.Mesh(geometry, material);
    scene.add(globe);
    globeRef.current = globe;

    camera.position.z = 10;

    // Add orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controlsRef.current = controls;
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;
    controls.enablePan = false;

    // Create starfield background
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.1,
      transparent: true,
    });

    const starVertices = [];
    for (let i = 0; i < 10000; i++) {
      const x = (Math.random() - 0.5) * 2000;
      const y = (Math.random() - 0.5) * 2000;
      const z = (Math.random() - 0.5) * 2000;
      starVertices.push(x, y, z);
    }

    starGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(starVertices, 3)
    );
    const starField = new THREE.Points(starGeometry, starMaterial);
    scene.add(starField);

    // Raycaster for mouse/touch interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleInteraction = (event) => {
      const clientX = event.clientX || (event.touches && event.touches[0].clientX);
      const clientY = event.clientY || (event.touches && event.touches[0].clientY);

      mouse.x = (clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(globe);

      if (intersects.length > 0) {
        const intersectionPoint = intersects[0].point.clone().normalize();
        const lat = 90 - Math.acos(intersectionPoint.y) * (180 / Math.PI);
        let lon = Math.atan2(intersectionPoint.x, intersectionPoint.z) * (180 / Math.PI);
        lon = ((lon + 180) % 360) - 180;

        const concentration = getConcentration(lat, lon);
        const temperature = getTemp(lat, lon);

        setPopupInfo({
          show: true,
          text: `Lat: ${lat.toFixed(2)}°, Lon: ${lon.toFixed(2)}°
Chlorophyll: ${concentration} mg/m^3
Temperature: ${temperature}°C`,
          x: clientX,
          y: clientY,
        });
      } else {
        setPopupInfo({ show: false, text: "", x: 0, y: 0 });
      }
    };

    const handleClick = (event) => {
      if (!isDragging) {
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObject(globe);

        if (intersects.length > 0) {
          const intersectionPoint = intersects[0].point.clone().normalize();
          const lat = 90 - Math.acos(intersectionPoint.y) * (180 / Math.PI);
          let lon = Math.atan2(intersectionPoint.x, intersectionPoint.z) * (180 / Math.PI);
          lon = ((lon + 180) % 360) - 180;

          const concentration = getConcentration(lat, lon);
          const temperature = getTemp(lat, lon);

          setModalInfo({
            latitude: lat.toFixed(2),
            longitude: lon.toFixed(2),
            concentration,
            temperature,
          });
        }
      }
    };

    const handleTouchStart = () => {
      setIsDragging(false);
    };

    const handleTouchMove = () => {
      setIsDragging(true);
    };

    const handleTouchEnd = (event) => {
      if (!isDragging) {
        handleClick(event);
      }
    };

    renderer.domElement.addEventListener("mousemove", handleInteraction);
    renderer.domElement.addEventListener("click", handleClick);
    renderer.domElement.addEventListener("touchstart", handleTouchStart);
    renderer.domElement.addEventListener("touchmove", handleTouchMove);
    renderer.domElement.addEventListener("touchend", handleTouchEnd);

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
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.domElement.removeEventListener("mousemove", handleInteraction);
      renderer.domElement.removeEventListener("click", handleClick);
      renderer.domElement.removeEventListener("touchstart", handleTouchStart);
      renderer.domElement.removeEventListener("touchmove", handleTouchMove);
      renderer.domElement.removeEventListener("touchend", handleTouchEnd);

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
  }, [concentrationData, tempData, isDragging]);

  const getConcentration = (lat, lon) => {
    if (!concentrationData) return "Loading...";

    const closestPoint = concentrationData.reduce(
      (closest, point) => {
        const pointLat = point[1];
        const pointLon = point[2];
        const pointConcentration = point[3];
        const distance = Math.sqrt(
          Math.pow(pointLat - lat, 2) + Math.pow(pointLon - lon, 2)
        );
        return distance < closest.distance
          ? { distance, concentration: pointConcentration }
          : closest;
      },
      { distance: Infinity, concentration: null }
    );

    return closestPoint.concentration !== null
      ? closestPoint.concentration.toFixed(2)
      : "N/A";
  };

  const getTemp = (lat, lon) => {
    if (!tempData) return "Loading...";

    const closestPoint = tempData.reduce(
      (closest, point) => {
        const pointLat = point[1];
        const pointLon = point[2];
        const pointTemp = point[3];
        const distance = Math.sqrt(
          Math.pow(pointLat - lat, 2) + Math.pow(pointLon - lon, 2)
        );
        return distance < closest.distance
          ? { distance, temp: pointTemp }
          : closest;
      },
      { distance: Infinity, temp: null }
    );

    return closestPoint.temp !== null ? closestPoint.temp.toFixed(2) : "N/A";
  };

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center">
      <ColorScale />
      <div ref={mountRef} className="w-full h-auto" />
      
      {popupInfo.show && (
        <div
          className="absolute bg-black text-white bg-opacity-80 p-2 rounded shadow"
          style={{ left: popupInfo.x + 10, top: popupInfo.y + 10 }}
        >
          <pre>{popupInfo.text}</pre>
        </div>
      )}

      <Modal isOpen={!!modalInfo} onClose={() => setModalInfo(null)}>
        {modalInfo && (
          <div className="p-6">
            <div className="flex flex-row justify-between items-center">
            <h2 className="text-2xl font-bold mb-4 text-blue-600">Location Data</h2>
            <button onClick={() => {setModalInfo(null)}}><CircleX/></button>
            </div>
            <div className="space-y-4">
              <DataItem
                icon={<MapPin className="text-red-500" />}
                label="Coordinates"
                value={`${modalInfo.latitude}°, ${modalInfo.longitude}°`}
              />
              <DataItem
                icon={<Droplet className="text-blue-500" />}
                label="Chlorophyll Concentration"
                value={`${modalInfo.concentration} mg/m^3`}
              />
              <DataItem
                icon={<Thermometer className="text-orange-500" />}
                label="Ocean Temperature"
                value={`${modalInfo.temperature}°C`}
              />
              <DataItem
                icon={<Info className="text-green-500" />}
                label="Additional Info"
                value="Data based on satellite observations"
              />
            </div>
            <div className="mt-6 p-4 bg-gray-100 rounded-lg">
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Verdict</h3>
              <p className="text-gray-600">
                This location shows typical chlorophyll concentrations for its latitude.
                Further analysis may be needed for specific ecological assessments.
              </p>
            </div>
          </div>
        )}
      </Modal>

      <div className="fixed bottom-4 right-4 z-10">
				<button
					onClick={goBack}
					className="px-4 py-2 bg-green-500 text-white rounded"
				>
					<ChevronLeft />
					<span>Back</span>
				</button>
			</div>
		</div>
	);
};

export default ChlorophyllGlobe;