### ec2 Docker 설치
```
$ sudo su - # 관리자 권한으로 들어감
$ git clone https://github.com/Kyeongrok/docker_minikube_kubectl_install # 도커 설치 파일 클론
$ cd docker_minikube_kubectl_install/ # 도커 설치 파일로 이동
$ sh docker_install.sh # 도커 설치 파일 실행
$ docker # 도커 설치 확인. 잘 설치됐으면 명령어 리스트 출력
```
### Server >> docker - jenkins 설치
```
#docker run -e TZ=Asia/Seoul -p 9090:8080 --name jenkins jenkins/jenkins:lts
```
```
- “http://k9e105.p.ssafy.io:9000/” 로 접속

- 로그인 & Install suggested plugins
- gitlab 플러그인 설치
- Gitlab Credential 추가
- Item 생성
- Webhook 설정
    - Jenkins 설정
    - Gitlab 설정
- Build 설정 및 .jar 파일 EC2에 저장
```
==========================SERVER================================
### Execute shell
```
scp -v -o StrictHostKeyChecking=no -i /var/jenkins_home/K9E105T.pem /var/jenkins_home/workspace/Backend/Backend/BeNurse/build/libs/BeNurse-1.0.0.jar ubuntu@k9e105.p.ssafy.io:/home/ubuntu/Backend-build
```
### SERVER >> jenkins - Execute shell script on remote host using ssh 
```
/home/ubuntu/Backend-build/deploy.sh
```
### deploy.sh
```
#!/bin/bash 
IMAGE_NAME=benurse_backend
echo "> Check current profile"
CURRENT_PROFILE=$(docker ps -a | sort -r -k2 -h | grep "${IMAGE_NAME}" | awk '{print $NF}')
echo "> $CURRENT_PROFILE"
 
if [ $CURRENT_PROFILE == backend-set1 ]
then
  IDLE_PROFILE=backend-set2
  IDLE_PORT=9002
  PROD=prod2
elif [ $CURRENT_PROFILE == backend-set2 ]
then
  IDLE_PROFILE=backend-set1
  IDLE_PORT=9001
  PROD=prod1
else
  echo "> Missmatch Profile. Profile: $CURRENT_PROFILE"
  echo "> Set set1. IDLE_PROFILE: set1"
  IDLE_PROFILE=backend-set1
  IDLE_PORT=9001
  PROD=prod1
fi

TAG_ID=$(docker images | sort -r -k2 -h | grep "${IMAGE_NAME}" | awk 'BEGIN{tag = 1} NR==1{tag += $2} END{print tag}')
 
echo "> Run docker build : docker build --build-arg IDLE_PROFILE=${IDLE_PROFILE} -t ${IMAGE_NAME}:${TAG_ID} /home/ubuntu/Backend-build"
docker build --build-arg IDLE_PROFILE=${IDLE_PROFILE} -t ${IMAGE_NAME}:${TAG_ID} /home/ubuntu/Backend-build
 
echo "> $IDLE_PROFILE deploy"
echo "> Run docker run :  sudo docker run --name $IDLE_PROFILE -d --env PROD=${PROD} --rm -p $IDLE_PORT:8080 -e TZ=Asia/Seoul ${IMAGE_NAME}:${TAG_ID}"
docker run --name $IDLE_PROFILE -d --env PROD=${PROD} --rm -p $IDLE_PORT:8080 -e TZ=Asia/Seoul ${IMAGE_NAME}:${TAG_ID}
 
 
echo "> ${CURRENT_PROFILE} 컨테이너 삭제"
sudo docker stop $CURRENT_PROFILE
PREV_TAG=$((TAG_ID-1))
echo "> PREV_TAG: ${PREV_TAG}"
echo "> sudo docker rmi ${IMAGE_NAME}:${PREV_TAG}"
sudo docker rmi ${IMAGE_NAME}:${PREV_TAG}
#sudo docker rm $CURRENT_PROFILE

#echo "> rm /home/ubuntu/Backend-build/BeNurse-1.0.0.jar"
#rm /home/ubuntu/Backend-build/BeNurse-1.0.0.jar

#echo "> docker builder prune"
#docker builder prune
#y


echo "> Try switching..."
sleep 1
 
/home/ubuntu/Backend-build/switch.sh
```
### switch.sh
```
#!/bin/bash
echo "> 현재 구동중인 Port 확인"
CURRENT_PROFILE=$(docker ps -a | sort -r -k2 -h | grep benurse_backend | awk '{print $NF}')
 
if [ $CURRENT_PROFILE == backend-set1 ]
then
  IDLE_PORT=9001
elif [ $CURRENT_PROFILE == backend-set2 ]
then
  IDLE_PORT=9002
else
  echo "> 일치하는 Profile이 없습니다. Profile:$CURRENT_PROFILE"
  echo "> 9001을 할당합니다."
  IDLE_PORT=9001
fi
 
#echo "> 현재 구동중인 Port: $CURRENT_PORT"
echo "> 전환할 Port : $IDLE_PORT"
echo "> Port 전환"
echo "set \$service_url http://127.0.0.1:${IDLE_PORT};" | sudo tee /etc/nginx/conf.d/backend-url.inc
 
echo "> Nginx Reload"
 
sudo service nginx reload
```
================================================================
==========================EMR===================================
### Execute shell
```
scp -v -o StrictHostKeyChecking=no -i /var/jenkins_home/K9E105T.pem /var/jenkins_home/workspace/EMR/Backend/BeNurse_EMR/build/libs/BeNurse_EMR-1.0.0.jar ubuntu@k9e105.p.ssafy.io:/home/ubuntu/EMR-build
```
### EMR >> jenkins - Execute shell script on remote host using ssh 
```
/home/ubuntu/EMR-build/deploy.sh
```
### deploy.sh
```
#!/bin/bash
IMAGE_NAME=benurse_emr
CONTAINER_NAME=emr
TAG_ID=1
IDLE_PORT=9003

echo "> Stop docker container : docker stop ${CONTAINER_NAME}"
docker stop ${CONTAINER_NAME}
echo "> Remove docker image : docker rmi ${IMAGE_NAME}:${TAG_ID}"
docker rmi ${IMAGE_NAME}:${TAG_ID}

echo "> ${IMAGE_NAME}:${TAG_ID}"
echo "> Run docker build : docker build -t ${IMAGE_NAME}:${TAG_ID} /home/ubuntu/Backend-build"
docker build -t ${IMAGE_NAME}:${TAG_ID} /home/ubuntu/EMR-build
echo "> Run docker run :  sudo docker run --name ${CONTAINER_NAME} -d --rm -p $IDLE_PORT:8080 -e TZ=Asia/Seoul ${IMAGE_NAME}:${TAG_ID}"
sudo docker run --name ${CONTAINER_NAME} -d --rm -p $IDLE_PORT:8080 -e TZ=Asia/Seoul ${IMAGE_NAME}:${TAG_ID}
```

### docker - redis 설치 및 실행
```
docker pull redis # 설치

docker run -d -p 6379:6379 --name redis-test redis:6.2 # 실행 (기본포트 설정)

docker exec -it redis-test redis-cli # 실행중인 레디스 런타임에 접근
```

### nginx default.conf 설정
```
server {
	listen 443 ssl;
	server_name k9e105.p.ssafy.io;

	ssl_certificate /etc/letsencrypt/live/k9e105.p.ssafy.io/fullchain.pem;
	ssl_certificate_key /etc/letsencrypt/live/k9e105.p.ssafy.io/privkey.pem;

	include /etc/nginx/conf.d/frontend-url.inc;

	location / {
		proxy_pass $service_url;
		proxy_set_header Host $host;
		proxy_set_header X-Real-IP $remote_addr;
	}
}

server {
	listen 9000 ssl;
	server_name k9e105.p.ssafy.io;

        ssl_certificate /etc/letsencrypt/live/k9e105.p.ssafy.io/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/k9e105.p.ssafy.io/privkey.pem;
	
	include /etc/nginx/conf.d/backend-url.inc;

	location /{
		proxy_pass $service_url;
		proxy_set_header Host $host;
		proxy_set_header X-Real-IP $remote_addr;
	}
}

server {
        listen 9004 ssl;
        server_name k9e105.p.ssafy.io;

        ssl_certificate /etc/letsencrypt/live/k9e105.p.ssafy.io/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/k9e105.p.ssafy.io/privkey.pem;

        location /{
                proxy_pass http://127.0.0.1:9003;
                proxy_set_header Host $host;
                proxy_set_header X-Real-IP $remote_addr;
        }
}


```














































