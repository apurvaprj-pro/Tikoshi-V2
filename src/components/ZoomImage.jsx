import React, { useState } from 'react';

const ZoomImage = ({ src, alt }) => {
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [showZoom, setShowZoom] = useState(false);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  return (
    <div
      className="relative group w-full max-w-[500px] mx-auto"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setShowZoom(true)}
      onMouseLeave={() => setShowZoom(false)}
    >
      {/* Base Image */}
      <img
        src={src}
        alt={alt}
        className="w-full h-auto rounded-lg shadow-md object-cover max-h-[500px] cursor-crosshair"
      />

      {/* Zoomed View */}
      {showZoom && (
        <div className="absolute top-0 left-full ml-4 w-[800px] h-[500px] border border-gray-300 bg-white rounded-lg overflow-hidden shadow-lg z-50 hidden md:block">
          <div
            className="w-full h-full bg-no-repeat bg-[length:200%] transition-all duration-100"
            style={{
              backgroundImage: `url(${src})`,
              backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ZoomImage;
