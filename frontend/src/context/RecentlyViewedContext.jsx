import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

const STORAGE_KEY = 'rakhi-recently-viewed';
const MAX_ITEMS = 8;
const RecentlyViewedContext = createContext(null);

function readStored() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function RecentlyViewedProvider({ children }) {
  const [recentlyViewed, setRecentlyViewed] = useState(readStored);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  const recordView = useCallback((productId) => {
    setRecentlyViewed((prev) => {
      const next = [productId, ...prev.filter((id) => id !== productId)];
      return next.slice(0, MAX_ITEMS);
    });
  }, []);

  return (
    <RecentlyViewedContext.Provider value={{ recentlyViewed, recordView }}>
      {children}
    </RecentlyViewedContext.Provider>
  );
}

RecentlyViewedProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useRecentlyViewed() {
  const ctx = useContext(RecentlyViewedContext);
  if (!ctx) {
    throw new Error(
      'useRecentlyViewed must be used within RecentlyViewedProvider'
    );
  }
  return ctx;
}
