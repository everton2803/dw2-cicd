# DW2 CI/CD

Este repositório contém um projeto Node.js simples e um pipeline de CI/CD com GitHub Actions.

## Serviço

API REST de exemplo com as rotas:

- `GET /`: retorna informações da API.
- `GET /products`: retorna uma lista de produtos.
- `GET /products/:id`: retorna um produto pelo ID.

## Executar localmente

```bash
npm ci
npm test
npm start
```

Acesse: http://localhost:3000/

## CI/CD

O pipeline configurado em `.github/workflows/ci-cd.yml` faz:

1. Checkout do código.
2. Configura Node.js 20.x.
3. Instala dependências com `npm ci`.
4. Executa os testes com `npm test`.
5. Constrói uma imagem Docker do servidor.
6. Em push na branch `main`, publica a imagem no GitHub Container Registry (GHCR).
7. Executa uma etapa simulada de deploy em staging.

## Permissões necessárias

Para publicar a imagem no GHCR, o workflow usa o `GITHUB_TOKEN`. Se o repositório tiver restrições de pacotes, configure em **Settings > Actions > General > Workflow permissions** a permissão **Read and write permissions**.