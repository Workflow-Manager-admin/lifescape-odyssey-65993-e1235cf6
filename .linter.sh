#!/bin/bash
cd /home/kavia/workspace/code-generation/lifescape-odyssey-65993-e1235cf6/lifescape_odyssey_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

