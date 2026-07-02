import { useCallback, useEffect, useState } from 'react';
import { getProducts } from '../services/api/products.api.js';

const EMPTY = { items: [], total: 0, page: 1, pages: 1 };

export function useProducts(params) {
  const [data, setData] = useState(EMPTY);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const key = JSON.stringify(params);

  const refetch = useCallback(() => {
    setLoading(true);
    return getProducts(JSON.parse(key))
      .then((res) => setData(res))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    getProducts(JSON.parse(key))
      .then((res) => {
        if (!ignore) setData(res);
      })
      .catch((err) => {
        if (!ignore) setError(err);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });
    return () => {
      ignore = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return { ...data, loading, error, refetch };
}
