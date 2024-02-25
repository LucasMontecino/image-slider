import { useEffect, useState } from "react";
import "./styles.css";

// eslint-disable-next-line react/prop-types
export default function ImageSlider({ url }) {
  const [images, setImages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchImages(getUrl) {
    try {
      setLoading(true);
      const res = await fetch(getUrl);
      const data = await res.json();
      if (data) {
        setImages(data);
        setLoading(false);
      }
    } catch (err) {
      setErrors(err.message);
      setLoading(false);
    }
  }

  function handleBtnPrev() {
    if (currentSlide === 0) {
      setCurrentSlide(images.length - 1);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  }

  function handleBtnNext() {
    if (currentSlide === images.length - 1) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  }

  function handleCurrentSlide(getCurrentIndex) {
    setCurrentSlide(getCurrentIndex);
  }

  function handleChangeSlide() {
    setTimeout(() => {
      if (currentSlide === images.length - 1) {
        setCurrentSlide(0);
      } else {
        setCurrentSlide(currentSlide + 1);
      }
    }, 2000);
  }

  useEffect(() => {
    if (!images.length) {
      console.log("hola");
      fetchImages(url);
    }

    setTimeout(() => {
      handleChangeSlide();
    }, 3000);
  }, [url, currentSlide]);

  if (loading)
    return <p>Please wait ! This is not gonna take a few seconds more.</p>;

  if (errors !== null) return <p style={{ color: "#E74C3C" }}>{errors}</p>;

  return (
    <div className="container">
      <div className="arrow arrow-left" onClick={handleBtnPrev}>
        <span>«</span>
      </div>
      {images && images.length ? (
        images.map(
          (img, index) =>
            index === currentSlide && (
              <img
                src={img.url}
                alt={img.description}
                key={img.id}
                className="image-item"
              />
            )
        )
      ) : (
        <p>No images to show</p>
      )}
      <div className="circle-container">
        {[...Array(images.length)].map((_, index) => (
          <div
            className={`circle ${
              index === currentSlide ? "active" : "inactive"
            }`}
            key={index}
            onClick={() => handleCurrentSlide(index)}
          ></div>
        ))}
      </div>

      <div className="arrow arrow-right" onClick={handleBtnNext}>
        <span>»</span>
      </div>
    </div>
  );
}
