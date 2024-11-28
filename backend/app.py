from flask import Flask, request, jsonify
import sqlite3
from flask_cors import CORS  # Import CORS for handling cross-origin requests

app = Flask(__name__)
CORS(app)  # Allow all origins by default, you can customize it if needed

# Database initialization (creates the necessary tables)
def init_db():
    conn = sqlite3.connect('db.sqlite3')
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS posts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            content TEXT NOT NULL,
            author TEXT
        )
    ''')
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS comments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            content TEXT NOT NULL,
            author TEXT,
            post_id INTEGER,
            FOREIGN KEY (post_id) REFERENCES posts(id)
        )
    ''')
    conn.commit()
    conn.close()

# Route to get all posts and their comments
@app.route('/api/posts', methods=['GET'])
def get_posts():
    conn = sqlite3.connect('db.sqlite3')
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM posts')
    posts = cursor.fetchall()

    result = []
    for post in posts:
        post_id = post[0]
        cursor.execute('SELECT * FROM comments WHERE post_id = ?', (post_id,))
        comments = cursor.fetchall()
        
        comment_list = [{'id': comment[0], 'content': comment[1], 'author': comment[2]} for comment in comments]

        result.append({
            'id': post[0],
            'title': post[1],
            'content': post[2],
            'author': post[3],
            'comments': comment_list
        })
    
    conn.close()
    return jsonify(result)

# Route to create a new post
@app.route('/api/posts', methods=['POST'])
def create_post():
    data = request.get_json()
    title = data['title']
    content = data['content']
    author = data.get('author', 'Anonymous')

    print(f"Received data: {title}, {content}, {author}")  # Debugging line

    try:
        conn = sqlite3.connect('db.sqlite3')
        cursor = conn.cursor()
        cursor.execute('INSERT INTO posts (title, content, author) VALUES (?, ?, ?)', (title, content, author))
        conn.commit()
        conn.close()

        return jsonify({'message': 'Post created successfully'}), 201
    except sqlite3.Error as e:
        print(f"Database error: {e}")
        return jsonify({'message': 'Database error'}), 500

# Route to add a comment to a post
@app.route('/api/posts/<int:post_id>/comments', methods=['POST'])
def add_comment(post_id):
    data = request.get_json()
    content = data['content']
    author = data.get('author', 'Anonymous')

    conn = sqlite3.connect('db.sqlite3')
    cursor = conn.cursor()
    cursor.execute('INSERT INTO comments (content, author, post_id) VALUES (?, ?, ?)', (content, author, post_id))
    conn.commit()
    conn.close()

    return jsonify({'message': 'Comment added successfully'}), 201

if __name__ == '__main__':
    init_db()  # Initialize the database with tables
    app.run(debug=True)
