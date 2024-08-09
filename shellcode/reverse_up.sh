#!/bin/bash

cd ../docker-compose

docker volume prune -a -f

docker builder prune -a -f

docker image prune -a -f

docker-compose -f docker-compose-rvproxy.yml up -d