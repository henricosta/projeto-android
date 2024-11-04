from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import sqlite_utils
import os

def get_database():
    return sqlite_utils.Database("db.sqlite")

#####################################################################

if not os.path.exists('./db.sqlite'):
    db = get_database()
    # Cria o banco de dados caso ele não exista
    if "users" not in db.table_names():
        db["users"].create({
            "id": int,
            "name": str,
            "email": str,
            "password": str
        }, pk="id", not_null={"name", "email", "password"})
        db["users"].create_index(["email"], unique=True)

    if "events" not in db.table_names():
        db["events"].create({
            "id": int,
            "name": str,
            "description": str,
            "location": str,
            'date': str,
            "is_online": bool,
        }, pk="id", not_null={'name', 'description', 'is_online'})

# Usa dados de seed se eles existirem
# if os.path.exists('./seed.sql'):
#     db = get_database()
#     with open('./seed.sql') as file:
#         sql_script = file.read()

#     db.executescript(sql_script)
