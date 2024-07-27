// pipeline {
//     agent any

//     environment {
//         GIT_CREDENTIAL_ID = '201-105'
//     }

//     stages {
//         stage('Checkout') {
//             steps {
//                 git url: 'https://lab.ssafy.com/s11-webmobile1-sub2/S11P12E105.git', branch: 'production', credentialsId: GIT_CREDENTIAL_ID
//             }
//         }
//         stage('Build and Deploy Backend') {
//             when {
//                 changeset "Banchan/**"
//             }
//             steps {
//                 script {
//                     def backendImage = docker.build('your-backend-image-name:latest', 'backend')
//                     sh '''
//                     sudo docker stop 
//                     '''
//                 }
//             }
//         }
//         stage('Build and Deploy Frontend') {
//             when {
//                 changeset "BanChan_FE/**"
//             }
//             steps {
//                 script {
//                     def frontendImage = docker.build('your-frontend-image-name:latest', 'frontend')
//                     sh '''
//                     docker stop frontend-container || true
//                     docker rm frontend-container || true
//                     docker rmi your-frontend-image-name:latest || true
//                     docker-compose -f path/to/frontend/docker-compose.yml up -d --build
//                     '''
//                 }
//             }
//         }
//     }
//     post {
//         always {
//             cleanWs()
//         }
//     }
// }