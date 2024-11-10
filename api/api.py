from flask import Flask, session, redirect, url_for, request, jsonify
from flask_cors import CORS  # Import CORS
import sqlite3
import sqlite_utils
import os

import database

app = Flask(__name__)
app.secret_key = 'secret'

CORS(app, supports_credentials=True, resources={r"/*": {"origins": "*"}}) 

@app.route("/api/cadastrar", methods=["POST"])
def create_user():
    data = request.json
    name = data['name'] 
    email = data['email']
    password = data['password']
    try:
        if database.get_user_por_email(email): 
            return jsonify({"error": "User already exists"}), 409
        user = database.create_user(name, email, password)
        return jsonify({"message": "User created", "user": dict(user)}), 201
    except Exception as e:
        print(f"Error creating user: {e}")
        return jsonify({"error": "Error creating user"}), 500


@app.route("/api/eventos/list", methods=["GET"])
def list_events():
    user_id = request.args.get("user_id", type=int)
    page = request.args.get("page", default=1, type=int)
    eventos = database.listar_eventos_usuario(user_id=user_id, page=page)

    return jsonify(eventos), 200

@app.route("/api/eventos/pesquisar", methods=["GET"])
def pesquisar_eventos():
    nome = request.args.get("nome", "")
    local = request.args.get("local", "")
    is_online = request.args.get("is_online", "").lower() == "true"
    is_presencial = request.args.get("is_presencial", "").lower() == "true"
    user_id = int(request.args.get('user_id', ''))
    page = int(request.args.get("page", 1))
    per_page = int(request.args.get("limit", 5))
    
    print(request.args)
    
    eventos = database.pesquisar_eventos(
        nome=nome,
        local=local,
        is_online=is_online,
        is_presencial=is_presencial,
        user_id=user_id,
        page=page,
        per_page=per_page
    )
    
    return jsonify(eventos), 200


@app.route('/api/eventos/<int:id>/detalhes', methods=['GET'])
def detalhes_evento(id):
    try:
        event = database.get_evento_detalhes(id)
        return jsonify({"event": dict(event)}), 200  #
    except sqlite_utils.db.NotFoundError:
        return jsonify({"error": "Event not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/eventos/create", methods=["POST"])
def criar_evento():
    data = request.json
    print(data)
    try:
        database.criar_evento(data)
        return jsonify({"message": "Event created"}), 201
    except sqlite3.IntegrityError:
        return jsonify({"error": "Event creation failed"}), 409


@app.route("/api/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    user = database.get_user_por_email(email)

    if user and user["password"] == password:
        session['user_id'] = user['id']
        session['logged_in'] = True
        
        return jsonify({
            "message": "Login successful",
            "user": user
            }), 200
    else:
        return jsonify({"error": "Invalid email or password"}), 401



@app.route('/api/logout', methods=['POST'])
def logout():
    session.clear()
    return jsonify({"message": "Logged out successfully"}), 200


@app.route('/api/participar-evento', methods=['POST'])
def attend():
    data = request.json
    evento_id = data.get('event_id')
    user_id = data.get('user_id')
    
    print(data)
    
    try:
        database.participar_evento(user_id=user_id, evento_id=evento_id)
        return '', 201
    except Exception as e:
        return jsonify({ 'error': e }), 500
        
    

if __name__ == "__main__":
    app.run(debug=True)
