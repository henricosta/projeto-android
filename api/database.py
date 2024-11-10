from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import sqlite_utils
import os


def get_database():
    return sqlite_utils.Database("db.sqlite")


def create_user(name, email, password):
    db = get_database()

    try:
        db["users"].insert({
            "name": name,
            "email": email,
            'password': password
        }, pk="id")
        return get_user_por_email(email)
    except Exception as e:
        print(e)
        return None


def listar_eventos_usuario(user_id, page, per_page=10):
    db = get_database()
    offset = (page - 1) * per_page

    # Busca eventos criados pelo usuário
    eventos_criados = db["events"].rows_where("created_by = ?", [user_id])

    # Busca eventos onde o usuário está participando
    eventos_participando = db.query("""
        SELECT e.* FROM events e
        JOIN user_event ue ON e.id = ue.event_id
        WHERE ue.user_id = ?
    """, [user_id])

    # Combina os eventos e remove duplicados (se necessário)
    eventos = list(eventos_criados) + \
        [evento for evento in eventos_participando if evento not in eventos_criados]

    # Paginação dos eventos combinados
    eventos_paginados = eventos[offset:offset + per_page]

    return eventos_paginados


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


def pesquisar_eventos(nome, local, is_online, is_presencial, user_id, page=1, per_page=10):
    db = get_database()
    offset = (page - 1) * per_page

    # Construa a cláusula WHERE dinâmica
    # Garante que `created_by` seja diferente do `user_id`
    where_clauses = ["created_by != :user_id"]
    params = {"user_id": user_id}

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

    # Constrói a cláusula WHERE final
    where_clause = " AND ".join(where_clauses)

    # Consulta os eventos com a cláusula WHERE dinâmica
    events = db["events"].rows_where(
        where=where_clause,
        where_args=params,
        limit=per_page,
        offset=offset
    )
    total_events = db["events"].count_where(
        where=where_clause, where_args=params
    )
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

    return user[0] if user else None


def criar_evento(data):
    db = get_database()
    db["events"].insert({
        "name": data["name"],
        "description": data["description"],
        "location": data["location"],
        "date": data["date"],
        "is_online": data["is_online"],
        'created_by': data['created_by']
    }, pk="id")


def participar_evento(user_id, evento_id):
    db = get_database()
    db['user_event'].insert({
        "user_id": user_id,
        'event_id': evento_id
    }, pk='id')
