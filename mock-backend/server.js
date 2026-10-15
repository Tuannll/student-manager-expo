const path = require('node:path');
const jsonServer = require('json-server');

const server = jsonServer.create();
const database = process.env.DB_FILE || path.join(__dirname, 'db.json');
const port = Number(process.env.PORT || 3000);
const router = jsonServer.router(database);

server.use(jsonServer.defaults());
server.use((req, _res, next) => {
  if (req.query.search !== undefined) {
    req.query.q = req.query.search;
    delete req.query.search;
  }
  next();
});
server.use(router);

server.listen(port, () => {
  console.log(`Student Manager API running at http://localhost:${port}`);
});
