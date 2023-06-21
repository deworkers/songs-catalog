const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./mock/db.json');
const middlewares = jsonServer.defaults();

server.use(jsonServer.bodyParser);
server.use(middlewares);

server.post('/site/login', (req, res) => {
    res.status(200).jsonp({ status: '200' });
});

server.use(router);
server.listen(3000, () => {
    console.log('JSON Server запущен на порту 3000');
});