#!/bin/bash

### Install Tomcat

sudo apt-get update
sudo apt-get install -y openjdk-17-jdk

cd /tmp
sudo mkdir /opt/tomcat
curl -o tomcat.tar.gz https://dlcdn.apache.org/tomcat/tomcat-10/v${tomcat_version}/bin/apache-tomcat-${tomcat_version}.tar.gz
sudo tar xzvf tomcat.tar.gz -C /opt/tomcat --strip-components=1

sudo chown -R ubuntu:ubuntu /opt/tomcat
sudo chmod -R u+x /opt/tomcat/bin


cat << EOF | sudo tee /etc/systemd/system/tomcat.service
[Unit]
Description=Tomcat
After=network.target

[Service]
Type=forking

Environment="JAVA_HOME=/usr/lib/jvm/java-1.17.0-openjdk-amd64"
Environment="JAVA_OPTS=-Djava.security.egd=file:///dev/urandom"
Environment="CATALINA_BASE=/opt/tomcat"
Environment="CATALINA_HOME=/opt/tomcat"
Environment="CATALINA_OPTS=-Xms512M -Xmx1024M -server -XX:+UseParallelGC"

ExecStart=/opt/tomcat/bin/startup.sh
ExecStop=/opt/tomcat/bin/shutdown.sh

RestartSec=10
Restart=always

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable tomcat
sudo systemctl start tomcat

### Install MySQL

sudo apt install -y mysql-server
sudo systemctl start mysql.service

cat << EOF | sudo mysql

CREATE USER 'yoav'@'localhost' IDENTIFIED BY 'yoav';
GRANT ALL PRIVILEGES ON grocery.* TO 'yoav'@'localhost' WITH GRANT OPTION;

EOF


