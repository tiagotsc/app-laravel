#!/bin/sh
# Remove arquivo de bloqueio GIT, caso tenha travado em alguma parte
cd /webaplic/predator/.git
rm -rf index.lock || true
