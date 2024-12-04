# Teste Técnico Fullstack - Frontend e Backend

Este projeto consiste em um backend desenvolvido com NestJS e um frontend desenvolvido com Angular para gerenciar itens. Ele permite criar, listar, editar e excluir itens, com suporte ao upload de imagens.

## Sumário

- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Instalação e Execução](#instalação-e-execução)
- [Configuração de Backend](#configuração-do-backend)
- [Configuração de Frontend](#configuração-do-frontend)
- [Como Usar](#como-usar)

## Funcionalidades

Backend:

- **API RESTful:** Para gerenciamento de itens
- **Upload:** imagens redimensionadas para o servidor
- **Validações:** Autenticação básicas para garantir integridade dos dados.

  Frontend:

- **Interface:** Responsiva para criar, listar, editar e excluir itens.
- **Upload:** Imagens com visualização no navegador.
- **Design:** Material Design para estilização.

## Tecnologias Utilizadas

- **Backend:** NestJS
- **Banco de Dados:** MongoDB
- **Upload de Arquivos:** Multer e Sharp
- **Frontend:** Angular
- **Style:** Angular Material
- **Testes:** Karma e Jasmine

## Instalação e Execução

### Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou Yarn
- MongoDB (instância local ou em nuvem)

### Passos para Inicialização

1. **Clone o repositório:**

```bash
git clone https://github.com/andersonfae/tagme.git
```

## Configuração de Backend

2. **Instale as dependências:**

```bash
cd tagme-backend
npm install

```

3. **Configure as variáveis de ambiente:**

```bash
Crie o arquivo .env na pasta backend com o seguinte conteúdo:
PORT=3000
MONGODB_URI=mongodb://localhost:27017/tagme
HOST_URL=http://localhost:3000
```

4. _Inicie a aplicação:_

```bash
npm run start:dev
```

5. _Acesse o backend_

```bash
O backend estará disponível em http://localhost:3000.
```

## Configuração de Frontend

6. **Instale as dependências:**

```bash
cd tagme-frontend
npm install
```

7. **Configure as variáveis de ambiente:**

```bash
Configure o endpoint da API: No arquivo src/environments/environment.ts, configure a URL do backend:
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000', // URL do backend
};

```

8. _Inicie a aplicação:_

```bash
ng serve
```

## Como Usar

Cadastrar um Item:

Clique no botão "Criar Novo Item".
Preencha o título, descrição e selecione uma imagem.
Clique em "Criar".
Editar um Item:

Na lista de itens, clique em "Editar" no item desejado.
Faça as alterações e clique em "Atualizar".
Excluir um Item:

Na lista de itens, clique em "Excluir" no item desejado.

## Testes

1. **Rodar os testes do backend:**

```bash
cd tagme-backend
npm run test
```

2. **O que é testado:**

```bash
Validação de IDs.
CRUD de itens.
Upload de imagens.
```

3. **Rodar os testes do frontend:**

```bash
cd tagme-frontend
ng test
```

4. **O que é testado:**

```bash
Componentes principais (ListComponent e FormComponent).
Serviços (ItemService).
Integração com a API.
```

## Observações

Banco de Dados:

Certifique-se de que o MongoDB está rodando localmente na porta padrão (27017) ou ajuste a variável MONGODB_URI no backend.
Upload de Imagens:

As imagens são redimensionadas para 500x500 pixels e salvas no diretório /uploads do backend.
