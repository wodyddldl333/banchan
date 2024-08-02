#!/bin/bash

cd ../docker-compose

docker stop banchan_front
docker stop banchan_front_mobile

docker rm banchan_front
docker rm banchan_front_mobile

docker builder prune -f

docker image prune -f

docker-compose -f docker-compose-front.yml up -d