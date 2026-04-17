#!/usr/bin/env python3
"""Minimal Flask test app"""
from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello():
    return {'status': 'ok', 'message': 'Hello World'}, 200

@app.route('/health')
def health():
    return {'status': 'healthy'}, 200

if __name__ == '__main__':
    print("Starting minimal test app...")
    app.run(host='0.0.0.0', port=5001, debug=False)
