const http = require('http');
const url = require('url');
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    if (parsedUrl.pathname === '/') {
        if (req.method === 'GET') {
            // GET request (Read)
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end('<h1>Welcome to my server!</h1>');
        } else if (req.method === 'POST') {
            // POST request (Create)
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                const data = JSON.parse(body);
                if (data.option === 'posting') {
                    res.writeHead(201, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'Successfully created!', option: data.option }));
                } else {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'Invalid option for POST' }));
                }
            });
        } else if (req.method === 'PUT' || req.method === 'PATCH') {
            // PUT or PATCH request (Update)
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                const data = JSON.parse(body);
                if (data.option === 'update') {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'Successfully updated!', option: data.option }));
                } else {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'Invalid option for PUT/PATCH' }));
                }
            });
        } else if (req.method === 'DELETE') {
            // DELETE request (Delete)
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                const data = JSON.parse(body);
                if (data.option === 'removal') {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'Successfully deleted!', option: data.option }));
                } else {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'Invalid option for DELETE' }));
                }
            });
        } else {
            // Method not supported
            res.writeHead(405, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: `Method ${req.method} not allowed` }));
        }
    } else {
        // Handle 404 for other routes
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Not Found' }));
    }
});
// Start the server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});




















