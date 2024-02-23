import { useEffect, useState } from "react";
import "./styles.css";

export default function ImageSlider({ url }) {
  const [images, setImages] = useState([]);
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

  useEffect(() => {
    fetchImages(url);
  }, [url]);

  if (loading)
    return <p>Please wait ! This is not gonna take a few seconds more.</p>;

  if (errors !== null) return <p style={{ color: "#E74C3C" }}>{errors}</p>;

  console.log(images);

  return (
    <div className="container">
      <div className="arrow arrow-left">
        <span>«</span>
      </div>
      {images && images.length ? (
        images.map((img, index) => (
          <img
            src={img.url}
            alt={img.description}
            key={img.id}
            className="image-item"
          />
        ))
      ) : (
        <p>No images to show</p>
      )}
      <div className="arrow arrow-right">
        <span>»</span>
      </div>
    </div>
  );
}
