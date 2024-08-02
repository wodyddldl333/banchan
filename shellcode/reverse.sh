#!/bin/bash

cd ../docker-compose

docker stop reverse

docker rm reverse

docker builder prune -f

docker image prune -f

docker-compose -f docker-compose-rvproxy.yml build --no-cache

docker-compose -f docker-compose-rvproxy.yml up -d