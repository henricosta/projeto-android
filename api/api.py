from flask import Flask, session, redirect, url_for, request, jsonify
from flask_cors import CORS  # Import CORS
import sqlite_utils
import os

import database

app = Flask(__name__)
app.secret_key = 'secret'

CORS(app, supports_credentials=True, resources={r"/*": {"origins": "*"}}) 

@app.route("/users", methods=["POST"])
def create_user():
    data = request.json
    try:
        user = database.create_user(data)
        return jsonify({"message": "User created", "user": user}), 201
    except sqlite_utils.db.IntegrityError:
        return jsonify({"error": "Username or email already exists"}), 409


@app.route("/api/eventos/list", methods=["GET"])
def list_events():
    eventos = database.listar_eventos()

    return jsonify(eventos), 200

@app.route("/api/eventos/pesquisar", methods=["GET"])
def pesquisar_eventos():
    nome = request.args.get("nome", "")
    local = request.args.get("local", "")
    is_online = request.args.get("is_online", "").lower() == "true"
    is_presencial = request.args.get("is_presencial", "").lower() == "true"
    page = int(request.args.get("page", 1))
    per_page = int(request.args.get("limit", 5))
    
    eventos = database.pesquisar_eventos(
        nome,
        local,
        is_online,
        is_presencial,
        page,
        per_page
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
    try:
        database.criar_evento(data)
        return jsonify({"message": "Event created" }), 201
    except sqlite_utils.db.IntegrityError:
        return jsonify({"error": "Event creation failed"}), 409


@app.route("/api/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("senha")

    user = database.get_user_por_email(email)

    if user and user["password"] == password:
        session['user_id'] = user['id']
        session['logged_in'] = True
        
        return jsonify({"message": "Login successful", "user_id": user["id"]}), 200
    else:
        return jsonify({"error": "Invalid email or password"}), 401


@app.route('/api/logout')
def logout():
    session.clear()
    return jsonify({"message": "Logged out successfully"}), 200


if __name__ == "__main__":
    app.run(debug=True)
