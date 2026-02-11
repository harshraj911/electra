from flask import Flask, request, jsonify, send_file, send_from_directory
from flask_cors import CORS
from openpyxl import Workbook
import os
import json
from datetime import datetime
from werkzeug.utils import secure_filename
from supabase import create_client, Client

app = Flask(__name__)
CORS(app)

# Supabase Configuration
SUPABASE_URL = "https://zxxzkvtkdhnwvmwgfbjc.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp4eHprdnRrZGhud3Ztd2dmYmpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4MDY5ODYsImV4cCI6MjA4NjM4Mjk4Nn0.L5z607BYgehqbprbBJk1zyQ5rmVPm_KFUvEWczJKfe4"
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Local Fallbacks for temp file handling (files will still be ephemeral on Render Free without Supabase Storage)
# To fully fix file persistence, we would need Supabase Storage bucket setup.
# For now, we persist DATA in database, but files are local.
DATA_DIR = os.environ.get('DATA_DIR', '.')
if not os.path.exists(DATA_DIR):
    os.makedirs(DATA_DIR)

SETTINGS_FILE = os.path.join(DATA_DIR, 'settings.json')
UPLOAD_FOLDER = os.path.join(DATA_DIR, 'uploads')

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

def init_settings():
    if not os.path.exists(SETTINGS_FILE):
        default_settings = {
            "upi_id": "example@upi",
            "qr_image": ""
        }
        with open(SETTINGS_FILE, 'w') as f:
            json.dump(default_settings, f)

init_settings()

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)

@app.route('/register', methods=['POST'])
def register():
    # Handle multipart form data for file upload
    if 'regData' not in request.form:
        return jsonify({'error': 'Missing registration data'}), 400
    
    data = json.loads(request.form['regData'])
    game = data.get('game')
    team_type = data.get('teamType')
    team_name = data.get('teamName', '')
    players = data.get('players', [])
    
    # Handle Screenshot
    ss_url = ""
    if 'screenshot' in request.files:
        file = request.files['screenshot']
        if file.filename != '':
            filename = secure_filename(f"payment_{datetime.now().timestamp()}.png")
            file.save(os.path.join(UPLOAD_FOLDER, filename))
            ss_url = f"{request.host_url}uploads/{filename}"

    # Calculate Unique ID
    unique_id = ""
    if team_type == 'Single' and players:
        p_name = players[0].get('name', '').split(' ')[0] # First name
        p_reg = str(players[0].get('regNo', ''))
        reg_suffix = p_reg[-4:] if len(p_reg) >= 4 else p_reg
        unique_id = f"{p_name}_{reg_suffix}"
    else:
        unique_id = team_name or f"TEAM_{datetime.now().strftime('%M%S')}"

    # Prepare Payload for Supabase
    db_payload = {
        "game": game,
        "team_type": team_type,
        "team_name": team_name,
        "unique_id": unique_id,
        "screenshot_url": ss_url,
        "created_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    }

    # Add players (up to 8)
    for i, p in enumerate(players):
        if i < 8:
            idx = i + 1
            db_payload[f"player{idx}_name"] = p.get('name', '')
            db_payload[f"player{idx}_reg"] = p.get('regNo', '')
            db_payload[f"player{idx}_year"] = p.get('year', '')
            db_payload[f"player{idx}_whatsapp"] = p.get('whatsapp', '')
            db_payload[f"player{idx}_gender"] = p.get('gender', '')

    try:
        data, count = supabase.table('registrations').insert(db_payload).execute()
        return jsonify({'message': 'Registration Successful!', 'unique_id': unique_id}), 201
    except Exception as e:
        print(e)
        return jsonify({'error': 'Database Error', 'details': str(e)}), 400

@app.route('/registrations', methods=['GET'])
def get_registrations():
    try:
        response = supabase.table('registrations').select("*").order('created_at', desc=True).execute()
        rows = response.data
        
        # Transform back to frontend format
        registrations = []
        for row in rows:
            players_list = []
            for i in range(1, 9):
                if row.get(f'player{i}_name'):
                    players_list.append({
                        'name': row.get(f'player{i}_name'),
                        'regNo': row.get(f'player{i}_reg'),
                        'year': row.get(f'player{i}_year'),
                        'whatsapp': row.get(f'player{i}_whatsapp'),
                        'gender': row.get(f'player{i}_gender')
                    })
            
            registrations.append({
                'timestamp': row.get('created_at'),
                'game': row.get('game'),
                'teamType': row.get('team_type'),
                'teamName': row.get('team_name'),
                'unique_id': row.get('unique_id'),
                'ss_url': row.get('screenshot_url'),
                'players': players_list
            })
        return jsonify(registrations)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/clear-data', methods=['POST'])
def clear_data():
    try:
        # Delete all rows
        supabase.table('registrations').delete().neq('id', '00000000-0000-0000-0000-000000000000').execute()
        return jsonify({'message': 'All data cleared successfully'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/payment-settings', methods=['GET'])
def get_settings():
    if os.path.exists(SETTINGS_FILE):
        with open(SETTINGS_FILE, 'r') as f:
            return jsonify(json.load(f))
    return jsonify({})

@app.route('/payment-settings', methods=['POST'])
def update_settings():
    data = request.json
    with open(SETTINGS_FILE, 'w') as f:
        json.dump(data, f)
    return jsonify({'message': 'Settings updated'})

@app.route('/upload-qr', methods=['POST'])
def upload_qr():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    filename = secure_filename(f"qr_{datetime.now().timestamp()}.png")
    file.save(os.path.join(UPLOAD_FOLDER, filename))
    
    with open(SETTINGS_FILE, 'r') as f:
        settings = json.load(f)
    settings['qr_image'] = f"{request.host_url}uploads/{filename}"
    with open(SETTINGS_FILE, 'w') as f:
        json.dump(settings, f)
        
    return jsonify({'url': settings['qr_image']})

@app.route('/download-excel', methods=['GET'])
def download_excel():
    # Fetch from Supabase and generate Excel on the fly
    try:
        response = supabase.table('registrations').select("*").order('created_at', desc=True).execute()
        rows = response.data
        
        wb = Workbook()
        ws = wb.active
        ws.title = "Registrations"
        
        HEADERS = ['Timestamp', 'Game', 'Team Type', 'Team Name', 'Unique ID', 'Payment SS']
        for i in range(1, 9):
            HEADERS.extend([f'Player{i} Name', f'Player{i} RegNo', f'Player{i} Year', f'Player{i} WhatsApp', f'Player{i} Gender'])
        ws.append(HEADERS)
        
        for row in rows:
            row_data = [
                row.get('created_at'),
                row.get('game'),
                row.get('team_type'),
                row.get('team_name'),
                row.get('unique_id'),
                row.get('screenshot_url')
            ]
            for i in range(1, 9):
                row_data.extend([
                    row.get(f'player{i}_name', ''),
                    row.get(f'player{i}_reg', ''),
                    row.get(f'player{i}_year', ''),
                    row.get(f'player{i}_whatsapp', ''),
                    row.get(f'player{i}_gender', '')
                ])
            ws.append(row_data)
        
        wb.save("temp_export.xlsx")
        return send_file("temp_export.xlsx", as_attachment=True, download_name="ground_clash_registrations.xlsx")
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)
