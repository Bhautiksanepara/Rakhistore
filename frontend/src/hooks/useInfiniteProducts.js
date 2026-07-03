import { useCallback, useEffect, useRef, useState } from 'react';
import { getProducts } from '../services/api/products.api.js';

export function useInfiniteProducts(params) {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const key = JSON.stringify(params);
  const requestId = useRef(0);

  // Filters changed: reset to page 1 and refetch from scratch.
  useEffect(() => {
    const id = (requestId.current += 1);
    setLoading(true);
    setItems([]);
    setPage(1);
    getProducts({ ...JSON.parse(key), page: 1 })
      .then((res) => {
        if (id !== requestId.current) return;
        setItems(res.items);
        setTotal(res.total);
        setPages(res.pages);
      })
      .finally(() => {
        if (id === requestId.current) setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const loadMore = useCallback(() => {
    if (loadingMore || loading || page >= pages) return;
    const id = requestId.current;
    const nextPage = page + 1;
    setLoadingMore(true);
    getProducts({ ...JSON.parse(key), page: nextPage })
      .then((res) => {
        if (id !== requestId.current) return;
        setItems((prev) => [...prev, ...res.items]);
        setPage(nextPage);
        setTotal(res.total);
        setPages(res.pages);
      })
      .finally(() => setLoadingMore(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, page, pages, loading, loadingMore]);

  return {
    items,
    total,
    loading,
    loadingMore,
    hasMore: page < pages,
    loadMore,
  };
}
