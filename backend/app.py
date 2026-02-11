from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from openpyxl import Workbook
import os
import json
import io
from datetime import datetime
from werkzeug.utils import secure_filename
from supabase import create_client, Client

app = Flask(__name__)
CORS(app)

# Supabase Configuration
SUPABASE_URL = "https://zxxzkvtkdhnwvmwgfbjc.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp4eHprdnRrZGhud3Ztd2dmYmpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4MDY5ODYsImV4cCI6MjA4NjM4Mjk4Nn0.L5z607BYgehqbprbBJk1zyQ5rmVPm_KFUvEWczJKfe4"
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
SUPABASE_BUCKET = 'images'

@app.route('/register', methods=['POST'])
def register():
    # Handle multipart form data for file upload
    if 'regData' not in request.form:
        return jsonify({'error': 'Missing registration data'}), 400
    
    try:
        data = json.loads(request.form['regData'])
        game = data.get('game')
        team_type = data.get('teamType')
        team_name = data.get('teamName', '')
        players = data.get('players', [])
        
        # Handle Screenshot Upload to Supabase Storage
        ss_url = ""
        if 'screenshot' in request.files:
            file = request.files['screenshot']
            if file.filename != '':
                filename = secure_filename(f"payment_{datetime.now().timestamp()}.png")
                try:
                    file_content = file.read()
                    if file_content:
                        content_type = file.mimetype or "image/png"
                        res = supabase.storage.from_(SUPABASE_BUCKET).upload(
                            filename, 
                            file_content, 
                            file_options={"content-type": content_type}
                        )
                        
                        # Check for error in response
                        if hasattr(res, 'error') and res.error:
                             raise Exception(f"Supabase Storage Error: {res.error}")
                             
                        ss_url = supabase.storage.from_(SUPABASE_BUCKET).get_public_url(filename)
                except Exception as e:
                    print(f"CRITICAL: Storage Upload Error: {e}")
                    # If screenshot was provided but failed to upload, we should probably inform the user
                    return jsonify({
                        'error': 'Payment Proof Upload Failed', 
                        'details': str(e),
                        'hint': "Check if 'images' bucket exists and is public in Supabase."
                    }), 500

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

        data, count = supabase.table('registrations').insert(db_payload).execute()
        return jsonify({'message': 'Registration Successful!', 'unique_id': unique_id}), 201

    except Exception as e:
        print(f"Registration Error: {e}")
        return jsonify({'error': 'Registration Failed', 'details': str(e)}), 400

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
    try:
        # Fetch from 'settings' table
        response = supabase.table('settings').select("*").limit(1).execute()
        if response.data:
            return jsonify(response.data[0])
        else:
            # If empty, create default
            default_settings = {"upi_id": "", "qr_image": ""}
            try:
                supabase.table('settings').insert(default_settings).execute()
            except:
                pass # Might fail if table doesn't exist
            return jsonify(default_settings)
    except Exception as e:
        print(f"Error fetching settings: {e}")
        return jsonify({})

@app.route('/payment-settings', methods=['POST'])
def update_settings():
    try:
        data = request.json
        # Check if settings exist
        existing = supabase.table('settings').select("id").limit(1).execute()
        
        if existing.data:
            sid = existing.data[0]['id']
            supabase.table('settings').update(data).eq('id', sid).execute()
        else:
            supabase.table('settings').insert(data).execute()
            
        return jsonify({'message': 'Settings updated'})
    except Exception as e:
        print(f"Error updating settings: {e}")
        return jsonify({'error': 'Update failed'}), 500

@app.route('/upload-qr', methods=['POST'])
def upload_qr():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part in request'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    try:
        # Check if file has content
        file_content = file.read()
        if not file_content:
            return jsonify({'error': 'File is empty'}), 400
            
        filename = secure_filename(f"qr_{datetime.now().timestamp()}.png")
        
        # 1. Verify Bucket First
        try:
            supabase.storage.get_bucket(SUPABASE_BUCKET)
        except Exception as bucket_err:
            print(f"Bucket Check Failed: {bucket_err}")
            return jsonify({
                'error': f"Bucket '{SUPABASE_BUCKET}' not detected on project.",
                'details': str(bucket_err),
                'hint': "Go to Supabase -> Storage -> Create a PUBLIC bucket named 'images'. Then run the SQL policies from 'backend/supabase_setup.sql'."
            }), 404

        # 2. Attempt upload to Supabase
        try:
            content_type = file.mimetype or "image/png"
            res = supabase.storage.from_(SUPABASE_BUCKET).upload(
                filename, 
                file_content, 
                file_options={"content-type": content_type}
            )
            
            # 3. Robust Error Check (Library Version Agnostic)
            error_data = None
            if hasattr(res, 'error') and res.error:
                error_data = res.error
            elif isinstance(res, dict) and 'error' in res:
                error_data = res['error']
            
            if error_data:
                raise Exception(f"Provider Error: {error_data}")
                 
            public_url = supabase.storage.from_(SUPABASE_BUCKET).get_public_url(filename)
            
            # 4. Update settings with new QR
            # Ensure settings exist
            existing = supabase.table('settings').select("id").limit(1).execute()
            if existing.data:
                sid = existing.data[0]['id']
                db_res = supabase.table('settings').update({'qr_image': public_url}).eq('id', sid).execute()
                if not db_res.data:
                    raise Exception("Database update returned empty. Check RLS policies on 'settings' table.")
            else:
                db_res = supabase.table('settings').insert({'qr_image': public_url, 'upi_id': ''}).execute()
                if not db_res.data:
                    raise Exception("Database insert failed. Check RLS policies on 'settings' table.")

            return jsonify({
                'url': public_url, 
                'message': 'System Updated Successfully',
                'filename': filename
            })
            
        except Exception as storage_err:
            print(f"DEBUG: Storage Level Exception: {storage_err}")
            return jsonify({
                'error': "Storage Protocol Failure",
                'details': str(storage_err),
                'hint': "This usually means you missed the SQL policies. Run the 'CREATE POLICY' commands in your Supabase SQL Editor."
            }), 500
            
    except Exception as e:
        print(f"General Upload Failure: {e}")
        return jsonify({'error': f"Terminal Error: {str(e)}"}), 500

@app.route('/debug-storage', methods=['GET'])
def debug_storage():
    """Diagnostic route to check connection status"""
    results = {}
    try:
        buckets = supabase.storage.list_buckets()
        results['buckets'] = [b.name for b in buckets]
        results['images_bucket_public'] = next((b.public for b in buckets if b.name == SUPABASE_BUCKET), "Not Found")
        
        settings = supabase.table('settings').select("*").execute()
        results['settings_count'] = len(settings.data)
        results['current_qr_in_db'] = settings.data[0].get('qr_image') if settings.data else "None"
    except Exception as e:
        results['error'] = str(e)
    return jsonify(results)

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
        
        # Save to memory buffer
        buffer = io.BytesIO()
        wb.save(buffer)
        buffer.seek(0)
        
        return send_file(buffer, as_attachment=True, download_name="ground_clash_registrations.xlsx", mimetype="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)
