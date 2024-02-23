import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ImageSlider from "./components/image-slider";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <ImageSlider url={"http://localhost:3001/api/images"} />
    </>
  );
}

export default App;
