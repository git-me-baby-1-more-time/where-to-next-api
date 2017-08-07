#!/bin/bash

API="http://localhost:4741"
URL_PATH="/food"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request DELETE \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=${TOKEN}" \
  --data '{
    "food": {
      "name": "'"${NAME}"'"
    }
  }'
echo
