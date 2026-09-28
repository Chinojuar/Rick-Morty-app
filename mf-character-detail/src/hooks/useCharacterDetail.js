import { useState, useEffect } from 'react';
import { getCharacterWithEpisodes } from '../services/characterDetailService';

export const useCharacterDetail = (characterId) => {
  const [character, setCharacter] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!characterId) return;

    let isMounted = true;
    setLoading(true);
    setError(null);

    getCharacterWithEpisodes(characterId)
      .then((data) => {
        if (isMounted) {
          setCharacter(data.character);
          setEpisodes(data.episodes);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || 'Error al obtener el detalle');
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [characterId]);

  return { character, episodes, loading, error };
};