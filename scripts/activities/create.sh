#!/bin/bash

API="http://localhost:4741"
URL_PATH="/activities"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=${TOKEN}" \
  --data '{
    "activity": {
      "name": "'"${NAME}"'"
    }
  }'

echo
