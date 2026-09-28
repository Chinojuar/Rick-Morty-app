import React from 'react';

const EpisodeList = ({ episodes = [] }) => {
  if (!episodes || episodes.length === 0) {
    return (
      <div style={styles.emptyContainer}>
        <p style={styles.emptyText}>No se encontraron episodios registrados para este personaje.</p>
      </div>
    );
  }

  return (
    <section style={styles.section}>
      <div style={styles.header}>
        <h2 style={styles.title}>Episodios donde aparece</h2>
        <span style={styles.badge}>{episodes.length} episodios</span>
      </div>

      <div style={styles.grid}>
        {episodes.map((ep) => (
          <div key={ep.id} style={styles.card}>
            <div style={styles.cardHeader}>
              <span style={styles.episodeCode}>{ep.episode}</span>
              <span style={styles.airDate}>{ep.air_date}</span>
            </div>
            <h4 style={styles.episodeName} title={ep.name}>
              {ep.name}
            </h4>
          </div>
        ))}
      </div>
    </section>
  );
};

const styles = {
  section: {
    marginTop: '2.5rem',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '1px solid #3c3e44',
    paddingBottom: '0.75rem',
    marginBottom: '1.25rem',
  },
  title: {
    margin: 0,
    fontSize: '1.5rem',
    color: '#f5f5f5',
    fontWeight: '700',
  },
  badge: {
    backgroundColor: '#00b0c8',
    color: '#fff',
    padding: '0.25rem 0.75rem',
    borderRadius: '12px',
    fontSize: '0.85rem',
    fontWeight: 'bold',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
    gap: '1rem',
    maxHeight: '420px',
    overflowY: 'auto',
    paddingRight: '0.5rem',
  },
  card: {
    backgroundColor: '#2b2f38',
    borderRadius: '8px',
    padding: '0.85rem 1rem',
    borderLeft: '4px solid #00b0c8',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.35rem',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '0.75rem',
  },
  episodeCode: {
    color: '#00b0c8',
    fontWeight: 'bold',
  },
  airDate: {
    color: '#9e9e9e',
  },
  episodeName: {
    margin: 0,
    fontSize: '0.95rem',
    color: '#fff',
    fontWeight: '600',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  emptyContainer: {
    padding: '2rem',
    textAlign: 'center',
    backgroundColor: '#2b2f38',
    borderRadius: '8px',
    marginTop: '1.5rem',
  },
  emptyText: {
    margin: 0,
    color: '#9e9e9e',
  },
};

export default EpisodeList;