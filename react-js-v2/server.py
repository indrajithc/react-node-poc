import os
import gzip
import http.server
from http import HTTPStatus
from pathlib import Path
from io import BytesIO
import mimetypes

class GzipHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Get the requested file path, resolve it relative to the current directory
        file_path = self.translate_path(self.path)
        
        # If the requested path is a directory, serve the index.html inside it
        if os.path.isdir(file_path):
            file_path = os.path.join(file_path, 'index.html')
        
        # If the file exists, try to serve it gzipped
        if Path(file_path).exists():
            self.serve_gzipped_file(file_path)
        else:
            self.send_error(HTTPStatus.NOT_FOUND, "File not found")

    def serve_gzipped_file(self, file_path):
        # Check if the client supports gzip
        accept_encoding = self.headers.get('Accept-Encoding', '')
        
        # Get the correct MIME type for the file
        mime_type, _ = mimetypes.guess_type(file_path)
        
        if 'gzip' in accept_encoding:
            self.send_gzipped_file(file_path, mime_type)
        else:
            # If gzip is not supported, serve the file normally
            super().do_GET()

    def send_gzipped_file(self, file_path, mime_type):
        compressed_file = BytesIO()
        with open(file_path, 'rb') as f_in, gzip.GzipFile(fileobj=compressed_file, mode='wb') as f_out:
            f_out.writelines(f_in)

        compressed_file.seek(0)

        self.send_response(HTTPStatus.OK)
        self.send_header("Content-type", mime_type or "application/octet-stream")
        self.send_header("Content-Encoding", "gzip")
        self.send_header("Content-Length", str(len(compressed_file.getvalue())))
        self.end_headers()

        # Send the gzipped content
        self.wfile.write(compressed_file.getvalue())

if __name__ == '__main__':
    port = 8000
    os.chdir('.')  # Change to the directory where your files are located
    server_address = ('', port)
    httpd = http.server.HTTPServer(server_address, GzipHTTPRequestHandler)
    print(f"Serving on port {port}...")
    httpd.serve_forever()
