import { useEffect, useState } from "react";

export default function useCheckMobileScreen() {
	const [width, setWidth] = useState(window.innerWidth);
	function handleWindowSizeChange() {
		setWidth(window.innerWidth);
	}

	useEffect(() => {
		window.addEventListener("resize", handleWindowSizeChange);

		return () => {
			window.removeEventListener("resize", handleWindowSizeChange);
		};
	}, []);
	return (width <= 768);
}
