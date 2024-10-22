const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const method = req.method;

  res.setHeader('Content-Type', 'application/json');

  if (parsedUrl.pathname === '/') {
    if (method === 'GET') {
      res.writeHead(200);
      res.end(JSON.stringify({ message: 'Welcome to my server!' }));
    } else if (method === 'PUT' || method === 'PATCH') {
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });
      req.on('end', () => {
        const data = JSON.parse(body);
        res.writeHead(200);
        res.end(JSON.stringify({ message: `Successfully updated with option: ${data.option}` }));
      });
    } else if (method === 'POST') {
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });
      req.on('end', () => {
        const data = JSON.parse(body);
        res.writeHead(201);
        res.end(JSON.stringify({ message: `Successfully created with option: ${data.option}` }));
      });
    } else if (method === 'DELETE') {
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });
      req.on('end', () => {
        const data = JSON.parse(body);
        res.writeHead(200);
        res.end(JSON.stringify({ message: `Successfully deleted with option: ${data.option}` }));
      });
    } else {
      res.writeHead(405);
      res.end(JSON.stringify({ message: 'Method Not Allowed' }));
    }
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ message: 'Not Found' }));
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
