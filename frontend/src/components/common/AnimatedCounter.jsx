import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useInView } from 'framer-motion';

export default function AnimatedCounter({ to, suffix = '', duration = 1.2 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return undefined;

    let start;
    let frame;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / (duration * 1000), 1);
      setValue(Math.floor(progress * to));
      if (progress < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);

    return () => cancelAnimationFrame(frame);
  }, [inView, to, duration]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}

AnimatedCounter.propTypes = {
  to: PropTypes.number.isRequired,
  suffix: PropTypes.string,
  duration: PropTypes.number,
};
