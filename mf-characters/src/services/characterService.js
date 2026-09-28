import { httpClient } from './httpClient';

export const getCharacters = async ({ page = 1, name = '', status = '', species = '' } = {}) => {
  const params = new URLSearchParams();

  if (page) params.append('page', page);
  if (name.trim()) params.append('name', name.trim());
  if (status && status !== 'all') params.append('status', status);
  if (species.trim()) params.append('species', species.trim());

  const queryString = params.toString();
  const endpoint = `/character${queryString ? `?${queryString}` : ''}`;

  return await httpClient(endpoint);
};