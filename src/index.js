const http = require('http');

const PORT = process.env.PORT || 3000;

const products = [
  { id: 1, name: 'Caderno', category: 'Papelaria', price: 12 },
  { id: 2, name: 'Café', category: 'Bebida', price: 5 },
  { id: 3, name: 'Tiramisu', category: 'Bebida', price: 7 }
];

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);

  if (req.method === 'GET' && url.pathname === '/') {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify({
      name: 'DW2 CI/CD API',
      status: 'ok',
      message: 'API de exemplo para pipeline de CI/CD.'
    }));
    return;
  }

  if (req.method === 'GET' && url.pathname === '/products') {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify(products));
    return;
  }

  if (req.method === 'GET' && url.pathname.match(/^\/products\/(\d+)$/)) {
    const id = Number(url.pathname.split('/').pop());
    const product = products.find((p) => p.id === id);

    if (!product) {
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.statusCode = 404;
      res.end(JSON.stringify({error: 'Produto não encontrado.'}));
      return;
    }

    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify(product));
    return;
  }

  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.statusCode = 404;
  res.end(JSON.stringify({
    error: 'Rota não encontrada.'
  }));
});

server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = { server, products };
