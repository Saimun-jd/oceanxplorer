import SpaceshipDisplay from "./SpaceshipDisplay";

const messages = [
  "loremfjslfjsdkfjskldfjlsdfj",
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