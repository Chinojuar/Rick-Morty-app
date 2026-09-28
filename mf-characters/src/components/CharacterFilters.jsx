import React from 'react';

const CharacterFilters = ({ filters, onFilterChange }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ [name]: value });
  };

  const handleClear = () => {
    onFilterChange({ name: '', species: '', status: '' });
  };

  return (
    <div style={styles.container}>
      <div style={styles.fieldGroup}>
        <label htmlFor="name" style={styles.label}>Nombre</label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Ej. Rick, Morty..."
          value={filters.name}
          onChange={handleInputChange}
          style={styles.input}
        />
      </div>

      <div style={styles.fieldGroup}>
        <label htmlFor="species" style={styles.label}>Especie</label>
        <input
          id="species"
          name="species"
          type="text"
          placeholder="Ej. Human, Alien..."
          value={filters.species}
          onChange={handleInputChange}
          style={styles.input}
        />
      </div>

      <div style={styles.fieldGroup}>
        <label htmlFor="status" style={styles.label}>Estado</label>
        <select
          id="status"
          name="status"
          value={filters.status}
          onChange={handleInputChange}
          style={styles.select}
        >
          <option value="">Todos los estados</option>
          <option value="alive">Vivo (Alive)</option>
          <option value="dead">Muerto (Dead)</option>
          <option value="unknown">Desconocido (Unknown)</option>
        </select>
      </div>

      <button type="button" onClick={handleClear} style={styles.clearButton}>
        Limpiar Filtros
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1rem',
    alignItems: 'flex-end',
    backgroundColor: '#24282f',
    padding: '1.25rem',
    borderRadius: '10px',
    marginBottom: '2rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
  },
  fieldGroup: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 200px',
    gap: '0.4rem',
  },
  label: {
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#9e9e9e',
  },
  input: {
    padding: '0.65rem 0.85rem',
    borderRadius: '6px',
    border: '1px solid #3c3e44',
    backgroundColor: '#333',
    color: '#fff',
    fontSize: '0.95rem',
    outline: 'none',
  },
  select: {
    padding: '0.65rem 0.85rem',
    borderRadius: '6px',
    border: '1px solid #3c3e44',
    backgroundColor: '#333',
    color: '#fff',
    fontSize: '0.95rem',
    outline: 'none',
    cursor: 'pointer',
  },
  clearButton: {
    padding: '0.65rem 1.25rem',
    backgroundColor: '#ff9800',
    color: '#202329',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    height: '42px',
    transition: 'background-color 0.2s',
  },
};

export default CharacterFilters;