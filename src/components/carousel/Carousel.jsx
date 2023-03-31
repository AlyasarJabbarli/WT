import "./style.css";
import axios from "axios";
import { useState, useEffect } from "react";
const Carousel = () => {
  const [data, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    axios
      .get("db.json")
      .then((response) => setData(response.data))
      .catch((error) => console.log(error));
  }, []);

  const handleClick = (direction) => {
    if (direction === "next") {
      setCurrentIndex(
        currentIndex >= data.carousel_images.length - 1 ? 0 : currentIndex + 1
      );
    } else {
      setCurrentIndex(
        currentIndex < 1 ? data.carousel_images.length - 1 : currentIndex - 1
      );
    }
  };

  const translateX = -currentIndex * 1180;
  return (
    <section id="carousel">
      <div className="carousel_all">
        <div
          className="slides"
          style={{ transform: `translateX(${translateX}px)` }}
        >
          {data.carousel_images &&
            data.carousel_images.map((img, index) => (
              <div className="slide"  key={index}>
                <div className="large_slide">
                  <img src={img} alt={""}></img>
                </div>
                <div className="small_slide">
                  <img src={img} alt={""}></img>
                </div>
              </div>
            ))}
        </div>
        <button className="prev" onClick={() => handleClick("prev")}>
          L
        </button>
        <button className="next" onClick={() => handleClick("next")}>
          R
        </button>
      </div>
    </section>
  );
};

export default Carousel;
