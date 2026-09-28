# Rick-Morty-app

Aplicación web modular basada en una arquitectura de **Microfrontends (MFE)** implementada con **Webpack 5 Module Federation**, React y orquestación en contenedores con **Docker** y **Docker Compose**. Consume la API pública de Rick and Morty para listar personajes, aplicar filtros dinámicos y visualizar episodios relacionados.

---

## Arquitectura del Sistema

La solución se organiza en un monorepo que contiene tres proyectos independientes:

1. **`mf-shell` (Host App - Puerto 3000):** Contenedor principal responsable del layout global (navbar con branding, footer y contenedor responsivo), manejo de rutas centralizado mediante React Router, carga perezosa (`React.lazy`) y fallback de resiliencia con `Suspense`.
2. **`mf-characters` (Remote 1 - Puerto 3001):** Microfrontend enfocado en el catálogo de personajes. Expone `./CharactersList` e incluye:
   - Filtros dinámicos por nombre, estado (`Alive`, `Dead`, `unknown`) y especie.
   - Paginación nativa.
   - Tarjetas responsivas con datos clave y estados de carga/error.
3. **`mf-character-detail` (Remote 2 - Puerto 3002):** Microfrontend para la vista detallada. Expone `./CharacterDetail` e incluye:
   - Ficha ampliada del personaje seleccionado.
   - Consulta y renderizado batch de todos los episodios relacionados donde aparece.
   - Navegación de retorno al listado.

---

## Requisitos Previos

- **Node.js**: v18.x o superior
- **npm**: v9.x o superior
- **Docker Desktop** y **Docker Compose**

---

## Despliegue con Docker (Recomendado)

La aplicación cuenta con empaquetado multi-stage (Node.js Alpine para compilación + Nginx Alpine para runtime con cabeceras CORS activadas).

### 1. Construir y levantar todos los contenedores
Desde la raíz del proyecto, ejecuta:

```bash
docker compose up --build -d
