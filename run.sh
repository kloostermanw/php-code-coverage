#!/bin/bash

npm run build
INPUT_FILE=genotool.xml \
INPUT_REPO_PATH=123 \
INPUT_WORKFLOW_PATH=123 \
INPUT_FILES=src/app/Models/DawiLogger.php,src/app/Models/DeletedUser.php \
node dist/index.js
