from flask import Flask, render_template, request, jsonify
import sqlite3
from datetime import datetime

app = Flask(__name__)

def get_db():
    conn = sqlite3.connect("database.db")
    conn.execute("""
        CREATE TABLE IF NOT EXISTS results(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            wpm INTEGER,
            accuracy REAL,
            date TEXT
        )
    """)
    return conn

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/save", methods=["POST"])
def save():
    data = request.json
    conn = get_db()
    conn.execute(
        "INSERT INTO results (wpm, accuracy, date) VALUES (?, ?, ?)",
        (data["wpm"], data["accuracy"], datetime.now().strftime("%d-%m-%Y %H:%M"))
    )
    conn.commit()
    conn.close()
    return jsonify({"status": "saved"})

if __name__ == "__main__":
    app.run(debug=True)
