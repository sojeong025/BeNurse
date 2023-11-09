### Jenkins - Execute shell
```
cd /var/jenkins_home/workspace/Frontend/Frontend/BeNurse/
cp /var/jenkins_home/workspace/.env /var/jenkins_home/workspace/Frontend/Frontend/BeNurse/.env
npm install --force
npm run build

scp -v -o StrictHostKeyChecking=no -i /var/jenkins_home/K9E105T.pem -r /var/jenkins_home/workspace/Frontend/Frontend/BeNurse/dist ubuntu@k9e105.p.ssafy.io:/home/ubuntu/Frontend-build
scp -v -o StrictHostKeyChecking=no -i /var/jenkins_home/K9E105T.pem /var/jenkins_home/workspace/Frontend/Frontend/BeNurse/package.json ubuntu@k9e105.p.ssafy.io:/home/ubuntu/Frontend-build
scp -v -o StrictHostKeyChecking=no -i /var/jenkins_home/K9E105T.pem /var/jenkins_home/workspace/Frontend/Frontend/BeNurse/package-lock.json ubuntu@k9e105.p.ssafy.io:/home/ubuntu/Frontend-build
```

### Jenkins - Execute shell script on remote host using ssh
```
/home/ubuntu/Frontend-build/deploy.sh
```

### deploy.sh
```
#!/bin/bash
IMAGE_NAME=benurse_frontend
echo "> Check current profile"
CURRENT_PROFILE=$(docker ps -a | sort -r -k2 -h | grep "${IMAGE_NAME}" | awk '{print $NF}')
echo "> $CURRENT_PROFILE"

if [ $CURRENT_PROFILE == frontend-set1 ]
then
  IDLE_PROFILE=frontend-set2
  IDLE_PORT=3002
elif [ $CURRENT_PROFILE == frontend-set2 ]
then
  IDLE_PROFILE=frontend-set1
  IDLE_PORT=3001
else
  echo "> Missmatch Profile. Profile: $CURRENT_PROFILE"
  echo "> Set set1. IDLE_PROFILE: set1"
  IDLE_PROFILE=frontend-set1
  IDLE_PORT=3001
fi

TAG_ID=$(docker images | sort -r -k2 -h | grep "${IMAGE_NAME}" | awk 'BEGIN{tag = 1} NR==1{tag += $2} END{print tag}')

echo "> Run docker build : docker build --build-arg IDLE_PROFILE=${IDLE_PROFILE} -t ${IMAGE_NAME}:${TAG_ID} /home/ubuntu/Frontend-build"
docker build --build-arg IDLE_PROFILE=${IDLE_PROFILE} -t ${IMAGE_NAME}:${TAG_ID} /var/jenkins/workspace/Frontend/Frontend/BeNurse

echo "> Run docker run :  sudo docker run --name $IDLE_PROFILE -d --rm -p $IDLE_PORT:5173 -e TZ=Asia/Seoul ${IMAGE_NAME}:${TAG_ID}"
docker run --name $IDLE_PROFILE -d --rm -p $IDLE_PORT:5173 -e TZ=Asia/Seoul ${IMAGE_NAME}:${TAG_ID}

echo "> ${CURRENT_PROFILE} 컨테이너 삭제"
sudo docker stop $CURRENT_PROFILE
PREV_TAG=$((TAG_ID-1))
echo "> sudo docker rmi ${IMAGE_NAME}:${PREV_TAG}"
sudo docker rmi ${IMAGE_NAME}:${PREV_TAG}

echo "> Try switching..."
sleep 1

/home/ubuntu/Frontend-build/switch.sh
```
### switch.sh
```
#!/bin/bash
echo "> 현재 구동중인 Port 확인"
CURRENT_PROFILE=$(docker ps -a | sort -r -k2 -h | grep benurse_frontend | awk '{print $NF}')
 
if [ $CURRENT_PROFILE == frontend-set1 ]
then
  IDLE_PORT=3001
elif [ $CURRENT_PROFILE == frontend-set2 ]
then
  IDLE_PORT=3002
else
  echo "> 일치하는 Profile이 없습니다. Profile:$CURRENT_PROFILE"
  echo "> 3001을 할당합니다."
  IDLE_PORT=3001
fi
 
#echo "> 현재 구동중인 Port: $CURRENT_PORT"
echo "> 전환할 Port : $IDLE_PORT"
echo "> Port 전환"
echo "set \$service_url http://127.0.0.1:${IDLE_PORT};" | sudo tee /etc/nginx/conf.d/frontend-url.inc
 
echo "> Nginx Reload"
 
sudo service nginx reload
```

### docker - nginx default.conf
```
server{
	listen 80 default_server;
	listen [::]:80 default_server;

	#root/var/www/html;
	#index index.html index.htm index.nginx-debian.html;

	server_name k9e105.p.ssafy.io;
	location / {
		return 301 https://$host$request_uri;
	}
}
```

