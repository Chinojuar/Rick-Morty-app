import React from 'react';
import { useNavigate } from 'react-router-dom';

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

const CharacterCard = ({ character }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/character/${character.id}`);
  };

  return (
    <div style={styles.card}>
      <div style={styles.imageWrapper}>
        <img
          src={character.image}
          alt={character.name}
          style={styles.image}
          loading="lazy"
        />
      </div>

      <div style={styles.content}>
        <h3 style={styles.title} title={character.name}>
          {character.name}
        </h3>

        <div style={styles.statusRow}>
          <span
            style={{
              ...styles.statusDot,
              backgroundColor: getStatusColor(character.status),
            }}
          />
          <span style={styles.statusText}>
            {character.status} - {character.species}
          </span>
        </div>

        <div style={styles.metaField}>
          <span style={styles.metaLabel}>Género:</span>
          <span style={styles.metaValue}>{character.gender}</span>
        </div>

        <div style={styles.metaField}>
          <span style={styles.metaLabel}>Última ubicación:</span>
          <span style={styles.metaValue}>{character.location?.name || 'Desconocida'}</span>
        </div>

        <button onClick={handleNavigate} style={styles.detailButton}>
          Ver Detalle
        </button>
      </div>
    </div>
  );
};

const styles = {
  card: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#3c3e44',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  },
  imageWrapper: {
    width: '100%',
    height: '240px',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  content: {
    padding: '1.25rem',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    gap: '0.6rem',
  },
  title: {
    margin: 0,
    fontSize: '1.3rem',
    color: '#f5f5f5',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  statusRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  statusDot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    display: 'inline-block',
  },
  statusText: {
    color: '#fff',
    fontSize: '0.9rem',
    fontWeight: '500',
  },
  metaField: {
    display: 'flex',
    flexDirection: 'column',
  },
  metaLabel: {
    fontSize: '0.75rem',
    color: '#9e9e9e',
  },
  metaValue: {
    color: '#f5f5f5',
    fontSize: '0.9rem',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  detailButton: {
    marginTop: 'auto',
    padding: '0.6rem',
    backgroundColor: '#00b0c8',
    color: '#fff',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    textAlign: 'center',
    transition: 'background-color 0.2s',
  },
};

export default CharacterCard;