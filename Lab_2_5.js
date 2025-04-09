const http = require('http');
const fs = require('fs');
const split2 = require('split2');
const through2 = require('through2');
const path = require('path');

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    const filePath = path.join(__dirname, 'lab_2_5.csv'); // Вказуємо шлях до CSV файлу без розпакування
    let headers = [];

    // Масив для збереження результатів
    const results = [];

    res.writeHead(200, { 'Content-Type': 'application/json' });

    fs.createReadStream(filePath)
      .pipe(split2()) // Розбиваємо файл на рядки
      .pipe(
        through2.obj(function (line, _, cb) {
          const values = line.toString().split(','); // Розділяємо значення на коми

          if (!headers.length) {
            headers = values; // Записуємо заголовки з першого рядка
          } else {
            const obj = {};
            // Створюємо об'єкт на основі заголовків
            values.forEach((value, i) => {
              obj[headers[i]] = value.trim(); // Додаємо значення до об'єкта
            });
            results.push(obj); // Додаємо об'єкт у масив результатів
          }
          cb();
        })
      )
      .on('finish', () => {
        res.end(JSON.stringify(results)); // Відправка результату у форматі JSON
      })
      .on('error', (err) => {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error processing the file');
      });
  } else {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('Method not allowed');
  }
});

server.listen(3001, () => {
  console.log('CSV server listening on http://localhost:3001/');
});
