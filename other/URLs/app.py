from flask import Flask, send_from_directory
from waitress import serve

app = Flask("__name__")
app.secret_key = 'secret_key'

@app.route('/images/<filename>')
def get_image(filename):
    return send_from_directory('static/images', filename)

if __name__ == '__main__':
    serve(app, host="0.0.0.0", port=8080) # http://localhost:8080/