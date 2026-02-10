import requests
import json

url = 'http://127.0.0.1:5001/register'
data = {
    "game": "Badminton",
    "teamType": "Duo",
    "teamName": "Test Team 1",
    "players": [
        {
            "name": "Alex",
            "regNo": "A123",
            "year": "1st",
            "whatsapp": "1234567890",
            "gender": "Male"
        },
        {
            "name": "Bob",
            "regNo": "B456",
            "year": "2nd",
            "whatsapp": "0987654321",
            "gender": "Male"
        }
    ]
}

try:
    response = requests.post(url, json=data)
    print("Status Code:", response.status_code)
    print("Response JSON:", response.json())
except Exception as e:
    print("Error:", e)
