import OceanGuardian from "./OceanGuardianGame"
import useCheckMobileScreen from "../hooks/useCheckMobileScreen";
import { NavLink } from "react-router-dom";

const Game = () => {
  const isMobile = useCheckMobileScreen();

  return (
    <div className="app relative">
      {
        isMobile && (<div className="fixed inset-0 bg-black bg-opacity-50 text-white font-bold z-50 flex flex-col justify-center items-center text-center">
          <span>Please open desktop window for playing the game</span>
          <NavLink to="/" className="underline text-blue-500">Home</NavLink>
        </div>)
      }
        <OceanGuardian/>
    </div>

  )
}

export default Game