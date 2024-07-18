# server.py (Flask application)
from flask import Flask, request
import subprocess

app = Flask(__name__)

@app.route('/rundemo', methods=['GET', 'POST'])
def run_demo():
    if request.method == 'POST':
        try:
            subprocess.run(['python', 'C:/Users/ASUS/Downloads/ai/ai/h.py'], check=True)
            return 'Script executed successfully!', 200
        except subprocess.CalledProcessError as e:
            return f'Error executing script: {e}', 500
    else:
        return 'Method not allowed', 405

if __name__ == '__main__':
    app.run(debug=True)
