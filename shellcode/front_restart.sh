#!/bin/bash

cd ../docker-compose

docker stop banchan_front_web

docker rm banchan_front_web

docker volume prune -a -f

docker builder prune -a -f

docker image prune -a -f

docker-compose -f docker-compose-front-web.yml up -d