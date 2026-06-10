const test = require('node:test');
const assert = require('node:assert');
const http = require('http');
const { server } = require('./index');

const port = 3000;

function request(path) {
  return new Promise((resolve, reject) => {
    const req = http.get(`http://127.0.0.1:${port}${path}`, (res) => {
      let body = '';
      res.setEncoding('utf8');
      res.on('data', (chunk) => { body += chunk; });
      res.on('end', () => resolve({ statusCode: res.statusCode, body: JSON.parse(body) }));
      res.on('error', reject);
    });
    req.on('error', reject);
  });
}

test('Index retorna status e mensagem da API', async () => {
  const response = await request('/');
  assert.equal(response.statusCode, 200);
  assert.equal(response.body.name, 'DW2 CI/CD API');
});

test('Rota de produtos retorna lista', async () => {
  const response = await request('/products');
  assert.equal(response.statusCode, 200);
  assert.ok(Array.isArray(response.body));
  assert.ok(response.body.length > 0);
});

test('Produto inexistente retorna 404', async (t) => {
  t.after(() => {
    server.close();
  });

  const response = await request('/products/999');
  assert.equal(response.statusCode, 404);
  assert.equal(response.body.error, 'Produto não encontrado.');
});
