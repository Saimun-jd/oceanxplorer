import OceanGuardian from "./OceanGuardianGame"
import useCheckMobileScreen from "../hooks/useCheckMobileScreen";

const Game = () => {
  const isMobile = useCheckMobileScreen();

  return (
    <div className="app relative">
      {
        isMobile && (<div className="fixed inset-0 bg-black bg-opacity-50 text-white font-bold z-50 flex justify-center items-center text-center">
          <span>Please open desktop window for playing the game</span>
        </div>)
      }
        <OceanGuardian/>
    </div>

  )
}

export default Game