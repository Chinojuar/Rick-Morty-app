import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

const CharactersList = React.lazy(() => import('mfCharacters/CharactersList'));
const CharacterDetail = React.lazy(() => import('mfCharacterDetail/CharacterDetail'));

const App = () => {
  return (
    <BrowserRouter>
      <div style={styles.appContainer}>
        <header style={styles.navbar}>
          <Link to="/" style={styles.brandLink}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Rick_and_Morty.svg"
              alt="Rick and Morty Logo"
              style={styles.logo}
            />
          </Link>
        </header>

        <main style={styles.mainContent}>
          <Suspense fallback={<div style={styles.loader}>Cargando aplicación...</div>}>
            <Routes>
              <Route path="/" element={<CharactersList />} />
              <Route path="/character/:id" element={<CharacterDetail />} />
            </Routes>
          </Suspense>
        </main>

        <footer style={styles.footer}>
          <p style={styles.footerText}>
            © {new Date().getFullYear()} Todos los derechos reservados Luis Felipe Juarez Ortega
          </p>
        </footer>
      </div>
    </BrowserRouter>
  );
};

const styles = {
  appContainer: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#202329',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  navbar: {
    padding: '1rem 2rem',
    backgroundColor: '#1b1d22',
    display: 'flex',
    alignItems: 'center',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.4)',
    borderBottom: '1px solid #33373e',
  },
  brandLink: {
    display: 'inline-flex',
    alignItems: 'center',
    textDecoration: 'none',
  },
  logo: {
    height: '48px',
    width: 'auto',
    objectFit: 'contain',
  },
  mainContent: {
    flex: '1',
    padding: '1.5rem',
  },
  loader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '3rem',
    color: '#00b0c8',
    fontSize: '1.1rem',
    fontWeight: '600',
  },
  footer: {
    padding: '1.5rem',
    backgroundColor: '#1b1d22',
    borderTop: '1px solid #33373e',
    textAlign: 'center',
  },
  footerText: {
    margin: 0,
    color: '#9e9e9e',
    fontSize: '0.9rem',
    fontWeight: '500',
  },
};

export default App;