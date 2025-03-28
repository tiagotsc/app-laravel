#!/bin/bash

status="$(curl --connect-timeout 5 -Is https://predator.dev.oi.intranet/verify_httpd.php --insecure | head -1)"
validate=( $status )
if [ -n "$validate" ]; then
  echo "OK"
else
  echo "NOT RESPONDING"
  sudo /webtools/apache/bin/apachectl stop
  sudo /webtools/apache/bin/apachectl start
fi
