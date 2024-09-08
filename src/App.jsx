import "./App.css";
import ImageSlider from "./components/image-slider";

function App() {
  return (
    <>
      <ImageSlider url={"http://localhost:3001/api/images"} />
    </>
  );
}

export default App;
