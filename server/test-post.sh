ENDPOINT='i-am-online'
USERNAME='capra'
JSON='
{
}
'

URL=http://127.0.0.1:5000/$ENDPOINT 

curl -X POST $URL -H 'Content-Type: application/json' --cookie "username=${USERNAME}" -d "$JSON"



