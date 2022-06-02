#!/bin/bash

ENDPOINT=$1
USERNAME=$2
JSON=$3

curl -X POST http://127.0.0.1:5000/$ENDPOINT  -H 'Content-Type: application/json' --cookie "username=${USERNAME}" -d "$JSON"

