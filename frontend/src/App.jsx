import { BrowserRouter } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { WishlistProvider } from './context/WishlistContext.jsx';
import { RecentlyViewedProvider } from './context/RecentlyViewedContext.jsx';
import AppRouter from './routes/AppRouter.jsx';

function App() {
  return (
    <HelmetProvider>
      <MotionConfig reducedMotion="user">
        <ThemeProvider>
          <WishlistProvider>
            <RecentlyViewedProvider>
              <BrowserRouter>
                <AppRouter />
              </BrowserRouter>
            </RecentlyViewedProvider>
          </WishlistProvider>
        </ThemeProvider>
      </MotionConfig>
    </HelmetProvider>
  );
}

export default App;
