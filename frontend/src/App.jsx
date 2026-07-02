import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { WishlistProvider } from './context/WishlistContext.jsx';
import AppRouter from './routes/AppRouter.jsx';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <WishlistProvider>
          <BrowserRouter>
            <AppRouter />
          </BrowserRouter>
        </WishlistProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
