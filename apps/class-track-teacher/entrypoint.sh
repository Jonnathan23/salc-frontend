#!/bin/sh
# Script de inyección en runtime para Class Track

echo "Iniciando inyección de variables de entorno (envsubst manual)..."

for file in /usr/share/nginx/html/assets/*.js; do
  if [ -f "$file" ]; then
    echo "Procesando archivo: $file"
    
    # Reemplazo de la URL de la API
    sed -i "s|__VITE_API_URL_PLACEHOLDER__|${VITE_API_URL}|g" "$file"
    
    # Si tienes más variables, puedes agregarlas aquí siguiendo el mismo formato
    # sed -i "s|__VITE_ADMIN_DESK_URL_PLACEHOLDER__|${VITE_ADMIN_DESK_URL}|g" "$file"
  fi
done

echo "Inyección de Class Track completada con éxito."