#!/usr/bin/env python3
import http.server
import socketserver
import os
import sys

# Default port
PORT = 8080

# Check if port is provided as argument
if len(sys.argv) > 1:
    try:
        PORT = int(sys.argv[1])
    except ValueError:
        print(f"Invalid port: {sys.argv[1]}")
        sys.exit(1)

# Change to the script's directory
os.chdir(os.path.dirname(os.path.abspath(__file__)))

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add CORS headers for API calls
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()
    
    def do_GET(self):
        # Serve index.html for root path
        if self.path == '/':
            self.path = '/index.html'
        return http.server.SimpleHTTPRequestHandler.do_GET(self)

try:
    with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
        print(f"🌐 DDSolutions website running at http://localhost:{PORT}")
        print(f"🔴 Press Ctrl+C to stop the server")
        httpd.serve_forever()
except OSError as e:
    if e.errno == 98:  # Address already in use
        print(f"❌ Error: Port {PORT} is already in use.")
        print("💡 Try one of these alternatives:")
        print("   python3 server.py 8888")
        print("   python3 server.py 9000")
        print("   python3 server.py 5000")
    else:
        raise
except KeyboardInterrupt:
    print("\n👋 Server stopped.")