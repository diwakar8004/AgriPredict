#!/usr/bin/env python3
"""
Minimal test app to check if Render can start Flask at all
"""
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/test', methods=['GET'])
def test():
    return jsonify({"status": "hello from render"})

if __name__ == '__main__':
    import os
    port = int(os.environ.get('PORT', 5001))
    print(f"Starting test app on port {port}")
    app.run(host='0.0.0.0', port=port, debug=False)
