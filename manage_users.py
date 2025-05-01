import sqlite3

# Path to your DB
DB_PATH = 'users.db'

def promote_to_admin(email):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("UPDATE users SET role = 'admin' WHERE email = ?", (email,))
    conn.commit()
    print(f"User with email '{email}' promoted to admin.")
    conn.close()

def list_users():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    for row in cursor.execute("SELECT id, username, email, role FROM users"):
        print(row)
    conn.close()

# === USAGE ===
list_users()  # Show all users
promote_to_admin("user@example.com")  # Replace with actual user email
