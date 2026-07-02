import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { WishlistProvider } from './context/WishlistContext.jsx';
import AppRouter from './routes/AppRouter.jsx';

function App() {
  return (
    <ThemeProvider>
      <WishlistProvider>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </WishlistProvider>
    </ThemeProvider>
  );
}

export default App;
