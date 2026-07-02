import { useEffect, useState } from 'react';
import { getProducts } from '../services/api/products.api.js';

export function useProductsByIds(ids) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const key = ids.join(',');

  useEffect(() => {
    if (ids.length === 0) {
      setProducts([]);
      setLoading(false);
      return undefined;
    }

    let ignore = false;
    setLoading(true);
    getProducts({ limit: 100 })
      .then((res) => {
        if (ignore) return;
        const byId = new Map(res.items.map((p) => [p._id, p]));
        setProducts(ids.map((id) => byId.get(id)).filter(Boolean));
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });
    return () => {
      ignore = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return { products, loading };
}
