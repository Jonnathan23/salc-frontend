# ==========================================
# Etapa 1: Compilación (Entorno Node.js)
# ==========================================
FROM node:22-alpine AS builder
WORKDIR /app

# Activar corepack para usar pnpm de forma nativa y segura
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copiar los archivos de configuración de la raíz del monorepositorio
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Copiar los paquetes compartidos del núcleo de la aplicación
COPY packages/ ./packages/

# Copiar el código fuente específico de la aplicación admin-desk
COPY apps/admin-desk/ ./apps/admin-desk/

# Instalar las dependencias del monorepo omitiendo scripts innecesarios
RUN pnpm install --frozen-lockfile --ignore-scripts

# --- INYECCIÓN DE VARIABLES DE ENTORNO PARA VITE ---
# Al ser una aplicación del lado del cliente, Vite requiere las variables 
# en tiempo de compilación para poder "quemarlas" en el código estático.
ARG VITE_API_URL
ARG VITE_CLASS_TRACK_URL

ENV VITE_API_URL=$VITE_API_URL
ENV VITE_CLASS_TRACK_URL=$VITE_CLASS_TRACK_URL

# Compilar la aplicación utilizando el filtro de pnpm
RUN pnpm --filter admin-desk build

# ==========================================
# Etapa 2: Servidor Web de Producción (Nginx)
# ==========================================
FROM nginx:alpine AS production

# Copiar la configuración personalizada de Nginx para React Router
COPY apps/admin-desk/nginx.config /etc/nginx/conf.d/default.conf

# Copiar únicamente los archivos estáticos compilados (dist) desde la Etapa 1
COPY --from=builder /app/apps/admin-desk/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]