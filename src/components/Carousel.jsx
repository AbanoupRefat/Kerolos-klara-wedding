import { useState, useEffect } from "react";
import "./Carousel.css";

export default function Carousel({ items }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const minSwipeDistance = 50;

  const prev = () => setCurrentIndex((idx) => (idx === 0 ? items.length - 1 : idx - 1));
  const next = () => setCurrentIndex((idx) => (idx === items.length - 1 ? 0 : idx + 1));

  // Auto-play interval
  useEffect(() => {
    const timer = setInterval(() => {
      next();
    }, 4000); // Slide every 4 seconds
    return () => clearInterval(timer);
  }, [items.length]);

  // Touch and Mouse Handlers for Swiping
  const handleStart = (clientX) => {
    setIsDragging(true);
    setTouchEnd(null);
    setTouchStart(clientX);
  };

  const handleMove = (clientX) => {
    if (!isDragging) return;
    setTouchEnd(clientX);
  };

  const handleEnd = () => {
    setIsDragging(false);
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) next();
    if (distance < -minSwipeDistance) prev();
    
    // Reset
    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <div className="carousel">
      <div 
        className="carousel__track-container"
        onTouchStart={(e) => handleStart(e.targetTouches[0].clientX)}
        onTouchMove={(e) => handleMove(e.targetTouches[0].clientX)}
        onTouchEnd={handleEnd}
        onMouseDown={(e) => handleStart(e.clientX)}
        onMouseMove={(e) => handleMove(e.clientX)}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
      >
        <ul className="carousel__track">
          {items.map((item, i) => {
            // Determine relative position to the current index
            let offset = i - currentIndex;
            if (offset === items.length - 1) offset = -1; // If current is 0 and i is 2 -> make it left
            if (offset === -(items.length - 1)) offset = 1; // If current is 2 and i is 0 -> make it right

            let slideClass = "carousel__slide";
            if (offset === 0) slideClass += " carousel__slide--center";
            else if (offset === -1) slideClass += " carousel__slide--left";
            else if (offset === 1) slideClass += " carousel__slide--right";

            return (
              <li className={slideClass} key={i}>
                <figure className="memories__item">
                  <img 
                    src={item.src} 
                    alt={`Memory ${i + 1}`} 
                    loading="lazy" 
                    draggable="false" 
                  />
                  <figcaption>{item.caption}</figcaption>
                </figure>
              </li>
            );
          })}
        </ul>
      </div>
      
      <div className="carousel__nav">
        {items.map((_, i) => (
          <button
            key={i}
            className={`carousel__dot ${i === currentIndex ? "carousel__dot--active" : ""}`}
            onClick={() => setCurrentIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
