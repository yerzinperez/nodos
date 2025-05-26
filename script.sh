#!/usr/bin/env zsh

echo "Arrancando script..."
docker rm -f $(docker ps -aq | grep -v $(docker ps -aqf "name=ollama"))
docker rmi nodos
docker compose up
echo "¡Hecho!"
