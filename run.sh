#!/bin/bash

npm run build
INPUT_FILE=clover.example.base.xml node dist/index.js
