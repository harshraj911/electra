import requests
import json

url = 'http://127.0.0.1:5001/registrations'
try:
    response = requests.get(url)
    print("Status Code:", response.status_code)
    print("Registrations:", json.dumps(response.json(), indent=2))
except Exception as e:
    print("Error:", e)
