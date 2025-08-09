#!/bin/bash

npm run build
INPUT_FILE=genotool.xml \
INPUT_FILES=/var/www/html/app/Models/DawiLogger.php,/var/www/html/app/Models/DeletedUser.php \
node dist/index.js
