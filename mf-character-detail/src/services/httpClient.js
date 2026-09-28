const BASE_URL = 'https://rickandmortyapi.com/api';

// Interceptor de Request: registra y prepara headers/tiempos
const requestInterceptor = (url, options = {}) => {
  const startTime = performance.now();
  const requestId = Math.random().toString(36).substring(7);

  console.groupCollapsed(`[HTTP-REQ] [${requestId}] ${options.method || 'GET'} -> ${url}`);
  console.log('Timestamp:', new Date().toISOString());
  console.log('Headers / Options:', options);
  console.groupEnd();

  return { url, options, startTime, requestId };
};

// Interceptor de Response: valida status, parsea JSON y maneja logging
const responseInterceptor = async (response, startTime, requestId) => {
  const duration = (performance.now() - startTime).toFixed(2);

  // Manejo de caso especial 404 en Rick and Morty API (Filtros sin resultados)
  if (response.status === 404) {
    const errorData = await response.json().catch(() => ({}));
    console.warn(`[HTTP-WARN] [${requestId}] 404 Not Found (${duration}ms):`, errorData.error || 'No results');
    return {
      info: { count: 0, pages: 0, next: null, prev: null },
      results: [],
    };
  }

  // Manejo de errores 5xx u otros 4xx
  if (!response.ok) {
    const errorText = await response.text();
    console.error(`[HTTP-ERR] [${requestId}] Status: ${response.status} (${duration}ms) ->`, errorText);
    
    const error = new Error(`Error en la petición: ${response.status} ${response.statusText}`);
    error.status = response.status;
    error.details = errorText;
    throw error;
  }

  const data = await response.json();
  console.groupCollapsed(`[HTTP-RES] [${requestId}] ${response.status} OK (${duration}ms)`);
  console.log('Payload:', data);
  console.groupEnd();

  return data;
};

// Cliente genérico ejecutor
export const httpClient = async (endpoint, customOptions = {}) => {
  const fullUrl = endpoint.startsWith('http') ? endpoint : `${BASE_URL}${endpoint}`;
  const { url, options, startTime, requestId } = requestInterceptor(fullUrl, customOptions);

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    return await responseInterceptor(response, startTime, requestId);
  } catch (error) {
    console.error(`[HTTP-FATAL] [${requestId}] Fallo de red/conexión:`, error.message);
    throw error;
  }
};