const http = require('http');

const hostname = '134.209.14.125';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

/*
var app = express();
app.get('/test', function(req, res) {
    res.sendFile('views/test.html', {root: __dirname })
});



*/


server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});