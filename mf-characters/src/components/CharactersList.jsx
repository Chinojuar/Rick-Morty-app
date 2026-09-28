import React from 'react';
import { useCharacters } from '../hooks/useCharacters';
import CharacterFilters from './CharacterFilters';
import CharacterCard from './CharacterCard';

const CharactersList = () => {
  const {
    characters,
    info,
    filters,
    loading,
    error,
    updateFilters,
    changePage,
  } = useCharacters();

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.mainTitle}>Directorio de Personajes</h1>
        <p style={styles.subtitle}>Explora y filtra los personajes del universo de Rick and Morty</p>
      </header>

      <CharacterFilters filters={filters} onFilterChange={updateFilters} />

      {/* Manejo de estado de carga */}
      {loading && (
        <div style={styles.feedbackContainer}>
          <div style={styles.spinner} />
          <p style={styles.feedbackText}>Consultando personajes...</p>
        </div>
      )}

      {/* Manejo de errores */}
      {!loading && error && (
        <div style={{ ...styles.feedbackContainer, backgroundColor: '#ffebee', color: '#c62828' }}>
          <p style={styles.feedbackText}>{error}</p>
        </div>
      )}

      {/* Sin resultados */}
      {!loading && !error && characters.length === 0 && (
        <div style={styles.feedbackContainer}>
          <p style={styles.feedbackText}>No se encontraron personajes con los filtros aplicados.</p>
        </div>
      )}

      {/* Grid de Personajes */}
      {!loading && !error && characters.length > 0 && (
        <>
          <div style={styles.grid}>
            {characters.map((char) => (
              <CharacterCard key={char.id} character={char} />
            ))}
          </div>

          {/* Controles de Paginación */}
          <div style={styles.pagination}>
            <button
              onClick={() => changePage(filters.page - 1)}
              disabled={!info.prev || loading}
              style={{
                ...styles.pageButton,
                opacity: !info.prev || loading ? 0.5 : 1,
                cursor: !info.prev || loading ? 'not-allowed' : 'pointer',
              }}
            >
              &larr; Anterior
            </button>

            <span style={styles.pageInfo}>
              Página {filters.page} de {info.pages || 1} ({info.count} personajes)
            </span>

            <button
              onClick={() => changePage(filters.page + 1)}
              disabled={!info.next || loading}
              style={{
                ...styles.pageButton,
                opacity: !info.next || loading ? 0.5 : 1,
                cursor: !info.next || loading ? 'not-allowed' : 'pointer',
              }}
            >
              Siguiente &rarr;
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '1.5rem',
    color: '#fff',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  header: {
    marginBottom: '1.5rem',
  },
  mainTitle: {
    margin: 0,
    fontSize: '2.2rem',
    fontWeight: '800',
    color: '#fff',
  },
  subtitle: {
    margin: '0.4rem 0 0 0',
    color: '#9e9e9e',
    fontSize: '1rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: '1.5rem',
  },
  feedbackContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '3rem',
    borderRadius: '8px',
    backgroundColor: '#202329',
    marginTop: '1rem',
  },
  feedbackText: {
    fontSize: '1.1rem',
    fontWeight: '500',
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '4px solid #3c3e44',
    borderTop: '4px solid #00b0c8',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginBottom: '1rem',
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1.5rem',
    marginTop: '2.5rem',
    padding: '1rem',
  },
  pageButton: {
    padding: '0.6rem 1.2rem',
    backgroundColor: '#00b0c8',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
  },
  pageInfo: {
    color: '#9e9e9e',
    fontWeight: '600',
  },
};

export default CharactersList;