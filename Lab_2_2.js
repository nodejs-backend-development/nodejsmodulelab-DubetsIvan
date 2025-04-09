const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    const queryObject = url.parse(req.url, true).query;
    
    res.writeHead(200, { 'Content-Type': 'text/plain' });

    if (queryObject.name) {
        res.end(`Hello ${queryObject.name}`);
    } else {
        res.end('You should provide name parameter');
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// http://localhost:3000/?name=Lab_2_2