import { useState, useEffect, useCallback } from 'react';
import { getCharacters } from '../services/characterService';

export const useCharacters = (initialFilters = {}) => {
  const [characters, setCharacters] = useState([]);
  const [info, setInfo] = useState({ count: 0, pages: 0, next: null, prev: null });
  const [filters, setFilters] = useState({
    name: '',
    status: '',
    species: '',
    page: 1,
    ...initialFilters,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchList = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getCharacters(filters);
      setCharacters(response.results || []);
      setInfo(response.info || { count: 0, pages: 0, next: null, prev: null });
    } catch (err) {
      setError(err.message || 'Error al consultar personajes');
      setCharacters([]);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  const updateFilters = (newFilters) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
      page: 1, // Reiniciar a página 1 al cambiar cualquier filtro de texto o estado
    }));
  };

  const changePage = (newPage) => {
    setFilters((prev) => ({
      ...prev,
      page: newPage,
    }));
  };

  return {
    characters,
    info,
    filters,
    loading,
    error,
    updateFilters,
    changePage,
    refetch: fetchList,
  };
};