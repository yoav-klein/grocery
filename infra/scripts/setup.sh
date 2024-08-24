#!/bin/bash


sudo apt-get update
sudo apt-get install -y openjdk-11-jdk

cd /tmp
sudo mkdir /opt/tomcat
curl -o tomcat.tar.gz https://dlcdn.apache.org/tomcat/tomcat-10/v${tomcat_version}/bin/apache-tomcat-${tomcat_version}.tar.gz
sudo tar xzvf tomcat.tar.gz -C /opt/tomcat --strip-components=1

sudo chown -R ubuntu:ubuntu /opt/tomcat
sudo chmod -R u+x /opt/tomcat/bin

/opt/tomcat/bin/startup.sh
