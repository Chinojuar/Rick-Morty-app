import { httpClient } from './httpClient';

/**
 * Obtiene el detalle básico de un personaje por ID
 */
export const getCharacterById = async (id) => {
  if (!id) throw new Error('Se requiere un ID de personaje válido');
  return await httpClient(`/character/${id}`);
};

/**
 * Obtiene la lista de episodios resolviendo las URLs en un único batch request
 * @param {string[]} episodeUrls - Array de strings como ["https://rickandmortyapi.com/api/episode/1", ...]
 */
export const getEpisodesByUrls = async (episodeUrls = []) => {
  if (!episodeUrls || episodeUrls.length === 0) return [];

  // Extraer los IDs numéricos al final de cada URL
  // "https://rickandmortyapi.com/api/episode/28" -> "28"
  const episodeIds = episodeUrls
    .map((url) => {
      const parts = url.split('/');
      return parts[parts.length - 1];
    })
    .filter(Boolean);

  if (episodeIds.length === 0) return [];

  // La API permite `/api/episode/1,2,3`
  const endpoint = `/episode/${episodeIds.join(',')}`;
  const response = await httpClient(endpoint);

  // Si se pide solo 1 episodio, la API devuelve un objeto único en vez de un array
  return Array.isArray(response) ? response : [response];
};

/**
 * Orquestador: Obtiene personaje y sus episodios relacionados de forma concurrente
 */
export const getCharacterWithEpisodes = async (characterId) => {
  const character = await getCharacterById(characterId);

  let episodes = [];
  if (character.episode && character.episode.length > 0) {
    try {
      episodes = await getEpisodesByUrls(character.episode);
    } catch (err) {
      console.warn('No se pudieron resolver los episodios relacionados:', err);
      episodes = [];
    }
  }

  return {
    character,
    episodes,
  };
};