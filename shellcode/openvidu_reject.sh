#!/bin/bash

docker stop openvidu-app-1

docker stop openvidu-openvidu-server-1

docker stop openvidu-kms-1

docker stop openvidu-nginx-1

docker stop openvidu-coturn-1

docker rm openvidu-app-1

docker rm openvidu-openvidu-server-1

docker rm openvidu-kms-1

docker rm openvidu-nginx-1

docker rm openvidu-coturn-1

docker builder prune -a -f

docker image prune -a -f

docker volume prune -a -f
