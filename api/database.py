from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import sqlite_utils
import os


def get_database():
    return sqlite_utils.Database("db.sqlite")


def create_user(data):
    db = get_database()
    user = db["users"].insert({
        "username": data["username"],
        "email": data["email"],
        'password': data['password'],
    }, pk="id")

    return user


def listar_eventos():
    db = get_database()
    page = int(request.args.get("page", 1))
    per_page = int(request.args.get("limit", 5))
    offset = (page - 1) * per_page

    events = db["events"].rows_where(limit=per_page, offset=offset)
    total_events = db["events"].count
    # Calculate total pages
    total_pages = (total_events + per_page - 1) // per_page

    return {
        "events": list(events),
        "page": page,
        "per_page": per_page,
        "total_pages": total_pages
    }


def pesquisar_eventos(nome, local, is_online, is_presencial, page=1, per_page=10):
    db = get_database()
    offset = (page - 1) * per_page

    # Construa a cláusula WHERE dinâmica
    where_clauses = []
    params = {}

    if nome:
        where_clauses.append("name LIKE :nome")
        params["nome"] = f"%{nome}%"
    if local:
        where_clauses.append("location LIKE :local")
        params["local"] = f"%{local}%"

    # Filtragem por tipo de evento
    if is_online and not is_presencial:
        where_clauses.append("is_online = 1")
    elif is_presencial and not is_online:
        where_clauses.append("is_online = 0")
    # Se ambos forem True, retorna todos os tipos de eventos

    where_clause = " AND ".join(where_clauses) if where_clauses else "1=1"

    events = db["events"].rows_where(
        where=where_clause,
        where_args=params,
        limit=per_page,
        offset=offset
    )
    total_events = db["events"].count_where(
        where=where_clause, where_args=params)
    total_pages = (total_events + per_page - 1) // per_page

    return {
        "events": list(events),
        "page": page,
        "per_page": per_page,
        "total_pages": total_pages
    }


def get_evento_detalhes(id):
    db = get_database()
    evento = db["events"].get(id)

    return evento


def get_user_por_email(email):
    db = get_database()
    user = list(db["users"].rows_where("email = ?", [email], limit=1))

    return user[0]


def criar_evento(data):
    db = get_database()
    db["events"].insert({
        "name": data["name"],
        "description": data["description"],
        "location": data["location"],
        "date": data["date"],
        "is_online": data["is_online"],
    }, pk="id")
