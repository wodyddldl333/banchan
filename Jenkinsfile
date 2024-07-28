pipeline {
    agent any

    environment {
        GIT_CREDENTIAL_ID = 'pwd-gitlab-ssafy'
    }

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://lab.ssafy.com/s11-webmobile1-sub2/S11P12E105.git', branch: 'production', credentialsId: GIT_CREDENTIAL_ID
            }
        }
        stage('Build and Deploy Backend') {
            when {
                changeset "Banchan/**"
            }
            steps {
                script {
                    sh '''
                    ls -al
                    docker stop -f banchan_back2
                    docker stop -f reverse
                    docker rm -f banchan_back1
                    docker rm -f banchan_back2
                    docker rm -f reverse
                    docker rmi -f docker-compose-banchan_back1
                    docker rmi -f docker-compose-banchan_back2
                    docker rmi -f docker-compose-nginx
                    docker-compose -f ~/201-105/S11P12E105/docker-compose/docker-compose-back.yml up -d
                    docker-compose -f ~/201-105/S11P12E105/docker-compose/docker-compose-rvproxy.yml up -d
                    '''
                }
            }
        }
        stage('Build and Deploy Frontend') {
            when {
                changeset "BanChan_FE/**"
            }
            steps {
                script {
                    sh '''
                    docker stop -f banchan_front
                    docker stop -f reverse
                    docker rm -f banchan_front
                    docker rm -f reverse
                    docker rmi -f docker-compose-front_dt
                    docker rmi -f docker-compose-nginx
                    docker-compose -f ~/201-105/S11P12E105/docker-compose/docker-compose-front.yml up -d
                    docker-compose -f ~/201-105/S11P12E105/docker-compose/docker-compose-rvproxy.yml up -d
                    '''
                }
            }
        }
    }
    post {
        always {
            cleanWs()
        }
    }
}
