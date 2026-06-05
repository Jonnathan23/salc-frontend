#!/bin/sh
# Este script es ejecutado automáticamente por la imagen de Nginx en Alpine antes de arrancar.

echo "Iniciando inyección de variables de entorno (envsubst manual)..."

# Iteramos sobre todos los archivos JavaScript generados por Vite
for file in /usr/share/nginx/html/assets/*.js; do
  if [ -f "$file" ]; then
    echo "Procesando archivo: $file"
    
    # Usamos 'sed' para buscar el texto falso y reemplazarlo por la variable de entorno de producción.
    # Nota: Usamos el separador '|' en lugar de '/' para que no choque con las barras de "http://"
    sed -i "s|__VITE_API_URL_PLACEHOLDER__|${VITE_API_URL}|g" "$file"
    sed -i "s|__VITE_CLASS_TRACK_URL_PLACEHOLDER__|${VITE_CLASS_TRACK_URL}|g" "$file"
  fi
done

echo "Inyección completada con éxito."