#!/bin/bash

docker stop banchan_back1
docker stop banchan_back2

docker rm banchan_back1
docker rm banchan_back2

docker builder prune -f

docker image prune -f

docker-compose -f docker-compose-back.yml build --no-cache

docker-compose -f docker-compose-back.yml up -d