from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from datetime import datetime, timedelta

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

def get_db_connection():
    return mysql.connector.connect(
        host="mysql-248332f1-ariyankr4488-e5ba.d.aivencloud.com",
        port=16612,
        user="avnadmin",
        password="AVNS_rAWpZjf_ej6Zy6uqzcG",
        database="defaultdb",
        ssl_disabled=False # SSL चालू रखने के लिए
    )

@app.route('/book-salon', methods=['POST'])
def book_salon():
    try:
        data = request.json

        # ✅ IST TIME (simple & safe)
        ist_now = datetime.utcnow() + timedelta(hours=5, minutes=30)
        current_time = ist_now.isoformat()

        haircut = int(data.get('haircut', 0))
        beard = int(data.get('beard', 0))

        conn = get_db_connection()
        cursor = conn.cursor()

        query = """
        INSERT INTO bookings 
        (name, phone, haircut_price, beard_price, total_price, created_at) 
        VALUES (%s, %s, %s, %s, %s, %s)
        """

        values = (
            data.get('name'),
            data.get('phone'),
            haircut,
            beard,
            haircut + beard,
            current_time
        )

        cursor.execute(query, values)
        conn.commit()

        cursor.close()
        conn.close()

        return jsonify({"message": "Success"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/get-bookings', methods=['GET'])
def get_bookings():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        ist_now = datetime.utcnow() + timedelta(hours=5, minutes=30)
        today = ist_now.strftime('%Y-%m-%d')

        query = """
        SELECT id, name, created_at 
        FROM bookings 
        WHERE DATE(created_at) = %s 
        ORDER BY id ASC
        """

        cursor.execute(query, (today,))
        rows = cursor.fetchall()

        cursor.close()
        conn.close()

        return jsonify(rows), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# =========================
# ✅ ADD HERE (OUTSIDE FUNCTION)
# =========================

@app.route('/get-status', methods=['GET'])
def get_status():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute("SELECT * FROM salon_status WHERE id = 1")
        result = cursor.fetchone()

        cursor.close()
        conn.close()

        return jsonify(result), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/update-status', methods=['POST'])
def update_status():
    try:
        data = request.json

        if data.get("password") != "1234":
            return jsonify({"error": "Wrong password"}), 403

        conn = get_db_connection()
        cursor = conn.cursor()

        query = """
        UPDATE salon_status 
        SET is_open=%s, message=%s 
        WHERE id=1
        """

        cursor.execute(query, (
            data.get("is_open"),
            data.get("message")
        ))

        conn.commit()

        cursor.close()
        conn.close()

        return jsonify({"message": "Updated"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    import os
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
