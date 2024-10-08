import { ChevronLeft } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
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

const ChlorophyllGlobe = () => {
	const mountRef = useRef(null);
	const globeRef = useRef(null);
	const rendererRef = useRef(null);
	const [popupInfo, setPopupInfo] = useState({
		show: false,
		text: "",
		x: 0,
		y: 0,
	});
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({x: 0, y: 0});
	const [concentrationData, setConcentrationData] = useState(null);
  const [tempData, setTempData] = useState(null);
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
				const resjson = await res.json();
        const chlorophyllData = resjson.table.rows;

				setConcentrationData(chlorophyllData);
        
			} catch (error) {
				console.error("Error fetching ocean data:", error);
			}
		};

		fetchOceanData();
	}, []);

  useEffect(() => {
		const fetchTempData = async () => {
			try {
				const res = await fetch("/erdHadISST_2bfd_8875_21df.json");
				if (!res.ok) {
					throw new Error(`HTTP error! status: ${res.status}`);
				}
				const resjson = await res.json();
        const tempData = resjson.table.rows;

				setTempData(tempData);
			} catch (error) {
				console.error("Error fetching temp data:", error);
			}
		};

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

		// Rotate the geometry to align with geographic coordinates
		geometry.rotateY(-Math.PI / 2);

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

		// Add orbit controls for rotation and zoom
		const controls = new OrbitControls(camera, renderer.domElement);
		controls.enableDamping = true;
		controls.dampingFactor = 0.25;
		controls.enableZoom = true;
		controls.enableRotate = true;
		controls.minPolarAngle = 0;
		controls.maxPolarAngle = Math.PI;

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

		// Raycaster for mouse interaction
		const raycaster = new THREE.Raycaster();
		const mouse = new THREE.Vector2();

		// Mouse move event for popups
		const onMouseMove = async (event) => {
			mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
			mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      // console.log("mouse move");

			raycaster.setFromCamera(mouse, camera);
			const intersects = raycaster.intersectObject(globe);

			if (intersects.length > 0) {
				const intersectionPoint = intersects[0].point
					.clone()
					.normalize();

				// Corrected latitude and longitude calculations
				const lat =
					90 - Math.acos(intersectionPoint.y) * (180 / Math.PI);
				let lon =
					Math.atan2(intersectionPoint.x, intersectionPoint.z) *
					(180 / Math.PI);
				lon = ((lon + 180) % 360) - 180;

				const getConcentration = (lat, lon) => {
					if (!concentrationData) return "Loading...";

					// Find the closest data point
					const closestPoint = concentrationData.reduce(
						(closest, point) => {
							const pointLat = point[1];
							const pointLon = point[2];
							const pointConcentration = point[3];
							const distance = Math.sqrt(
								Math.pow(pointLat - lat, 2) +
									Math.pow(pointLon - lon, 2)
							);
							return distance < closest.distance
								? {
										distance,
										concentration: pointConcentration,
								  }
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

					// Find the closest data point
					const closestPoint = tempData.reduce(
						(closest, point) => {
							const pointLat = point[1];
							const pointLon = point[2];
							const pointTemp = point[3];
							const distance = Math.sqrt(
								Math.pow(pointLat - lat, 2) +
									Math.pow(pointLon - lon, 2)
							);
							return distance < closest.distance
								? {
										distance,
										temperature: pointTemp,
								  }
								: closest;
						},
						{ distance: Infinity, temperature: null }
					);

					return closestPoint.temperature !== null
						? closestPoint.temperature.toFixed(2)
						: "N/A";
				};

				let concentration = getConcentration(lat, lon);
        let temperature = getTemp(lat, lon);

				setPopupInfo({
					show: true,
					text: `Lat: ${lat.toFixed(2)}°, Lon: ${lon.toFixed(2)}°
Chlorophyll: ${concentration} mg/m^3, Temperature: ${temperature}°C`,
					lat: lat.toFixed(2),
					lon: lon.toFixed(2),
          concentration,
          temperature,
					x: event.clientX,
					y: event.clientY,
				});
			} else {
				setPopupInfo({ show: false, text: "", x: 0, y: 0 });
			}
		};

		window.addEventListener("mousemove", onMouseMove);

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
			window.removeEventListener("mousemove", onMouseMove);

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
			if (
				mountRef.current &&
				mountRef.current.contains(renderer.domElement)
			) {
				mountRef.current.removeChild(renderer.domElement);
			}
		};
	}, [concentrationData, tempData]);

	return (
		<div className="relative w-full h-screen flex flex-col items-center justify-center">
			<ColorScale />
			<div ref={mountRef} className="w-full h-auto" />
			{popupInfo.show && (
				<div
					className="absolute bg-black text-white bg-opacity-80 p-2 rounded shadow"
					style={{ left: popupInfo.x + 10, top: popupInfo.y + 10 }}
				>
					<span className="font-bold text-green-500">Lattitude: </span>
					{popupInfo.lat}<br/>
					<span className="font-bold text-green-500">Longitude: </span>
					{popupInfo.lon}<br/>
					<span className="font-bold text-green-500">Concentration: </span>
					{popupInfo.concentration}mg/m^3<br/>
          <span className="font-bold text-green-500">Temperature: </span>
					{popupInfo.temperature}°C
				</div>
			)}
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