const http = require('http');
const url = require('url');
const CustomStream = require('./CustomStream');

const host = 'localhost';
const port = 3002;

const customStream = new CustomStream();  // Створюємо потік лише один раз

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);

    res.writeHead(200, { 'Content-Type': 'text/plain' });

    // Тепер підключаємо stdin лише один раз
    if (process.stdin.listenerCount('data') === 0) { // Перевіряємо, чи не підключено вже прослуховувач для stdin
        process.stdin.pipe(customStream);
    }

    res.end('Processing input from console. Check logs.');
});

server.listen(port, host, () => {
    console.log(`Task6 http://${host}:${port}`);
});
