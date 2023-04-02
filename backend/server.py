import http.server
import socketserver
import json

import FakeModel1
import FakeModel2

PORT = 8000

class CustomHandler(http.server.BaseHTTPRequestHandler):
    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        message = json.loads(self.rfile.read(content_length).decode('utf-8'))
        print("Received: ", message)

        if self.path == '/RegionSearch':
            response = FakeModel1.Run(message)
        elif self.path == '/DRR':
            response = FakeModel2.Run(message)
        elif self.path == '/TopicExploration'
            response = 'Topic'
        else:
            self.send_response(404)
            self.send_header("Content-Type", "text/plain")
            self.end_headers()
            self.wfile.write("Route not found".encode('utf-8'))
            return

        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        print("Sending: ", response)
        self.wfile.write(json.dumps(response).encode('utf-8'))

with socketserver.TCPServer(("", PORT), CustomHandler) as httpd:
    print("serving at port", PORT)
    httpd.serve_forever()