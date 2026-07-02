import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';

const SITE_NAME = 'Rakhi Store';
const DEFAULT_DESCRIPTION =
  'Browse premium, handpicked Rakhis for Raksha Bandhan and order instantly on WhatsApp — no accounts, no checkout, just a conversation.';
const DEFAULT_IMAGE = '/favicon.svg';

export default function SEO({
  title = undefined,
  description = DEFAULT_DESCRIPTION,
  image = DEFAULT_IMAGE,
  noIndex = false,
  structuredData = undefined,
}) {
  const fullTitle = title
    ? `${title} | ${SITE_NAME}`
    : `${SITE_NAME} | Premium Rakhis for Raksha Bandhan`;
  const canonicalUrl = window.location.origin + window.location.pathname;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={canonicalUrl} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
}

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  noIndex: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  structuredData: PropTypes.object,
};
