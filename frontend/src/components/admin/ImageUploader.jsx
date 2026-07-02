import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Upload, X, Loader2 } from 'lucide-react';
import { uploadImage, deleteImage } from '../../services/api/upload.api.js';

export default function ImageUploader({ images, onChange }) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef(null);

  const handleFiles = async (files) => {
    setUploading(true);
    try {
      const uploaded = [];
      for (const file of Array.from(files)) {
        // Sequential on purpose: preserves upload order and avoids
        // hammering Cloudinary with a burst of concurrent uploads.
        // eslint-disable-next-line no-await-in-loop
        const result = await uploadImage(file);
        uploaded.push(result);
      }
      onChange([...images, ...uploaded]);
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = (index) => {
    const image = images[index];
    onChange(images.filter((_, i) => i !== index));
    if (image.publicId) {
      deleteImage(image.publicId).catch(() => {});
    }
  };

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        {images.map((image, index) => (
          <div
            key={image.publicId || image.url}
            className="relative h-24 w-24 overflow-hidden rounded-xl"
          >
            <img src={image.url} alt="" className="h-full w-full object-cover" />
            <button
              type="button"
              onClick={() => handleRemove(index)}
              aria-label="Remove image"
              className="absolute right-1 top-1 rounded-full bg-black/60 p-1 text-white"
            >
              <X size={12} />
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex h-24 w-24 flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-beige text-maroon-deep/50 transition hover:border-saffron hover:text-saffron-text disabled:opacity-60 dark:border-maroon dark:text-cream/50 dark:hover:text-saffron"
        >
          {uploading ? (
            <Loader2 size={20} className="animate-spin" aria-hidden="true" />
          ) : (
            <Upload size={20} aria-hidden="true" />
          )}
          <span className="text-xs">{uploading ? 'Uploading' : 'Add image'}</span>
        </button>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => {
          if (e.target.files.length > 0) handleFiles(e.target.files);
          e.target.value = '';
        }}
      />
    </div>
  );
}

ImageUploader.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({ url: PropTypes.string, publicId: PropTypes.string })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
};
