#!/bin/bash
# Para conectarme a la maquina esta el fichero de acceso en /home de ubuntu, con permisos 0600, hay que ejecutar este fichero de la siguiente manera:
# ssh -i ~/PreventAI2.pem ubuntu@ec2-13-51-242-248.eu-north-1.compute.amazonaws.com
ssh -i "ci-cd-key-preventai-may.pem" ubuntu@ec2-3-93-240-154.compute-1.amazonaws.com


# Para cambiar los permisos del fichero de acceso en windows:
# icacls C:\Users\SRVazquez\Documents\workspace\PreventAI\aws_connect_key.pem /reset
# icacls C:\Users\SRVazquez\Documents\workspace\PreventAI\aws_connect_key.pem /grant:r "asus-vivobook-w\srvazquez:R"
# icacls C:\Users\SRVazquez\Documents\workspace\PreventAI\aws_connect_key.pem /inheritance:r
