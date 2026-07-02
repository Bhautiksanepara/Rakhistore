import { useEffect, useState } from 'react';
import { getStats } from '../services/api/admin.api.js';

export function useStats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    getStats()
      .then((data) => {
        if (!ignore) setStats(data);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });
    return () => {
      ignore = true;
    };
  }, []);

  return { stats, loading };
}
