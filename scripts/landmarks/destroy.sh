#!/bin/bash

API="http://localhost:4741"
URL_PATH="/landmarks"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request DELETE \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=${TOKEN}" \
  --data '{
    "landmark": {
      "name": "'"${NAME}"'"
    }
  }'
echo
