import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { WishlistProvider } from './context/WishlistContext.jsx';
import { RecentlyViewedProvider } from './context/RecentlyViewedContext.jsx';
import AppRouter from './routes/AppRouter.jsx';

function App() {
  return (
    <ThemeProvider>
      <WishlistProvider>
        <RecentlyViewedProvider>
          <BrowserRouter>
            <AppRouter />
          </BrowserRouter>
        </RecentlyViewedProvider>
      </WishlistProvider>
    </ThemeProvider>
  );
}

export default App;
