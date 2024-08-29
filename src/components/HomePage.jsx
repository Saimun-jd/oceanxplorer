import SpaceshipDisplay from "./SpaceshipDisplay";

const messages = [
  "loremfjslfjsdkfjskldfjlsdfjfjskd fjsf sjdflksadjf saklfjasdklfjsfklajsdf klasdjfkjlfk sjdflasd kfjsdfkl jdslfksdjf klsdjfklsjfklsfjksdjfkdsfjsdkfjsdkljfskf sflskjfsklfjskdlfjksdljfskdfjksldfjfjklsdjfklsdjffkljsdklfjsdklfjksdjfklsdjfklsjfklsdjfksldffjs",
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