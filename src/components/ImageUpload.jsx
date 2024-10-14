import React, { useEffect, useState } from "react";
import { Camera, Upload, Microscope, Lightbulb, Book } from "lucide-react";
import axios from "axios";

const ImageUpload = () => {
	const [image, setImage] = useState(null);
	const [prompt, setPrompt] = useState("");
	const [analyzing, setAnalyzing] = useState(false);
	const [result, setResult] = useState(null);

	useEffect(() => {
		const backgroundElement = document.getElementById("hero-background");
		if (backgroundElement) {
			// Use a low-res placeholder
			backgroundElement.style.backgroundImage = `
        linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), 
        url('/green_phyto.webp')
      `;
		}
	}, []);

	const uploadImage = (e) => {
		const file = e.target.files[0];
		setImage(file);
	};

	const analyzeImage = async () => {
		setAnalyzing(true);
		// setTimeout(() => {
		//   setResult("Wow! I see tiny round things that look like happy faces. These might be cells!");
		//   setAnalyzing(false);
		// }, 2000);
		const formData = new FormData();
		formData.append("file", image);
		formData.append("prompt", prompt);
		try {
			const response = await axios.post(
				"https://slurpping-api.onrender.com/api/ocean/analyze",
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);
			console.log(response.data);
			setResult(response.data.text);
		} catch (error) {
			console.error("Error analyzing image:", error);
			setResult("An error occurred while analyzing the image.");
		} finally {
			setAnalyzing(false);
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-b from-teal-100 to-cyan-200 p-4 font-comic-sans">
			<div
				className="absolute inset-0 bg-cover bg-center transition-all duration-500 ease-in-out"
				id="hero-background"
			></div>
			<div className="max-w-4xl mx-auto">
				<header className="text-center mb-8">
					<h1
						className="text-4xl font-bold text-teal-700 mb-4 transform -rotate-2 shadow-lg"
						style={{
							textShadow:
								"0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.6)",
						}}
					>
						🔬 Micro-World Explorer 🔬
					</h1>
					<p
						className="text-xl text-teal-600 animate-bounce font-semibold"
						style={{
							textShadow:
								"0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.6)",
						}}
					>
						Let's discover tiny wonders together!
					</p>
				</header>

				<div className="grid md:grid-cols-2 gap-8">
					<section className="bg-white rounded-3xl shadow-lg overflow-hidden transform rotate-1">
						<div className="p-6 space-y-6">
							<h2 className="text-2xl font-bold text-teal-600 flex items-center">
								<Camera className="w-8 h-8 mr-2 text-teal-500" />
								Snap & Explore!
							</h2>
							<div className="flex justify-center items-center h-48 bg-cyan-50 rounded-3xl border-4 border-dashed border-cyan-200">
								{image ? (
									<img
										src={URL.createObjectURL(image)}
										alt="Your micro-world"
										className="max-h-full max-w-full object-contain rounded-2xl"
									/>
								) : (
									<div className="text-center">
										<Microscope className="mx-auto text-cyan-400 w-16 h-16 mb-2 animate-pulse" />
										<p className="text-lg text-cyan-600">
											No tiny world yet!
										</p>
									</div>
								)}
							</div>
							<div>
								<label
									htmlFor="image-upload"
									className="btn w-full flex items-center justify-center py-3 px-4 rounded-full shadow-md text-lg font-bold text-white bg-teal-500 hover:bg-teal-600 transform transition hover:scale-105"
								>
									<Upload className="w-6 h-6 mr-2" />
									Upload Your Water Sample
								</label>
								<input
									id="image-upload"
									type="file"
									accept="image/*"
									onChange={uploadImage}
									className="hidden"
								/>
							</div>
							<input
								type="text"
								placeholder="What do you want to know about your image?"
								value={prompt}
								onChange={(e) => setPrompt(e.target.value)}
								className="w-full px-4 py-3 border-2 border-cyan-300 rounded-full shadow-inner text-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
							/>
							<button
								onClick={analyzeImage}
								disabled={!image || !prompt || analyzing}
								className={`w-full flex items-center justify-center py-3 px-4 rounded-full shadow-md text-lg font-bold text-white ${
									image && prompt && !analyzing
										? "bg-cyan-500 hover:bg-cyan-600 transform transition hover:scale-105"
										: "bg-gray-300 cursor-not-allowed"
								} focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2`}
							>
								{analyzing
									? "🔍 Exploring..."
									: "🚀 Start Exploring!"}
							</button>
							{result && (
								<div className="mt-4 p-4 bg-green-100 rounded-2xl border-4 border-green-200">
									<h3 className="text-lg font-bold text-green-700 mb-2">
										Wow! Look what I found:
									</h3>
									<p className="text-green-600">{result}</p>
								</div>
							)}
						</div>
					</section>

					<section className="space-y-8">
						<div className="bg-yellow-50 rounded-3xl shadow-lg overflow-hidden transform -rotate-1">
							<div className="p-6">
								<h2 className="text-2xl font-bold text-yellow-700 mb-4 flex items-center">
									<Lightbulb className="w-8 h-8 mr-2 text-yellow-500" />
									How to Be a Micro-Explorer
								</h2>
								<ol className="list-decimal list-inside space-y-2 text-yellow-700">
									<li className="animate-bounce">
										Find a cool tiny thing
									</li>
									<li className="animate-bounce delay-100">
										Take a picture with your microscope
									</li>
									<li className="animate-bounce delay-200">
										Upload your discovery
									</li>
									<li className="animate-bounce delay-300">
										Ask a question about what you see
									</li>
									<li className="animate-bounce delay-400">
										Get ready to be amazed!
									</li>
								</ol>
							</div>
						</div>

						<div className="bg-blue-50 rounded-3xl shadow-lg overflow-hidden transform rotate-1">
							<div className="p-6">
								<h2 className="text-2xl font-bold text-blue-700 mb-4 flex items-center">
									<Book className="w-8 h-8 mr-2 text-blue-500" />
									Fun Micro-Facts!
								</h2>
								<ul className="space-y-2 text-blue-600">
									<li className="flex items-center">
										<span className="text-2xl mr-2">
											🦠
										</span>
										Phytoplankton produce more that 50% of
										the worlds oxyzen!
									</li>
									<li className="flex items-center">
										<span className="text-2xl mr-2">🪸</span>
										Algie bloom can reduce the oxyzen
										concentration of water!
									</li>
									<li className="flex items-center">
										<span className="text-2xl mr-2">
											🧫
										</span>
										Harmful algie bloom can release toxin in
										water making it harmful for other
										species!
									</li>
								</ul>
							</div>
						</div>
					</section>
				</div>
			</div>
		</div>
	);
};

export default ImageUpload;
