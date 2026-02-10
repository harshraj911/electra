from flask import Flask, request, jsonify, send_file, send_from_directory
from flask_cors import CORS
from openpyxl import Workbook, load_workbook
import os
import json
from datetime import datetime
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)

DB_FILE = 'ground_clash_registrations.xlsx'
SETTINGS_FILE = 'settings.json'
UPLOAD_FOLDER = 'uploads'

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# Define headers
HEADERS = ['Timestamp', 'Game', 'Team Type', 'Team Name', 'Unique ID', 'Payment SS']
for i in range(1, 7):
    HEADERS.extend([f'Player{i} Name', f'Player{i} RegNo', f'Player{i} Year', f'Player{i} WhatsApp', f'Player{i} Gender'])

def init_db():
    if not os.path.exists(DB_FILE):
        wb = Workbook()
        ws = wb.active
        ws.title = "Registrations"
        ws.append(HEADERS)
        wb.save(DB_FILE)

def init_settings():
    if not os.path.exists(SETTINGS_FILE):
        default_settings = {
            "upi_id": "example@upi",
            "qr_image": ""
        }
        with open(SETTINGS_FILE, 'w') as f:
            json.dump(default_settings, f)

init_db()
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
            ss_url = f"http://127.0.0.1:5001/uploads/{filename}"

    wb = load_workbook(DB_FILE)
    ws = wb.active
    
    # Duplicate check
    new_reg_nos = [p.get('regNo') for p in players if p.get('regNo')]
    reg_no_indices = [HEADERS.index(f'Player{i} RegNo') + 1 for i in range(1, 7)]
    game_col_idx = HEADERS.index('Game') + 1
    
    for row in ws.iter_rows(min_row=2, values_only=True):
        if row[game_col_idx - 1] == game:
            for idx in reg_no_indices:
                if row[idx - 1] and str(row[idx - 1]) in map(str, new_reg_nos):
                    wb.close()
                    return jsonify({'error': f'Registration Number {row[idx-1]} is already registered for {game}.'}), 400

    # Calculate Unique ID
    unique_id = ""
    if team_type == 'Single' and players:
        p_name = players[0].get('name', '').split(' ')[0] # First name
        p_reg = str(players[0].get('regNo', ''))
        reg_suffix = p_reg[-4:] if len(p_reg) >= 4 else p_reg
        unique_id = f"{p_name}_{reg_suffix}"
    else:
        unique_id = team_name or f"TEAM_{datetime.now().strftime('%M%S')}"

    row_data = [
        datetime.now().strftime("%Y-%m-%d %H:%M:%S"), 
        game, 
        team_type, 
        team_name,
        unique_id,
        ss_url
    ]
    
    for i in range(6):
        if i < len(players):
            p = players[i]
            row_data.extend([
                p.get('name', ''), 
                p.get('regNo', ''), 
                p.get('year', ''), 
                p.get('whatsapp', ''), 
                p.get('gender', '')
            ])
        else:
            row_data.extend(['', '', '', '', ''])
            
    ws.append(row_data)
    wb.save(DB_FILE)
    wb.close()
    return jsonify({'message': 'Registration Successful!', 'unique_id': unique_id}), 201

@app.route('/registrations', methods=['GET'])
def get_registrations():
    if not os.path.exists(DB_FILE): return jsonify([])
    wb = load_workbook(DB_FILE)
    ws = wb.active
    registrations = []
    for row in ws.iter_rows(min_row=2, values_only=True):
        players_list = []
        for i in range(6):
            base_idx = 6 + (i * 5) # Updated base_idx
            if row[base_idx]:
                players_list.append({
                    'name': row[base_idx], 
                    'regNo': row[base_idx+1], 
                    'year': row[base_idx+2], 
                    'whatsapp': row[base_idx+3], 
                    'gender': row[base_idx+4]
                })
        registrations.append({
            'timestamp': row[0], 
            'game': row[1], 
            'teamType': row[2], 
            'teamName': row[3], 
            'unique_id': row[4],
            'ss_url': row[5],
            'players': players_list
        })
    wb.close()
    return jsonify(registrations)

@app.route('/clear-data', methods=['POST'])
def clear_data():
    if os.path.exists(DB_FILE):
        os.remove(DB_FILE)
    init_db()
    return jsonify({'message': 'All data cleared successfully'})

@app.route('/payment-settings', methods=['GET'])
def get_settings():
    with open(SETTINGS_FILE, 'r') as f:
        return jsonify(json.load(f))

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
    settings['qr_image'] = f"http://127.0.0.1:5001/uploads/{filename}"
    with open(SETTINGS_FILE, 'w') as f:
        json.dump(settings, f)
        
    return jsonify({'url': settings['qr_image']})

@app.route('/download-excel', methods=['GET'])
def download_excel():
    if not os.path.exists(DB_FILE): return jsonify({'error': 'File not found'}), 404
    return send_file(DB_FILE, as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True, port=5001)
