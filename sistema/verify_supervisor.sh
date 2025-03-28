#!/bin/bash

# VERIFICA SE O SUPERVISOR ESTA EM EXECUCAO, SE NAO ESTIVER O INICIA

STATUS_NOW=$(systemctl status supervisord | grep running | cut -c 12-17)
STATUS_CHECK='active'

if [[ "$STATUS_NOW" == *"$STATUS_CHECK"* ]]; then
 echo "OK"
else
  echo "NOT RESPONDING"
  sudo /bin/systemctl stop supervisord.service
  sudo /bin/systemctl start supervisord.service
  cd /webaplic/predator
  php artisan queue:restart
fi