import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CharactersList from '../components/CharactersList';
import * as characterService from '../services/characterService';

// Mockeamos el módulo del servicio
jest.mock('../services/characterService');

// Fixture con estructura real devuelta por la API de Rick and Morty
const mockApiResponse = {
  info: {
    count: 2,
    pages: 1,
    next: null,
    prev: null,
  },
  results: [
    {
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      gender: 'Male',
      image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
      location: { name: 'Citadel of Ricks' },
    },
    {
      id: 2,
      name: 'Morty Smith',
      status: 'Alive',
      species: 'Human',
      gender: 'Male',
      image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
      location: { name: 'Earth (C-137)' },
    },
  ],
};

describe('MF-Characters: <CharactersList />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Prueba 1: Muestra el estado de carga mientras la petición está en progreso', () => {
    // Simulamos una promesa que no se resuelve de inmediato
    characterService.getCharacters.mockImplementation(() => new Promise(() => {}));

    render(
      <MemoryRouter>
        <CharactersList />
      </MemoryRouter>
    );

    // Verificamos que el mensaje del loader se encuentre en el documento
    const loaderText = screen.getByText(/consultando personajes/i);
    expect(loaderText).toBeInTheDocument();
  });

  test('Prueba 2: Renderiza las tarjetas de personajes y su información tras resolver la API', async () => {
    // Resolvemos la promesa con el fixture de datos simulado
    characterService.getCharacters.mockResolvedValueOnce(mockApiResponse);

    render(
      <MemoryRouter>
        <CharactersList />
      </MemoryRouter>
    );

    // Esperamos a que los personajes aparezcan en pantalla
    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
      expect(screen.getByText('Morty Smith')).toBeInTheDocument();
    });

    // Validamos que se muestren los datos asociados requeridos (Estado y Especie)
    const statusBadges = screen.getAllByText(/Alive - Human/i);
    expect(statusBadges).toHaveLength(2);

    // Validamos que la imagen del personaje tenga la URL y el alt correctos
    const rickImage = screen.getByAltText('Rick Sanchez');
    expect(rickImage).toHaveAttribute('src', 'https://rickandmortyapi.com/api/character/avatar/1.jpeg');

    // Comprobamos la presencia de los botones de navegación de las tarjetas
    const detailButtons = screen.getAllByRole('button', { name: /ver detalle/i });
    expect(detailButtons).toHaveLength(2);
  });
});