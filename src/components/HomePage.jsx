import SpaceshipDisplay from "./SpaceshipDisplay";

const messages = [
  "The NASA PACE (Plankton, Aerosol, Cloud, ocean Ecosystem) satellite is a significant mission aimed at advancing our understanding of Earth's oceans and atmosphere. Here are some key details about the satellite:",
  "sdljfslkdjflskdfjskldfjsdfj",
  "sdjlfjsdlkfjskldfjsdklfjsklfj",
  "sdjfklsjfklsdjffjsdklf"
]


const HomePage = () => {

  return (
        <SpaceshipDisplay messages={messages}/>
  );
};

export default HomePage;