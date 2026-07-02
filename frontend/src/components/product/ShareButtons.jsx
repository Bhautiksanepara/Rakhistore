import { useState } from 'react';
import PropTypes from 'prop-types';
import { MessageCircle, Share2, Link2, Check } from 'lucide-react';

export default function ShareButtons({ productName, url }) {
  const [copied, setCopied] = useState(false);
  const shareText = `Check out this Rakhi: ${productName}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable (e.g. insecure context) — nothing to do.
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: productName, text: shareText, url });
        return;
      } catch {
        // User cancelled the native share sheet — fall back to copy link.
      }
    }
    handleCopy();
  };

  return (
    <div className="flex items-center gap-2">
      <a
        href={`https://wa.me/?text=${encodeURIComponent(`${shareText} ${url}`)}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Share on WhatsApp"
        className="rounded-full bg-saffron/10 p-2 text-saffron-text transition hover:bg-saffron hover:text-maroon-deep dark:text-saffron"
      >
        <MessageCircle size={16} />
      </a>
      <button
        type="button"
        onClick={handleNativeShare}
        aria-label="Share via more apps"
        className="rounded-full bg-saffron/10 p-2 text-saffron-text transition hover:bg-saffron hover:text-maroon-deep dark:text-saffron"
      >
        <Share2 size={16} />
      </button>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? 'Link copied' : 'Copy link'}
        className="rounded-full bg-saffron/10 p-2 text-saffron-text transition hover:bg-saffron hover:text-maroon-deep dark:text-saffron"
      >
        {copied ? <Check size={16} /> : <Link2 size={16} />}
      </button>
    </div>
  );
}

ShareButtons.propTypes = {
  productName: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
