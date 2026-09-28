# ==========================================
# Etapa 1: Build (Compilación de la aplicación)
# ==========================================
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar archivos de dependencias para aprovechar caché de capas
COPY package.json ./
RUN npm install

# Copiar el código fuente y compilar los estáticos
COPY . .
RUN npm run build

# ==========================================
# Etapa 2: Runtime (Servidor Nginx ultraligero)
# ==========================================
FROM nginx:alpine

# Limpiar archivos por defecto de Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copiar la salida del build (dist) de Webpack al directorio web de Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiar la configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]