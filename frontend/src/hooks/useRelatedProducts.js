import { useEffect, useState } from 'react';
import { getRelatedProducts } from '../services/api/products.api.js';

export function useRelatedProducts(productId) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productId) return undefined;

    let ignore = false;
    setLoading(true);
    getRelatedProducts(productId)
      .then((data) => {
        if (!ignore) setProducts(data);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });
    return () => {
      ignore = true;
    };
  }, [productId]);

  return { products, loading };
}
