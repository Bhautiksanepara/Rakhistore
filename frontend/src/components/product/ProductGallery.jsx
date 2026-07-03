import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { AnimatePresence } from 'framer-motion';
import { optimizeImageUrl } from '../../utils/cloudinary.js';
import ImageLightbox from './ImageLightbox.jsx';

export default function ProductGallery({ images, productName }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoomStyle, setZoomStyle] = useState({ opacity: 0 });
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const containerRef = useRef(null);

  if (images.length === 0) {
    return (
      <div className="flex aspect-square items-center justify-center rounded-2xl bg-beige/40 text-maroon-deep/40 dark:bg-maroon/40 dark:text-cream/40">
        No image available
      </div>
    );
  }

  const activeImage = optimizeImageUrl(images[activeIndex].url, 800);
  const zoomImage = optimizeImageUrl(images[activeIndex].url, 1200);

  const handleMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomStyle({
      backgroundImage: `url(${zoomImage})`,
      backgroundPosition: `${x}% ${y}%`,
      opacity: 1,
    });
  };

  const handleMouseLeave = () => setZoomStyle((s) => ({ ...s, opacity: 0 }));

  return (
    <div>
      <button
        type="button"
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => setLightboxOpen(true)}
        aria-label="View full-screen image"
        className="relative aspect-square w-full cursor-zoom-in overflow-hidden rounded-2xl bg-beige/40 dark:bg-maroon/40"
      >
        <img
          src={activeImage}
          alt={productName}
          className="h-full w-full object-cover"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden bg-no-repeat opacity-0 transition-opacity duration-150 md:block"
          style={{ backgroundSize: '200%', ...zoomStyle }}
        />
      </button>

      {images.length > 1 && (
        <div className="mt-4 flex gap-3">
          {images.map((image, index) => (
            <button
              key={image.publicId || image.url}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`View image ${index + 1}`}
              aria-current={index === activeIndex}
              className={`h-16 w-16 shrink-0 overflow-hidden rounded-xl ring-2 transition ${
                index === activeIndex
                  ? 'ring-saffron'
                  : 'ring-transparent hover:ring-beige'
              }`}
            >
              <img
                src={optimizeImageUrl(image.url, 100)}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      <AnimatePresence>
        {lightboxOpen && (
          <ImageLightbox
            images={images}
            initialIndex={activeIndex}
            productName={productName}
            onClose={() => setLightboxOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

ProductGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({ url: PropTypes.string, publicId: PropTypes.string })
  ).isRequired,
  productName: PropTypes.string.isRequired,
};
