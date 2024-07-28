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
                    cd ~/201-105/S11P12E105/docker-compose
                    sudo docker stop -f banchan_back1
                    sudo docker stop -f banchan_back2
                    sudo docker stop -f reverse
                    sudo docker rm -f banchan_back1
                    sudo docker rm -f banchan_back2
                    sudo docker rm -f reverse
                    sudo docker rmi -f docker-compose-banchan_back1
                    sudo docker rmi -f docker-compose-banchan_back2
                    sudo docker rmi -f docker-compose-nginx
                    sudo docker-compose -f docker-compose-back.yml up -d
                    sudo docker-compose -f docker-compose-rvproxy.yml up -d
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
                    cd ~/201-105/S11P12E105/docker-compose
                    sudo docker stop -f banchan_front
                    sudo docker stop -f reverse
                    sudo docker rm -f banchan_front
                    sudo docker rm -f reverse
                    sudo docker rmi -f docker-compose-front_dt
                    sudo docker rmi -f docker-compose-nginx
                    sudo docker-compose -f docker-compose-front.yml up -d
                    sudo docker-compose -f docker-compose-rvproxy.yml up -d
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
