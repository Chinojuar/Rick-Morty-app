import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCharacterDetail } from '../hooks/useCharacterDetail';
import EpisodeList from './EpisodeList';

const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case 'alive':
      return '#55cc44';
    case 'dead':
      return '#d63d2e';
    default:
      return '#9e9e9e';
  }
};

const CharacterDetail = ({ characterId: propId }) => {
  const { id: routeId } = useParams();
  const navigate = useNavigate();

  // Permite tomar el ID ya sea de la URL (/character/:id) o pasado como prop
  const targetId = propId || routeId;
  const { character, episodes, loading, error } = useCharacterDetail(targetId);

  const handleBack = () => {
    navigate(-1); // Regresa a la página anterior en el historial del Shell
  };

  return (
    <div style={styles.container}>
      <button onClick={handleBack} style={styles.backButton}>
        &larr; Volver al listado
      </button>

      {/* Estado de Carga */}
      {loading && (
        <div style={styles.feedbackContainer}>
          <div style={styles.spinner} />
          <p style={styles.feedbackText}>Obteniendo detalles del personaje y episodios...</p>
        </div>
      )}

      {/* Manejo de Error */}
      {!loading && error && (
        <div style={{ ...styles.feedbackContainer, backgroundColor: '#3e2428', color: '#ff8a80' }}>
          <h3>Ocurrió un error</h3>
          <p>{error}</p>
          <button onClick={handleBack} style={styles.errorActionButton}>
            Regresar
          </button>
        </div>
      )}

      {/* Ficha Principal de Detalle */}
      {!loading && !error && character && (
        <div style={styles.wrapper}>
          <div style={styles.profileCard}>
            <div style={styles.imageColumn}>
              <img
                src={character.image}
                alt={character.name}
                style={styles.avatar}
              />
            </div>

            <div style={styles.infoColumn}>
              <div style={styles.headerBlock}>
                <h1 style={styles.characterName}>{character.name}</h1>
                <div style={styles.statusRow}>
                  <span
                    style={{
                      ...styles.statusDot,
                      backgroundColor: getStatusColor(character.status),
                    }}
                  />
                  <span style={styles.statusLabel}>
                    {character.status} — {character.species}
                  </span>
                </div>
              </div>

              <div style={styles.metaGrid}>
                <div style={styles.metaItem}>
                  <span style={styles.metaKey}>Género</span>
                  <span style={styles.metaVal}>{character.gender || 'Desconocido'}</span>
                </div>

                <div style={styles.metaItem}>
                  <span style={styles.metaKey}>Tipo / Subespecie</span>
                  <span style={styles.metaVal}>{character.type || 'N/A'}</span>
                </div>

                <div style={styles.metaItem}>
                  <span style={styles.metaKey}>Origen</span>
                  <span style={styles.metaVal}>{character.origin?.name || 'Desconocido'}</span>
                </div>

                <div style={styles.metaItem}>
                  <span style={styles.metaKey}>Última ubicación conocida</span>
                  <span style={styles.metaVal}>{character.location?.name || 'Desconocida'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Lista de episodios relacionados */}
          <EpisodeList episodes={episodes} />
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '1.5rem',
    color: '#fff',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  backButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    backgroundColor: '#2b2f38',
    color: '#00b0c8',
    border: '1px solid #3c3e44',
    padding: '0.6rem 1.2rem',
    borderRadius: '6px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginBottom: '1.5rem',
    transition: 'background-color 0.2s',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  profileCard: {
    display: 'flex',
    flexWrap: 'wrap',
    backgroundColor: '#24282f',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
  },
  imageColumn: {
    flex: '1 1 300px',
    maxWidth: '350px',
  },
  avatar: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },
  infoColumn: {
    flex: '2 1 320px',
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '1.5rem',
  },
  headerBlock: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem',
  },
  characterName: {
    margin: 0,
    fontSize: '2rem',
    color: '#fff',
  },
  statusRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  statusDot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
  },
  statusLabel: {
    color: '#cfd8dc',
    fontSize: '1rem',
    fontWeight: '500',
  },
  metaGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '1.25rem',
  },
  metaItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.2rem',
  },
  metaKey: {
    fontSize: '0.8rem',
    color: '#9e9e9e',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  metaVal: {
    fontSize: '1rem',
    color: '#fff',
    fontWeight: '500',
  },
  feedbackContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '3rem',
    borderRadius: '8px',
    backgroundColor: '#24282f',
  },
  feedbackText: {
    marginTop: '1rem',
    fontSize: '1.1rem',
  },
  spinner: {
    width: '45px',
    height: '45px',
    border: '4px solid #3c3e44',
    borderTop: '4px solid #00b0c8',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  errorActionButton: {
    marginTop: '1rem',
    padding: '0.5rem 1rem',
    backgroundColor: '#ff5252',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};

export default CharacterDetail;