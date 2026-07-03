import { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';
import { optimizeImageUrl } from '../../utils/cloudinary.js';

const ZOOM_SCALE = 2.5;
const SWIPE_THRESHOLD = 60;

export default function ImageLightbox({
  images,
  initialIndex = 0,
  productName,
  onClose,
}) {
  const [index, setIndex] = useState(initialIndex);
  const [zoomed, setZoomed] = useState(false);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const dragState = useRef(null);
  const indexRef = useRef(index);
  indexRef.current = index;

  const goTo = useCallback(
    (nextIndex) => {
      if (nextIndex < 0 || nextIndex >= images.length) return;
      setIndex(nextIndex);
      setZoomed(false);
      setPan({ x: 0, y: 0 });
    },
    [images.length]
  );

  // Pressing the hardware/browser back button should close the viewer
  // instead of leaving the product page. We push one history entry on
  // open; every close path (X, backdrop, Escape, swipe-down-to-dismiss)
  // triggers history.back() so there's exactly one entry consumed either
  // way, and the popstate listener is the single place onClose fires.
  const closeViewer = useCallback(() => {
    window.history.back();
  }, []);

  useEffect(() => {
    window.history.pushState({ rakhiLightbox: true }, '');
    document.body.style.overflow = 'hidden';

    function handlePopState() {
      onClose();
    }
    function handleKeyDown(e) {
      if (e.key === 'Escape') closeViewer();
      if (e.key === 'ArrowLeft') goTo(indexRef.current - 1);
      if (e.key === 'ArrowRight') goTo(indexRef.current + 1);
    }

    window.addEventListener('popstate', handlePopState);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleZoom = () => {
    setZoomed((z) => !z);
    setPan({ x: 0, y: 0 });
  };

  const handleWheel = (e) => {
    e.preventDefault();
    if (e.deltaY < 0 && !zoomed) {
      setZoomed(true);
    } else if (e.deltaY > 0 && zoomed) {
      setZoomed(false);
      setPan({ x: 0, y: 0 });
    }
  };

  const handlePointerDown = (e) => {
    dragState.current = {
      startX: e.clientX,
      startY: e.clientY,
      panStartX: pan.x,
      panStartY: pan.y,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!dragState.current || !zoomed) return;
    const dx = e.clientX - dragState.current.startX;
    const dy = e.clientY - dragState.current.startY;
    setPan({
      x: dragState.current.panStartX + dx,
      y: dragState.current.panStartY + dy,
    });
  };

  const handlePointerUp = (e) => {
    if (!dragState.current) return;
    const dx = e.clientX - dragState.current.startX;
    const dy = e.clientY - dragState.current.startY;
    if (
      !zoomed &&
      Math.abs(dx) > SWIPE_THRESHOLD &&
      Math.abs(dx) > Math.abs(dy)
    ) {
      goTo(index + (dx < 0 ? 1 : -1));
    }
    dragState.current = null;
  };

  const image = images[index];

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex flex-col bg-black/95"
      role="dialog"
      aria-modal="true"
      aria-label={`${productName} image viewer`}
    >
      <div className="flex items-center justify-between p-4">
        <span className="text-sm text-white/70">
          {index + 1} / {images.length}
        </span>
        <button
          type="button"
          onClick={closeViewer}
          aria-label="Close"
          className="rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
        >
          <X size={20} />
        </button>
      </div>

      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <div
        onClick={(e) => {
          // Only close on a genuine backdrop click, not a click that
          // bubbled up from the image or the prev/next buttons.
          if (e.target === e.currentTarget) closeViewer();
        }}
        className="relative flex flex-1 items-center justify-center overflow-hidden"
      >
        {images.length > 1 && (
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            disabled={index === 0}
            aria-label="Previous image"
            className="absolute left-2 z-10 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20 disabled:opacity-30 sm:left-4"
          >
            <ChevronLeft size={24} />
          </button>
        )}

        <motion.img
          key={image.url}
          src={optimizeImageUrl(image.url, 1400)}
          alt={productName}
          onDoubleClick={toggleZoom}
          onWheel={handleWheel}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          animate={{ scale: zoomed ? ZOOM_SCALE : 1, x: pan.x, y: pan.y }}
          transition={{ type: 'tween', duration: 0.2 }}
          className={`max-h-full max-w-full touch-none object-contain select-none ${
            zoomed ? 'cursor-grab active:cursor-grabbing' : 'cursor-zoom-in'
          }`}
          draggable={false}
        />

        {images.length > 1 && (
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            disabled={index === images.length - 1}
            aria-label="Next image"
            className="absolute right-2 z-10 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20 disabled:opacity-30 sm:right-4"
          >
            <ChevronRight size={24} />
          </button>
        )}
      </div>

      <div className="flex items-center justify-center gap-2 p-4">
        <button
          type="button"
          onClick={toggleZoom}
          aria-label={zoomed ? 'Zoom out' : 'Zoom in'}
          className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white transition hover:bg-white/20"
        >
          {zoomed ? <ZoomOut size={16} /> : <ZoomIn size={16} />}
          {zoomed ? 'Zoom out' : 'Zoom in'}
        </button>
      </div>

      {images.length > 1 && (
        <div className="flex justify-center gap-2 overflow-x-auto pb-4">
          {images.map((img, i) => (
            <button
              key={img.publicId || img.url}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`View image ${i + 1}`}
              aria-current={i === index}
              className={`h-12 w-12 shrink-0 overflow-hidden rounded-lg ring-2 transition ${
                i === index ? 'ring-saffron' : 'ring-transparent'
              }`}
            >
              <img
                src={optimizeImageUrl(img.url, 100)}
                alt=""
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </motion.div>,
    document.body
  );
}

ImageLightbox.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({ url: PropTypes.string, publicId: PropTypes.string })
  ).isRequired,
  initialIndex: PropTypes.number,
  productName: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
