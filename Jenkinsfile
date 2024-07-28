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
                    sudo docker stop banchan_back1
                    sudo docker stop banchan_back2
                    sudo docker rm banchan_back1
                    sudo docker rm banchan_back2
                    sudo docker rmi docker-compose-banchan_back1
                    sudo docker rmi docker-compose-banchan_back2
                    sudo docker-compose -f /201-105/S11P12E105/docker-compose/docker-compose-back.yml up -d
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
                    sudo docker stop banchan_front
                    sudo docker rm banchan_front
                    sudo docker rmi docker-compose-front_dt
                    sudo docker-compose -f /201-105/S11P12E105/docker-compose/docker-compose-front.yml up -d
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
